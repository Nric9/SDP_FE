from tensorflow.keras.models import load_model
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image
import os

# Load the trained model
model = load_model('fire_cnn_model.h5')
print("✅ Model loaded successfully.")


img_path = 'hd4.jpg'
class_names = ['Smoke', 'fire_images', 'non_fire_images']

def predict_single_image(img_path):
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    predicted_class = class_names[np.argmax(prediction)]

    plt.imshow(img)
    plt.axis('off')
    plt.title(f"Predicted: {predicted_class}")
    plt.show()

    print("Confidence Scores:", dict(zip(class_names, prediction[0])))
    print("Predicted Class:", predicted_class)

predict_single_image(img_path)
