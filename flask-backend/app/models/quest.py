from .db import db, environment, SCHEMA, add_prefix_for_prod

class Quest(db.Model):
    __tablename__ = 'quests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.String(100), primary_key=True)
    questName = db.Column(db.String(100), nullable=False)
    challenges = db.Column(db.Integer, nullable=False, default=0)
    logo = db.Column(db.String(255), nullable=True)
    published = db.Column(db.Boolean, default=False)  

    lessons = db.relationship(
        'Lesson',
        back_populates='quest',
        cascade='all, delete-orphan'
    )

    @property
    def lessons_count(self):
        """Dynamically calculates the number of lessons."""
        return len(self.lessons)

    def to_dict(self, include_lessons=False):
        data = {
            'id': self.id,
            'questName': self.questName,
            'challenges': self.challenges,
            'lessonsCount': self.lessons_count,
            'logo': self.logo,  # URL will be added in the route
            'published': self.published
        }
        if include_lessons:
            data['lessons'] = [lesson.to_dict() for lesson in self.lessons]
        return data