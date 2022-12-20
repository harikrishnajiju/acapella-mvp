from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
#abel
from django.http import HttpResponse

from .forms import CreateRoomForm

# Create your views here.

#abel
from .models import Room, Song, Playlist

def create(request):
    if request.method == 'POST':
        title=request.POST['title']
        url=request.POST['url']
        rom=request.POST['room']
        r=Room.objects.get(slug=rom)
        new_song = Song(song_name=title,songurl=url)
        new_song.save()
        # success='Song Created in ' + rom
        success=title
        if Playlist.objects.filter(room=r).exists():
            p = Playlist.objects.get(room=r)
            p.song.add(new_song)
        else:
            sgs = Song.objects.filter(song_name=title)
            inst = Playlist.objects.create(list_name=rom,room=r)
            inst.song.set(sgs) 
        return HttpResponse(success)

@login_required
def rooms(request):
    rooms = Room.objects.all()

    return render(request, 'room/rooms.html', {'rooms': rooms})

@login_required
def room(request, slug):
    room = Room.objects.get(slug=slug)

    return render(request, 'room/room.html', {'room': room})

@login_required
def createroom(request):
    if request.method == 'POST':
        form = CreateRoomForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('index')
    else:
        form = CreateRoomForm()
    return render(request, 'room/createroom.html', {'form': form})
