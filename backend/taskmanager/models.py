from django.db import models


class Priority(models.Model):
    """ Модель для создания разных приоритетов задач """
    title = models.CharField(max_length=30)

    def __str__(self):
        return self.title


class Task(models.Model):
    """ Модель описания конкретной задачи. """
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=350, blank=False)
    completed = models.BooleanField(default=False)
    prior = models.ForeignKey(Priority, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

