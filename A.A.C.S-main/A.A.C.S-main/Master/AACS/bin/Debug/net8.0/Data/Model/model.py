from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from midi_utils import midi_to_sequences, sequence_to_midi

model = Sequential()
model.add(LSTM(128, input_shape=(sequence_length, num_notes)))
model.add(Dense(num_notes, activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam')