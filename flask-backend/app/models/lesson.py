from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Lesson(db.Model):
    id = db.Column(db.String, primary_key=True)  # Concatenated ID: questName + lessonName
    name = db.Column(db.String(64), nullable=False)
    summary = db.Column(db.Text)
    command = db.Column(db.String(128))

    quest_id = db.Column(db.Integer, db.ForeignKey('quest.id'), nullable=False)
    quest = relationship("Quest", back_populates="lessons")