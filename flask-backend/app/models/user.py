from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import uuid

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    profile_picture = db.Column(db.String(256))
    password = db.Column(db.String(128), nullable=False)

    reports = relationship("Report", back_populates="user")