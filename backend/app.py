from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from database import db

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)

jwt = JWTManager(app)


@app.route("/")
def home():
    return {
        "message": "Smart Real Estate Analytics API Running"
    }


if __name__ == "__main__":
    app.run(debug=True)