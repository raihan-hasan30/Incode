import os
from flask import Flask, request, redirect, render_template, send_from_directory
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.quest_routes import quest_router
from .api.lesson_routes import lesson_router
from .config import Config

# Correct the template folder path to resolve properly
template_dir = os.path.join(os.path.dirname(__file__), 'templates')
app = Flask(__name__, template_folder=template_dir)

app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = False  # set to True in production (requires HTTPS)
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_CSRF_PROTECT'] = True


# Config
app.config.from_object(Config)
db.init_app(app)

# Enable CORS with cookies and allow all origins
CORS(app, supports_credentials=True)

# Initialize JWT Manager
jwt = JWTManager()
jwt.init_app(app)

# Register blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(quest_router, url_prefix='/api/quest')
app.register_blueprint(lesson_router, url_prefix='/api/lesson')

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            return redirect(url, code=301)


@app.route('/')
def react_root():
    return 

# Update the 404 error handler to render the index.html template
@app.errorhandler(404)
def not_found(e):
    return render_template('index.html')


@app.route('/api/quest/logo/<filename>')
def serve_quest_logo(filename):
    static_dir = os.path.join(os.path.dirname(__file__), 'static', 'quest_logos')
    return send_from_directory(static_dir, filename)


app.run(debug=True)