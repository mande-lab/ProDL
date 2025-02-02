from tensorflow.keras.models import load_model
import numpy as np

model = load_model('music_model.h5')

def generate_playlist(user_genre, num_songs=5):
  user_genre_vector = np.array([user_genre])
  predictions = model.predict(user_genre_vector)
  top_song_indices = np.argsort(predictions)[::-1][:num_songs]
  return top_song_indices

"ar_anatomy_app.cs"