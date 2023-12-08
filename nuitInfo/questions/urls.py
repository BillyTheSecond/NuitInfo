# questions/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('quiz.html', views.quiz_view, name='quiz')
]

