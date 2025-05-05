from sqlalchemy.orm import relationship
import uuid

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Report(db.Model):
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    quest_id = db.Column(db.Integer, db.ForeignKey('quest.id'), nullable=False)

    correct_answers = db.Column(db.Integer, default=0)
    wrong_answers = db.Column(db.Integer, default=0)

    user = relationship("User", back_populates="reports")
    quest = relationship("Quest", back_populates="reports")