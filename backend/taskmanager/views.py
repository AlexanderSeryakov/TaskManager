from django.http import HttpResponse
from rest_framework import viewsets

from .models import Task, Priority
from .serializers import TaskSerializer, PrioritySerializer


class TaskAPIView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class PriorityAPIView(viewsets.ModelViewSet):
    serializer_class = PrioritySerializer
    queryset = Priority.objects.all()
