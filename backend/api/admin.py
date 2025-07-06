from django.contrib import admin
from .models import ProgressLog

@admin.register(ProgressLog)
class ProgressLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'week', 'task_title', 'status', 'updated_at')
    list_filter = ('status', 'week', 'user')
    search_fields = ('task_title', 'user__username')
    ordering = ('week',)
