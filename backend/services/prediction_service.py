import os
import sys

from database import db
from models.prediction_history import PredictionHistory

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


def save_prediction(user_id, location, sqft, bath, bhk, predicted_price):

    prediction = PredictionHistory(

        user_id=user_id,
        location=location,
        sqft=sqft,
        bath=bath,
        bhk=bhk,
        predicted_price=predicted_price

    )

    db.session.add(prediction)
    db.session.commit()

    return prediction


def get_prediction_history(user_id):

    history = PredictionHistory.query.filter_by(
        user_id=user_id
    ).order_by(
        PredictionHistory.created_at.desc()
    ).all()

    return history