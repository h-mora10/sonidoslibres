from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=User)
def init_new_user(sender, instance, signal, created, **kwargs):
    if created:
        token=Token.objects.create(user=instance)
        print(token)