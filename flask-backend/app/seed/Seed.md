# Seeding the Admin User in Incode Application

This guide explains how to populate your database with an initial admin user for your Incode application. The seed script is compatible with both SQLite (local development) and PostgreSQL (production).

## Seed Script Location

- Path: `flask-backend/app/seed/user_seed.py`

## What the Seed Script Does

- Adds a user with the following details (if not already present):
  - **First Name:** Admin
  - **Last Name:** User
  - **Email:** admin@incode.com
  - **Password:** admin123 (hashed automatically)
  - **Role:** admin
- Prevents duplicate admin users by checking for the email.
- Works with both SQLite and PostgreSQL (no DB-specific code).

## How to Run the Seed Script

1. **Activate your Python environment** (if not already active):

   ```sh
   pipenv shell
   # or
   source venv/bin/activate
   ```

2. **Run the seed script:**

   ```sh
   pipenv run python -m app.seed.user_seed
   ```

   - You should see `Admin user created.` or `Admin user already exists.`

## Notes

- The script uses your app's context, so it will use the database configured in your Flask app (SQLite or PostgreSQL).
- The password is set to `admin123` by default. **Change this after first login in production!**
- The admin user can be used to log in and access admin features in your application.

## Database Relations

- The `User` model is independent but may relate to other models (e.g., lessons, quests) via foreign keys in other tables. This seed only creates a user and does not affect other tables.

---

For more advanced seeding (multiple users, relations), extend the script as needed.
