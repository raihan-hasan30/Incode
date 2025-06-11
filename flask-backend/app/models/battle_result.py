from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class BattleResult(db.Model):
    __tablename__ = 'battle_results'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    quest_id = db.Column(db.String(100), db.ForeignKey(add_prefix_for_prod('quests.id')), nullable=False)
    point = db.Column(db.Integer, nullable=False)
    right = db.Column(db.Integer, nullable=False)
    wrong = db.Column(db.Integer, nullable=False)
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User')
    quest = db.relationship('Quest')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'quest_id': self.quest_id,
            'point': self.point,
            'right': self.right,
            'wrong': self.wrong,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
        }
