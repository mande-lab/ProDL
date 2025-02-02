from transformers import pipeline
import soundfile as sf

def generate_melody(text):
  generator = pipeline("text-to-music", model="openai/music-generator-v2")
  music = generator(text)[0]
  audio_data = music["audio"]
  sf.write("generated_melody.wav", audio_data, samplerate=44100)

if __name__ == "__main__":
  text_description = input("Enter a text description for your melody: ")
  generate_melody(text_description)
  print("Melody generated and saved as generated_melody.wav")