from flask import Blueprint, request, jsonify
from app.models import User, db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json();

        # need to validate form
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter(User.email == email).first()
        if not user or not check_password_hash(user.password, password):
            return {"errors": ["Invalid credentials."]}, 401

        access_token = create_access_token(identity=user.email)
        response = jsonify({"login" : True, "user" : user.to_dict()})
        set_access_cookies(response, access_token)

        return response

    except Exception as e:
        return {"errors": ["Server error. Please try again.", str(e)]}, 500

@auth_routes.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')
        firstName = data.get('firstName')
        lastName = data.get('lastName')

        user = User.query.filter(User.email == email).first()
        
        
        if user:
            return {"errors": ["User with this email already exists."]}, 400
        
        # Create new user
        new_user = User(
            email=email,
            password=password,
            firstName=firstName,
            lastName=lastName
        )
        db.session.add(new_user)
        db.session.commit()

        # Create access token
        access_token = create_access_token(identity=new_user.email)
        response = jsonify({
            "register": True, 
            "user": new_user.to_dict()
        })
        set_access_cookies(response, access_token)
        return response
    
    except Exception as e:
        print("Error in register: ", e)
        return {"errors": [str(e)]}, 500


@auth_routes.route('/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'User logged out'})
    unset_jwt_cookies(response)
    return response


@auth_routes.route('/me', methods=['GET'])
@jwt_required()
def me():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return {"errors": ["User not found."]}, 404
    return {"user": user.to_dict()}, 200
