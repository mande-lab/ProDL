import spotipy
from spotipy.oauth2 import SpotifyOAuth
from music_information_retrieval import get_mood, get_activity

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope="playlist-modify-private"))

def create_playlist(mood, activity):
  tracks = []
  for track in sp.search(q=f"mood:{mood} activity:{activity}", type="track", limit=50):
    tracks.append(track["tracks"]["items"][0]["id"])
  
  playlist_name = f"{mood} {activity} Playlist"
  sp.user_playlist_create(user="your_username", name=playlist_name)
  sp.user_playlist_add_tracks(user="your_username", playlist_id=sp.playlist_create(user="your_username", name=playlist_name)["id"], tracks=tracks)