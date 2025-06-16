# Incode React-Flask Application

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/react-18+-61dafb.svg)](https://react.dev/)

This is a full-stack web application built with a React frontend and a Flask backend. The project is designed for interactive lessons, quests, and battles, supporting user authentication and admin features.

## Features

- User registration, login, and authentication
- Interactive lessons and quests
- Battle mode for typing or coding challenges
- Admin dashboard for managing users, lessons, and quests
- RESTful API with Flask
- Modern, responsive UI with React and Tailwind CSS

## Project Structure

```
.
├── flask-backend/   # Flask API backend
│   ├── app/
│   │   ├── api/         # API route definitions
│   │   ├── models/      # SQLAlchemy models
│   │   ├── seed/        # Seed scripts for initial data
│   │   ├── static/      # Static files (e.g., quest logos)
│   │   └── templates/   # HTML templates
│   ├── instance/        # Database file
│   ├── requirements.txt
│   └── ...
└── frontend/        # React frontend
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── context/     # React context providers
    │   └── ...
    ├── public/          # Static assets
    ├── package.json
    └── ...
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup (Flask)

1. Navigate to the backend directory:
   ```sh
   cd flask-backend
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Set up the database:
   ```sh
   flask db upgrade
   ```
   Or, if using SQLite, ensure `instance/data.db` exists.
4. (Optional) Seed the database:
   ```sh
   python -m app.seed.lesson_seed
   python -m app.seed.user_seed
   ```
5. Run the Flask server:
   ```sh
   flask run
   ```
   The API will be available at `http://localhost:5000/`.

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173/` (or as specified by Vite).

### Environment Variables

- Configure backend and frontend URLs as needed for local development and production.

## Usage

- Register or log in as a user.
- Access lessons, quests, and battle features.
- Admin users can manage content via the dashboard.

## Deployment

You can deploy the backend and frontend separately on platforms like Heroku, Vercel, or your own server. Make sure to set environment variables for production and configure CORS as needed.

## Technologies Used

- **Backend:** Python, Flask, SQLAlchemy
- **Frontend:** React, Vite, Tailwind CSS, Redux
- **Database:** SQLite (default, can be changed)
- **API:** RESTful endpoints

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
