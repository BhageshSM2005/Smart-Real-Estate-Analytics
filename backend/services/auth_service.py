import bcrypt

from database import db
from models.user import User
from flask_jwt_extended import create_access_token


def register_user(name, email, password):

    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:

        return {
            "success": False,
            "message": "Email already exists"
        }

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    user = User(
        name=name,
        email=email,
        password=hashed_password.decode("utf-8")
    )

    db.session.add(user)
    db.session.commit()

    return {
        "success": True,
        "message": "User Registered Successfully"
    }


def login_user(email, password):

    user = User.query.filter_by(
        email=email
    ).first()

    if user is None:

        return {
            "success": False,
            "message": "Invalid Email"
        }

    password_matches = bcrypt.checkpw(
        password.encode("utf-8"),
        user.password.encode("utf-8")
    )

    if not password_matches:

        return {
            "success": False,
            "message": "Invalid Password"
        }

    token = create_access_token(
        identity=str(user.id)
    )

    return {
        "success": True,
        "message": "Login Successful",
        "token": token
    }