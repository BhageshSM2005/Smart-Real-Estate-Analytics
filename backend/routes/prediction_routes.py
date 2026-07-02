from flask import Blueprint, jsonify, request

from services.prediction_service import (
    get_locations,
    predict_house_price
)

prediction_bp = Blueprint(
    "prediction",
    __name__
)


@prediction_bp.route("/locations", methods=["GET"])
def locations():

    return jsonify({
        "locations": get_locations()
    })


@prediction_bp.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    predicted_price = predict_house_price(
        data["location"],
        float(data["sqft"]),
        int(data["bath"]),
        int(data["bhk"])
    )

    return jsonify({

        "predicted_price": round(predicted_price, 2)

    })