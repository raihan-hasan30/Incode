from sqlalchemy.orm import relationship

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Quest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quest_name = db.Column(db.String(64), unique=True, nullable=False)
    logo = db.Column(db.String(256))

    lessons = relationship("Lesson", back_populates="quest", cascade="all, delete")
    reports = relationship("Report", back_populates="quest")