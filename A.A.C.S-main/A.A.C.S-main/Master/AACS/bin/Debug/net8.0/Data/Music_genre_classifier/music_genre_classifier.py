from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Flatten, Dense
import librosa
import numpy as np

def extract_features(audio_file):
  y, sr = librosa.load(audio_file)
  mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
  return np.mean(mfccs.T, axis=0)

model = Sequential()
model.add(Conv1D(filters=64, kernel_size=3, activation='relu', input_shape=(40,)))
model.add(MaxPooling1D(pool_size=2))
model.add(Flatten())
model.add(Dense(10, activation='softmax'))
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])