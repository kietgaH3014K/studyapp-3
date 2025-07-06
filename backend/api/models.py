from django.db import models
from django.contrib.auth.models import User

class ProgressLog(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Chưa hoàn thành'),
        ('done', 'Đã hoàn thành'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    week = models.IntegerField()
    task_title = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Tuần {self.week} - {self.task_title[:40]} ({self.user.username})"
