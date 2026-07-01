from urllib.parse import quote_plus

password = quote_plus("Bhagesh@2005")


class Config:

    SECRET_KEY = "smart_real_estate_secret_key"

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://root:{password}@localhost/smart_real_estate"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "smart_real_estate_jwt_secret"