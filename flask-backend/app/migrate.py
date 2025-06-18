from flask_migrate import Migrate
from . import create_app
from .models import db

app = create_app()
migrate = Migrate(app, db)