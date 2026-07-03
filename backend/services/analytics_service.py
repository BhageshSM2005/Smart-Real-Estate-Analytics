from sqlalchemy import func

from models.prediction_history import PredictionHistory


def get_analytics(user_id):

    predictions = PredictionHistory.query.filter_by(
        user_id=user_id
    ).all()

    total_predictions = len(predictions)

    if total_predictions == 0:

        return {
            "total_predictions": 0,
            "average_price": 0,
            "highest_price": 0,
            "lowest_price": 0
        }

    prices = [p.predicted_price for p in predictions]

    return {

        "total_predictions": total_predictions,

        "average_price": round(
            sum(prices) / len(prices),
            2
        ),

        "highest_price": round(
            max(prices),
            2
        ),

        "lowest_price": round(
            min(prices),
            2
        )
    }