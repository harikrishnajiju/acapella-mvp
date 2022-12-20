from django.contrib.auth.models import User
# from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.

class Room(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name="host", verbose_name="Host")

#abel
    def __str__(self):
        return self.name

class Message(models.Model):
    room = models.ForeignKey(Room, related_name='messages', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('date_added',)

#abel
class Song(models.Model):
    song_name=models.CharField(max_length=200)
    songurl= models.URLField(max_length=250)

    def __str__(self):
        return self.song_name

class Playlist(models.Model):
    list_name=models.CharField(max_length=100)
    room=models.ForeignKey(Room,on_delete=models.CASCADE,default=1)
    song=models.ManyToManyField(Song)

    def __str__(self):
        return self.list_name