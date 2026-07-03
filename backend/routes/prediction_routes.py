from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.prediction_service import (
    get_locations,
    predict_house_price,
    save_prediction,
    get_prediction_history
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


# @prediction_bp.route("/predict", methods=["POST"])
# @jwt_required()
# def predict():

#     data = request.get_json()

#     user_id = int(get_jwt_identity())

#     predicted_price = predict_house_price(

#         data["location"],
#         float(data["sqft"]),
#         int(data["bath"]),
#         int(data["bhk"])

#     )

#     save_prediction(

#         user_id,
#         data["location"],
#         float(data["sqft"]),
#         int(data["bath"]),
#         int(data["bhk"]),
#         predicted_price

#     )

#     return jsonify({

#         "predicted_price": round(predicted_price, 2)

#     })

@prediction_bp.route("/predict", methods=["POST"])
@jwt_required()
def predict():

    print("===== /predict called =====")

    data = request.get_json()
    print("Received data:", data)

    user_id = int(get_jwt_identity())

    predicted_price = predict_house_price(

        data["location"],
        float(data["sqft"]),
        int(data["bath"]),
        int(data["bhk"])

    )

    save_prediction(

        user_id,
        data["location"],
        float(data["sqft"]),
        int(data["bath"]),
        int(data["bhk"]),
        predicted_price

    )

    return jsonify({

        "predicted_price": round(predicted_price, 2)

    })

@prediction_bp.route("/history", methods=["GET"])
@jwt_required()
def history():

    user_id = int(get_jwt_identity())

    history = get_prediction_history(user_id)

    return jsonify([

        {
            "id": item.id,
            "location": item.location,
            "sqft": item.sqft,
            "bhk": item.bhk,
            "bath": item.bath,
            "predicted_price": item.predicted_price,
            "created_at": (item.created_at.strftime("%Y-%m-%d %H:%M") if item.created_at else "N/A")
        }

        for item in history

    ])