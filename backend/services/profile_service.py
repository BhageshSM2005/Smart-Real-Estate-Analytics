import bcrypt

from database import db
from models.user import User


def get_user_profile(user_id):

    user = User.query.get(user_id)

    return {

        "id": user.id,
        "name": user.name,
        "email": user.email

    }


def update_profile(user_id, name, email):

    user = User.query.get(user_id)

    user.name = name
    user.email = email

    db.session.commit()

    return {

        "message": "Profile updated successfully"

    }


def change_password(user_id, old_password, new_password):

    user = User.query.get(user_id)

    if not bcrypt.checkpw(

        old_password.encode(),

        user.password.encode()

    ):

        return {

            "success": False,
            "message": "Old password is incorrect"

        }

    hashed = bcrypt.hashpw(

        new_password.encode(),

        bcrypt.gensalt()

    ).decode()

    user.password = hashed

    db.session.commit()

    return {

        "success": True,
        "message": "Password changed successfully"

    }