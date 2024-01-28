
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
   
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('demo/',DemoView.as_view()),
    path('auth/users/',RegisterView.as_view()),
    path('auth/jwt/create/',LoginView.as_view()),
    path('logout/',LogoutView.as_view()),
    path('auth/users/reset_password/',ResetPasswordView.as_view()),
    path('generateotp/',GeneratedOtpView.as_view()),
    path('verifyotp/',VerifyOTPView.as_view()),
    path('forgotpassword/',ForgotPasswordView.as_view()),
]
