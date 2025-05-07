from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Quest(db.Model, UserMixin):
    __tablename__ = 'quests'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    logo = db.Column(db.String(40), nullable=False)
    published = db.Column(db.Boolean, default=False)
    
    # Relationship with Lesson
    lessons = db.relationship("Lesson", back_populates="quest", cascade="all, delete-orphan")
    
    @property
    def quest_name(self):
        return self.name
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'logo': self.logo,
            'published': self.published,
            'lessons': [lesson.to_dict() for lesson in self.lessons]
        }


class Lesson(db.Model):
    __tablename__ = 'lessons'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    summary = db.Column(db.Text, nullable=True)
    command = db.Column(db.String(255), nullable=True)
    
    # Foreign key relationship with Quest
    quest_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('quests.id')), nullable=False)
    
    # Relationship with Quest
    quest = db.relationship("Quest", back_populates="lessons")
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'summary': self.summary,
            'command': self.command,
            'quest_id': self.quest_id
        }