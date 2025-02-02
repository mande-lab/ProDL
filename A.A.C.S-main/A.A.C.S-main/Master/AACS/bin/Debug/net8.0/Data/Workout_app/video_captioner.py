import speech_recognition as sr
from pydub import AudioSegment

def generate_captions(video_path):
  audio = AudioSegment.from_file(video_path)
  r = sr.Recognizer()
  with sr.AudioFile(video_path) as source:
    audio_data = r.record(source)
    text = r.recognize_google(audio_data)
  return text

video_path = "my_video.mp4"
captions = generate_captions(video_path)
print(captions)