from django import forms
from .models import Room

class CreateRoomForm(forms.ModelForm):
  class Meta:
    model = Room
    fields = ["name", "slug","host"]
    labels = {'name': "Name", "slug": "Unique slug",}