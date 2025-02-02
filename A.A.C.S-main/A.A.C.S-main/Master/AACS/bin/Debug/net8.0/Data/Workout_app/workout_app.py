from tensorflow.keras.models import load_model
import numpy as np

model = load_model('workout_model.h5')

def generate_workout(fitness_level, goals, equipment):
  inputs = np.array([fitness_level, goals, equipment])
  prediction = model.predict(inputs)
  return prediction