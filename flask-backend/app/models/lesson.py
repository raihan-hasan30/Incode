from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Lesson(db.Model):
    __tablename__ = 'lessons'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.String(150), primary_key=True)
    quest_id = db.Column(
        db.String(100),
        db.ForeignKey(add_prefix_for_prod('quests.id')),
        nullable=False
    )
    name = db.Column(db.String(100), nullable=False)
    summary = db.Column(db.Text, nullable=True)
    command = db.Column(db.Text, nullable=True)

    quest = db.relationship('Quest', back_populates='lessons')

    def to_dict(self):
        return {
            'id': self.id,
            'quest_id': self.quest_id,
            'name': self.name,
            'summary': self.summary,
            'command': self.command
        }