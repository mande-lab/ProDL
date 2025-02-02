import tensorflow as tf
from tensorflow.keras.preprocessing import image

model = tf.keras.models.load_model('plant_disease_model.h5')

def detect_disease(image_path):
  img = image.load_img(image_path, target_size=(128, 128))
  x = image.img_to_array(img)
  x = np.expand_dims(x, axis=0)
  prediction = model.predict(x)
  return prediction

image_path = "plant_image.jpg"
prediction = detect_disease(image_path)
print(prediction)