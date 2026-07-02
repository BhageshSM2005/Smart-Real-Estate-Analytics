import os
import sys

PROJECT_ROOT = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "..",
        ".."
    )
)

ML_FOLDER = os.path.join(PROJECT_ROOT, "ml")

if ML_FOLDER not in sys.path:
    sys.path.append(ML_FOLDER)

from train_model import (
    predict_price,
    get_location_names
)


def get_locations():
    return get_location_names()


def predict_house_price(location, sqft, bath, bhk):

    return predict_price(
        location,
        sqft,
        bath,
        bhk
    )