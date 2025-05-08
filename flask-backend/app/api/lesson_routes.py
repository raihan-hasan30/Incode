from flask import Blueprint, request, jsonify
from app.models import Quest, db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash

lesson_router = Blueprint('lesson', __name__)

@lesson_router.route('/create', methods=['POST'])
@jwt_required()
def create_lesson():
    try:
        # Get the current user's identity
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        # Check if the user exists and has the 'admin' role
        if not user or user.role != 'admin':
            return jsonify({"errors": ["Unauthorized. Admin access required."]}), 403
        

    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500
