from django.db import models

# Create your models here.
 
class Question(models.Model):
    question = models.TextField() 
 
    """Réponses, requiert au moins 2, avec un max de 8. Si une question n'utilise pas toutes les réponses, les set à None dans le cas où rien n'est spécifié"""
    anwser1 = models.CharField(max_length=255)
    anwser2 = models.CharField(max_length=255)
    anwser3 = models.CharField(max_length=255, blank=True, null=True, default=None)
    anwser4 = models.CharField(max_length=255, blank=True, null=True, default=None)
    anwser5 = models.CharField(max_length=255, blank=True, null=True, default=None)
    anwser6 = models.CharField(max_length=255, blank=True, null=True, default=None)
    anwser7 = models.CharField(max_length=255, blank=True, null=True, default=None)
    anwser8 = models.CharField(max_length=255, blank=True, null=True, default=None)
 
    """Réponse correcte + explication, renvoie vers un article plus détaillé"""
    anwser = models.TextField()
