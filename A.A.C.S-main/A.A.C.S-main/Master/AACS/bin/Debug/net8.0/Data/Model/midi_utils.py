import mido
import numpy as np

def midi_to_sequences(midi_file):
  midi = mido.MidiFile(midi_file)
  sequences = []
  for track in midi.tracks:
    for msg in track:
      if msg.type == 'note_on' and msg.velocity > 0:
        note_on = np.array([msg.note, msg.time])
        sequences.append(note_on)
  return np.array(sequences)

def sequence_to_midi(sequence, output_file):
  midi = mido.MidiFile()
  track = mido.MidiTrack()
  for note, time in sequence:
    note_on = mido.Message('note_on', note=note, velocity=64, time=time)
    note_off = mido.Message('note_off', note=note, velocity=0, time=0)
    track.append(note_on)
    track.append(note_off)
  midi.tracks.append(track)
  midi.save(output_file)