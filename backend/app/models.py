from . import db

# Association table for many-to-many relationship between User and Quest
user_quests = db.Table('user_quests',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('quest_id', db.Integer, db.ForeignKey('quest.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    profile_picture = db.Column(db.String(256))
    role = db.Column(db.String(64), default='incodee')
    quests = db.relationship('Quest', secondary=user_quests, backref='users')

class Quest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quest_name = db.Column(db.String(128), nullable=False)
    logo = db.Column(db.String(256))
    lessons = db.relationship('Lesson', backref='quest', lazy=True)

class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lesson_name = db.Column(db.String(128), nullable=False)
    command = db.Column(db.String(128))
    summary = db.Column(db.Text)
    quest_id = db.Column(db.Integer, db.ForeignKey('quest.id'), nullable=False)
