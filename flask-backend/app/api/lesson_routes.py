from flask import Blueprint, request, jsonify
from app.models import Quest, db, Lesson, User
from flask_jwt_extended import jwt_required, get_jwt_identity

lesson_router = Blueprint('lesson', __name__)

@lesson_router.route('/<quest_id>/create', methods=['POST'])
def create_lesson(quest_id):
    try:
        
        data = request.get_json()
        name = data.get('name')
        summary = data.get('summary')
        command = data.get('command')
        if not name:
            return jsonify({"errors": ["Lesson name is required."]}), 400
        quest = Quest.query.get(quest_id)
        if not quest:
            return jsonify({"errors": ["Quest not found."]}), 404
        lesson = Lesson(quest_id=quest_id, name=name, summary=summary, command=command)
        db.session.add(lesson)
        db.session.commit()
        return jsonify(lesson.to_dict()), 201
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@lesson_router.route('/<quest_id>', methods=['GET'])
def get_lessons_for_quest(quest_id):
    try:
        quest = Quest.query.get(quest_id)
        if not quest:
            return jsonify({"errors": ["Quest not found."]}), 404
        lessons = Lesson.query.filter_by(quest_id=quest_id).all()
        return jsonify([lesson.to_dict() for lesson in lessons])
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@lesson_router.route('/<quest_id>/<lesson_id>', methods=['GET'])
def get_lesson(quest_id, lesson_id):
    try:
        lesson = Lesson.query.filter_by(quest_id=quest_id, id=lesson_id).first()
        if not lesson:
            return jsonify({"errors": ["Lesson not found."]}), 404
        return jsonify(lesson.to_dict())
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@lesson_router.route('/<quest_id>/<lesson_id>', methods=['PUT'])
def update_lesson(quest_id, lesson_id):
    try:
        lesson = Lesson.query.filter_by(quest_id=quest_id, id=lesson_id).first()
        if not lesson:
            return jsonify({"errors": ["Lesson not found."]}), 404
        data = request.get_json()
        name = data.get('name')
        summary = data.get('summary')
        command = data.get('command')
        if name:
            lesson.name = name
        if summary is not None:
            lesson.summary = summary
        if command is not None:
            lesson.command = command
        db.session.commit()
        return jsonify(lesson.to_dict())
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@lesson_router.route('/<quest_id>/<lesson_id>', methods=['DELETE'])
def delete_lesson(quest_id, lesson_id):
    try:
       
        lesson = Lesson.query.filter_by(quest_id=quest_id, id=lesson_id).first()
        if not lesson:
            return jsonify({"errors": ["Lesson not found."]}), 404
        db.session.delete(lesson)
        db.session.commit()
        return jsonify({"message": "Lesson deleted successfully."})
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500
