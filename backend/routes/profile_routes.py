from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.profile_service import (

    get_user_profile,

    update_profile,

    change_password

)

profile_bp = Blueprint(

    "profile",

    __name__

)


@profile_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    user_id = int(get_jwt_identity())

    return jsonify(

        get_user_profile(user_id)

    )


@profile_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    return jsonify(

        update_profile(

            user_id,

            data["name"],

            data["email"]

        )

    )


@profile_bp.route("/change-password", methods=["PUT"])
@jwt_required()
def password():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    return jsonify(

        change_password(

            user_id,

            data["old_password"],

            data["new_password"]

        )

    )