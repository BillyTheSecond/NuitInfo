from django.urls import path
from . import views

app_name = 'core'
urlpatterns = [
    path('', views.index, name='index'),
    path('contact/', views.contact, name='contact'),
    path('velosaure/', views.velosaure, name='velosaure'),
    path('article1/', views.article1, name='article1'),
    path('article2/', views.article2, name='article2'),
    path('article3/', views.article3, name='article3'),
    path('article4/', views.article4, name='article4'),
    path('article5/', views.article5, name='article5'),
    path('article6/', views.article6, name='article6'),
    path('article7/', views.article7, name='article7'),
    path('article8/', views.article8, name='article8'),
    path('article9/', views.article9, name='article9'),
    path('article10/', views.article10, name='article10'),
    path('mentions/', views.mentions, name='mentions'),
]
