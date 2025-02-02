import cv2
import tensorflow as tf

# Load pre-trained plant classification model
model = tf.keras.models.load_model('plant_classifier_model.h5')

# Define plant names
plant_names = ['rose', 'sunflower', 'tulip', 'daisy', 'orchid']

def identify_plant(image_path):
  # Load and preprocess image
  image = cv2.imread(image_path)
  preprocessed_image = cv2.resize(image, (224, 224))
  preprocessed_image = preprocessed_image / 255.0

  # Make prediction
  prediction = model.predict(preprocessed_image[None, ...])
  predicted_class = tf.math.argmax(prediction).numpy()

  # Get plant name
  plant_name = plant_names[predicted_class]

  return plant_name

# Example usage
image_path = input("Enter image path: ")
plant_name = identify_plant(image_path)
print(f"Identified plant: {plant_name}")