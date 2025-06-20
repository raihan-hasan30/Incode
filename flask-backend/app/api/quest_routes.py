from flask import Blueprint, request, jsonify, send_from_directory, current_app
from app.models import Quest, db, User, Lesson
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import os
from werkzeug.utils import secure_filename

quest_router = Blueprint('quest', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'quest_logos')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def get_logo_url(filename):
    if not filename:
        return None
    return f"/api/quest/logo/{filename}"

@quest_router.route('/', methods=['GET'])
def get_quest_list():
    try:
        if request.args.get('all') == 'true':
            quests = Quest.query.all()
        else:
            quests = Quest.query.filter(Quest.published.is_(True)).all()
        return jsonify([{
            **quest.to_dict(),
            'logo': get_logo_url(quest.logo)
        } for quest in quests])
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@quest_router.route('/<quest_id>', methods=['GET'])
def get_quest(quest_id):
    try:
        quest = Quest.query.get(quest_id)
        if not quest:
            return jsonify({"errors": ["Quest not found."]}), 404
        return jsonify({
            **quest.to_dict(),
            'logo': get_logo_url(quest.logo)
        })
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@quest_router.route('/create', methods=['POST'])
def create_quest():
    try:
        if request.content_type and request.content_type.startswith('multipart/form-data'):
            data = request.form
            quest_name = data.get('questName')
            published = data.get('published', 'false').lower() == 'true'
            logo_file = request.files.get('logo')
        else:
            data = request.get_json()
            quest_name = data.get('questName')
            published = data.get('published', False)
            logo_file = None
        if not quest_name or not quest_name.strip():
            return jsonify({"errors": ["Quest name is required."]}), 400
        quest_id = quest_name.replace(" ", "_").lower() + "_" + str(uuid.uuid4())
        logo_filename = None
        if logo_file:
            logo_filename = f"{quest_id}_{secure_filename(logo_file.filename)}"
            logo_path = os.path.join(UPLOAD_FOLDER, logo_filename)
            logo_file.save(logo_path)
        new_quest = Quest(
            questName=quest_name.strip(),
            id=quest_id,
            logo=logo_filename,
            published=published
        )
        db.session.add(new_quest)
        db.session.commit()
        return jsonify({
            **new_quest.to_dict(),
            'logo': get_logo_url(new_quest.logo)
        }), 201
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@quest_router.route('/<quest_id>', methods=['PUT'])
def update_quest(quest_id):
    try:
        quest = Quest.query.get(quest_id)
        if not quest:
            return jsonify({"errors": ["Quest not found."]}), 404
        if request.content_type and request.content_type.startswith('multipart/form-data'):
            data = request.form
            quest_name = data.get('questName')
            published = data.get('published', str(quest.published)).lower() == 'true'
            logo_file = request.files.get('logo')
        else:
            data = request.get_json()
            quest_name = data.get('questName')
            published = data.get('published', quest.published)
            logo_file = None
        if quest_name and quest_name.strip():
            quest.questName = quest_name.strip()
        quest.published = published
        if logo_file:
            # Remove old logo file if exists
            if quest.logo:
                old_path = os.path.join(UPLOAD_FOLDER, quest.logo)
                if os.path.exists(old_path):
                    os.remove(old_path)
            logo_filename = f"{quest.id}_{secure_filename(logo_file.filename)}"
            logo_path = os.path.join(UPLOAD_FOLDER, logo_filename)
            logo_file.save(logo_path)
            quest.logo = logo_filename
        db.session.commit()
        return jsonify({
            **quest.to_dict(),
            'logo': get_logo_url(quest.logo)
        })
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@quest_router.route('/<quest_id>', methods=['DELETE'])
def delete_quest(quest_id):
    try:
        quest = Quest.query.get(quest_id)
        if not quest:
            return jsonify({"errors": ["Quest not found."]}), 404
        # Remove logo file if exists
        if quest.logo:
            logo_path = os.path.join(UPLOAD_FOLDER, quest.logo)
            if os.path.exists(logo_path):
                os.remove(logo_path)
        db.session.delete(quest)
        db.session.commit()
        return jsonify({"message": "Quest deleted successfully."})
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@quest_router.route('/<quest_id>/publish', methods=['PATCH'])
def toggle_publish_quest(quest_id):
    try:
        quest = Quest.query.get(quest_id)
        if not quest:
            return jsonify({"errors": ["Quest not found."]}), 404
        quest.published = not quest.published
        db.session.commit()
        return jsonify({
            **quest.to_dict(),
            'logo': get_logo_url(quest.logo)
        })
    except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

# Serve quest logo images
@quest_router.route('/logo/<filename>', methods=['GET'])
def serve_logo(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename)
    except Exception as e:
        return jsonify({"errors": ["Image not found."]}), 404

@quest_router.route('/<quest_id>/lesson', methods=['POST'])
def create_lesson(quest_id):
    try:
        data = request.get_json()
        lesson_name = data.get('name')
        summary = data.get('summary')
        command = data.get('command')

        if not lesson_name:
            return jsonify({"errors": ["Lesson name is required."]}), 400

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
