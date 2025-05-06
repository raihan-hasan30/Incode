import os
from flask import Flask, request, redirect, render_template
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .config import Config

# Correct the template folder path to resolve properly
template_dir = os.path.join(os.path.dirname(__file__), 'templates')
app = Flask(__name__, template_folder=template_dir)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# Config
app.config.from_object(Config)
db.init_app(app)

# Enable CORS with cookies
CORS(app, supports_credentials=True)

# Initialize JWT Manager
jwt = JWTManager()
jwt.init_app(app)

# Register blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')

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
