from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user
import traceback
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/')
def authenticate():
    """Authenticates a user."""
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/login', methods=['POST'])
def login():
    """Logs a user in"""
    try:
        form = LoginForm()

        if form.validate_on_submit():
            user = User.query.filter(User.email == form.data['email']).first()
            if not user:
                return {"errors": ["Invalid credentials."]}, 401

            login_user(user)
            access_token = create_access_token(identity=user.id)
            return {"access_token": access_token, "user": user.to_dict()}

        return {"errors": form.errors}, 401

    except Exception as e:
        return {"errors": ["Server error. Please try again."]}, 500

@auth_routes.route('/logout', methods=['POST'])
def logout():
    """Logs a user out"""
    logout_user()
    return {'message': 'User logged out'}

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """Creates a new user and logs them in"""
    try:
        form = SignUpForm()

        if form.validate_on_submit():
            user = User(
                firstName=form.data['firstName'],
                lastName=form.data['lastName'],
                profileImage=form.data['profileImage'],
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password']
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            access_token = create_access_token(identity=user.id)
            return {"access_token": access_token, "user": user.to_dict()}

        return {"errors": form.errors}, 401

    except Exception as e:
        return {"errors": ["Server error. Please try again."]}, 500

@auth_routes.route('/unauthorized')
def unauthorized():
    """Returns unauthorized response for unauthenticated access"""
    return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """Example protected route"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return {"user": user.to_dict()}
