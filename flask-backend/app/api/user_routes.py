from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, Quest, Lesson

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@jwt_required()
def users():
    """
    Query for all users with role 'user' and returns them in a list of user dictionaries.
    Only accessible to admins.
    """
    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()
    if not current_user or current_user.role != 'admin':
        return {"errors": ["Admin access required."]}, 403
    users = User.query.filter_by(role='user').all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@jwt_required()
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    Only accessible to admins.
    """
    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()
    if not current_user or current_user.role != 'admin':
        return {"errors": ["Admin access required."]}, 403
    user = User.query.get(id)
    return user.to_dict() if user else {"errors": ["User not found."]}, 404


@user_routes.route('/stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    """
    Returns counts for users (role=user), quests, and lessons. Only for admins.
    """
    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()
    if not current_user or current_user.role != 'admin':
        return {"errors": ["Admin access required."]}, 403
    users_count = User.query.filter_by(role='user').count()
    quests_count = Quest.query.count()
    lessons_count = Lesson.query.count()
    return jsonify({
        "users": users_count,
        "quests": quests_count,
        "lessons": lessons_count
    })
