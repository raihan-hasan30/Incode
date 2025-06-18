from app.models import db, User
from sqlalchemy.exc import IntegrityError

def seed_admin_user():
    """
    Seed an admin user. Will not duplicate if email already exists.
    Compatible with both SQLite and PostgreSQL.
    """
    users = [
         User(
                firstName="Admin",
                lastName="User",
                email="admin@incode.io",
                password="admin@incode.io",  # Will be hashed by model
                role="admin",
                profileImage="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?semt=ais_hybrid&w=740"
            ),
             User(
                firstName="Demo",
                lastName="User",
                email="user@incode.io",
                password="admin@incode.io",  # Will be hashed by model
                role="user",
                profileImage=None
            )
    ]

    db.session.add_all(users)
    db.session.commit()

if __name__ == "__main__":
    from app import create_app
    app = create_app()
    with app.app_context():
        seed_admin_user()
