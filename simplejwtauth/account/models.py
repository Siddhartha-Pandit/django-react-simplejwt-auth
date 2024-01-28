from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.utils import timezone
import random
class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, name, password, **extra_fields)

    
class UserAccount(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField(max_length=255,unique=True)
    name=models.CharField(max_length=255)
    is_active=models.BooleanField(default=True)
    is_staff =models.BooleanField(default=True)

    objects =UserAccountManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email

class OTP(models.Model):
    user=models.ForeignKey(UserAccount,on_delete=models.CASCADE)
    otp=models.IntegerField()
    timestamp=models.DateTimeField(auto_now_add=True)
    used=models.BooleanField(default=False)

    def is_expired(self):
        expiration_time=timezone.now()-timezone.timedelta(minutes=5)
        return self.timestamp<expiration_time
    @classmethod
    def generate_otp(cls,email):
        user=UserAccount.objects.get(email=email)
        otp_value=random.randint(100000,999999)
        otp_instance=cls.objects.create(user=user,otp=otp_value)
        return otp_instance