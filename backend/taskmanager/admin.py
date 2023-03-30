from django.contrib import admin
from .models import Task, Priority


class PriorityAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')


class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'completed', 'prior_id')


admin.site.register(Priority, PriorityAdmin)
admin.site.register(Task, TaskAdmin)
