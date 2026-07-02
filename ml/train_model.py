import pickle
import json
import numpy as np
import os

BASE_DIR = os.path.dirname(__file__)

model_path = os.path.join(
    BASE_DIR,
    "house_price_model.pkl"
)

columns_path = os.path.join(
    BASE_DIR,
    "columns.json"
)

with open(model_path, "rb") as f:
    model = pickle.load(f)

with open(columns_path, "r") as f:
    data_columns = json.load(f)["data_columns"]


def get_location_names():
    return data_columns[3:]


def predict_price(location, sqft, bath, bhk):

    x = np.zeros(len(data_columns))

    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    if location.lower() in data_columns:
        loc_index = data_columns.index(location.lower())
        x[loc_index] = 1

    return model.predict([x])[0]