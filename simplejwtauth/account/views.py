from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User 
from .models  import UserAccount,OTP
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import update_session_auth_hash
from django.conf import settings
from django.core.mail import send_mail
def index(request):
    return HttpResponse("Hello, this is the index view.")

class DemoView(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self,request):
        print(request.user)
        return Response({'success':'you are authenticated'})
    
class RegisterView(APIView):
    def post(self,request):
        email=request.data.get('email')
        name=request.data.get('name')
        password=request.data.get('password')
        if not email or not password or not name:
            return Response({"error":"Email or password or name is required"},status=status.HTTP_400_BAD_REQUEST)
        
        if UserAccount.objects.filter(email=email).exists():
            return Response({'error':'User already exists'})
        
        user=UserAccount.objects.create_user(email=email,password=password,name=name)

        return Response({"status":"User created"},status=status.HTTP_201_CREATED)
        
class LoginView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        email=request.data.get('email')
        password=request.data.get('password')

        if not email or not password:
            return Response({"error":"Email or password are required"},status=status.HTTP_400_BAD_REQUEST)

        user=authenticate(request,email=email,password=password)

        if user is not None:
            login(request,user)
            refresh=RefreshToken.for_user(user)
            return Response({'refresh':str(refresh),'access':str(refresh.access_token)},status=status.HTTP_200_OK)
        else:
            return Response({"error":"Login failed in valid email or password"},status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes=[IsAuthenticated]
    
    def post(self,request):
        logout(request)
        return Response({"Success":"Logged out successful"},status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        user=request.user
        current_password=request.data.get('current_password')
        new_password=request.data.get('new_password')

        if not current_password or not new_password:
            return Response({"error":"Current password or new password are required."},status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({"error":"Currenet password is incorrect"},status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        update_session_auth_hash(request,user)

        return Response({"message":"Password reset successfully"},status=status.HTTP_200_OK)

class GeneratedOtpView(APIView):
    def post(self,request):
        email=request.data.get('email')
        if not email:
            return Response({"error":"Email is required"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user=UserAccount.objects.get(email=email)
        except:
            return Response({"error":"User with this email doesn't exists"},status=status.HTTP_404_NOT_FOUND)
        otp_instance=OTP.generate_otp(email=email)
        subject='Forgot Passowrd OTP'
        message=f'Your OTP is: {otp_instance.otp}'
        recipient_list=[email]
        from_email=settings.EMAIL_HOST_USER

        try:
            send_mail(subject,message,from_email,recipient_list,fail_silently=False)
            return Response({"message":"OTP sent to your email","isoptsent":True})
        except:
            return Response({"error":"Failed to send otp","isoptsent":False},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class VerifyOTPView(APIView):
    def post(self,request):
        email=request.data.get('email')
        otp_entered=request.data.get('otp')

        if not email or not otp_entered:
            return Response({"error":"Invalid OTP or email"})
        
        try:
            otp_obj=OTP.objects.get(user__email=email,otp=otp_entered,used=False)
            if otp_obj.used:
                return Response({"error":"OTP has been already been used"},status=status.HTTP_400_BAD_REQUEST)
            elif otp_obj.is_expired():
                return Response({"error":"Invalid OTP or OTP has expired"})
        except OTP.DoesNotExist:
            return Response({"error":"Invalid OTP","isoptverified":True},status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"Message":"OTP verified successfully","isoptverified":False},status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    def post(self,request):
        email=request.data.get('email')
        otp_entered=request.data.get('otp')
        password=request.data.get('password')
        if not email or not otp_entered or not password:
            return Response({"error":"Invalid OTP or email "})
        
        try:
            otp_obj=OTP.objects.get(user__email=email,otp=otp_entered,used=False)
            if otp_obj.is_expired():
                return Response({"error":"Invalid OTP or OTP has expired"})
        except OTP.DoesNotExist:
            return Response({"error":"Invalid OTP"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user=UserAccount.objects.get(email=email)
            user.set_password(password)
            user.save()
            otp_obj.used=True
            otp_obj.save()
            return Response({"message":"Password reset successfully","ispasswordreset":True},status=status.HTTP_200_OK)
        except UserAccount.DoesNotExist:
            return Response({"error":"User not found","ispasswordreset":False},status=status.HTTP.HTTP_404_NOT_FOUND)
            
        
    
