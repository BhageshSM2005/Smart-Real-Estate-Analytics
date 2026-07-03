from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from database import db
from models.user import User
from models.prediction_history import PredictionHistory
from routes.auth_routes import auth_bp
from routes.prediction_routes import prediction_bp
from models.prediction_history import PredictionHistory
from routes.profile_routes import profile_bp

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)

jwt = JWTManager(app)

app.register_blueprint(auth_bp)
app.register_blueprint(prediction_bp)
app.register_blueprint(profile_bp)

@app.route("/")
def home():
    return {
        "message": "Smart Real Estate Analytics API Running"
    }

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)