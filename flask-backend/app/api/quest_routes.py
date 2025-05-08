from flask import Blueprint, request, jsonify
from app.models import Quest, db, User, Lesson
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash

quest_router = Blueprint('quest', __name__)

@quest_router.route('/', methods=['GET'])
def get_quest_list():
    try:
        published_quests = Quest.query.filter(Quest.published.is_(True)).all()
        quests = [quest.to_dict() for quest in published_quests]

        print(quests)

        return jsonify(quests)
    except Exception as e:
      return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@quest_router.route('/create', methods=['POST'])
@jwt_required()
def create_quest():
    try:
        # Get the current user's identity
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        # Check if the user exists and has the 'admin' role
        if not user or user.role != 'admin':
            return jsonify({"errors": ["Unauthorized. Admin access required."]}), 403

        # Get the questName from the request body
        data = request.get_json()
        quest_name = data.get('questName')

        if not quest_name:
            return jsonify({"errors": ["Quest name is required."]}), 400

        # Create a new quest
        new_quest = Quest(questName=quest_name)
        db.session.add(new_quest)
        db.session.commit()

        return jsonify(new_quest.to_dict()), 201

    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@quest_router.route('/<quest_id>/lessons', methods=['POST'])
@jwt_required()
def create_lesson(quest_id):
    try:
        # Get the current user's identity
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        # Check if the user exists and has the 'admin' role
        if not user or user.role != 'admin':
            return jsonify({"errors": ["Unauthorized. Admin access required."]}), 403

        # Get the lesson details from the request body
        data = request.get_json()
        lesson_name = data.get('name')
        summary = data.get('summary')
        command = data.get('command')

        if not lesson_name:
            return jsonify({"errors": ["Lesson name is required."]}), 400

        # Check if the quest exists
        quest = Quest.query.get(quest_id)
        if not quest:
            return jsonify({"errors": ["Quest not found."]}), 404

        # Create a new lesson
        new_lesson = Lesson(
            quest_id=quest_id,
            name=lesson_name,
            summary=summary,
            command=command
        )
        db.session.add(new_lesson)
        db.session.commit()

        return jsonify(new_lesson.to_dict()), 201

    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500
