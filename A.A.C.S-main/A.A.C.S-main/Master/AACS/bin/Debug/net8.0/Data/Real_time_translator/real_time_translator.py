from gtts import gTTS
import speech_recognition as sr
import pyaudio

def translate_text(text, target_language):
  tts = gTTS(text=text, lang=target_language)
  tts.save("translated_audio.mp3")

def recognize_speech():
  r = sr.Recognizer()
  with sr.Microphone() as source:
    print("Say something!")
    audio = r.listen(source)

  try:
    text = r.recognize_google(audio)
    print("You said: " + text)
    return text
  except sr.UnknownValueError:
    print("Google Speech Recognition could not understand audio")
    return None
  except sr.RequestError as e:
    print("Could not request results from Google Speech Recognition service; {0}".format(e))
    return None

# Example usage
source_language = "en"
target_language = "es"
text = recognize_speech()
if text:
  translate_text(text, target_language)