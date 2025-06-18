import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Use the provided Postgres connection string if available, otherwise fallback to sqlite
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "sqlite:///data.db"
    )
    SQLALCHEMY_ECHO = True
