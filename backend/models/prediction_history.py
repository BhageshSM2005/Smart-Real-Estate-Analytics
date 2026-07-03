from database import db
from datetime import datetime

class PredictionHistory(db.Model):

    __tablename__ = "prediction_history"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    location = db.Column(
        db.String(100),
        nullable=False
    )

    sqft = db.Column(
        db.Float,
        nullable=False
    )

    bath = db.Column(
        db.Integer,
        nullable=False
    )

    bhk = db.Column(
        db.Integer,
        nullable=False
    )

    predicted_price = db.Column(
        db.Float,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )