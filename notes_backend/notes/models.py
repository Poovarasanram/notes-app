from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings




class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')


class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_notes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "note"

