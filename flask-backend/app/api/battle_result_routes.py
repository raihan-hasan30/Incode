from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, BattleResult, Quest, User

battle_result_routes = Blueprint('battle_result', __name__)

@battle_result_routes.route('/battle-result', methods=['POST'])
@jwt_required()
def create_battle_result():
    data = request.get_json()
    quest_id = data.get('quest_id')
    point = data.get('point')
    right = data.get('right')
    wrong = data.get('wrong')

    if not quest_id or point is None or right is None or wrong is None:
        return jsonify({'error': 'Missing required fields'}), 400

    quest = Quest.query.get(quest_id)
    if not quest:
        return jsonify({'error': 'Quest not found'}), 404

    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    battle_result = BattleResult(
        user_id=user_id,
        quest_id=quest_id,
        point=point,
        right=right,
        wrong=wrong
    )
    db.session.add(battle_result)
    db.session.commit()
    return jsonify(battle_result.to_dict()), 201

@battle_result_routes.route('/battle-result', methods=['GET'])
@jwt_required()
def get_my_battle_results():
    user_id = get_jwt_identity()
    results = BattleResult.query.filter_by(user_id=user_id).order_by(BattleResult.completed_at.desc()).all()
    return jsonify([r.to_dict() for r in results])

@battle_result_routes.route('/battle-result/<int:result_id>', methods=['GET'])
@jwt_required()
def get_battle_result(result_id):
    user_id = get_jwt_identity()
    result = BattleResult.query.get(result_id)
    if not result or result.user_id != user_id:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(result.to_dict())
