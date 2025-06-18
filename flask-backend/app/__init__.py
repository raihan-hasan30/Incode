import os
from flask import Flask, request, redirect, render_template, send_from_directory
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.quest_routes import quest_router
from .api.lesson_routes import lesson_router
from .api.battle_result_routes import battle_result_routes
from .config import Config

# Correct the template folder path to resolve properly
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../frontend/dist'))


def create_app():
    app = Flask(__name__, static_folder=frontend_dist, template_folder=frontend_dist)

    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_SECURE'] = False  # set to True in production (requires HTTPS)
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
    app.config['JWT_COOKIE_CSRF_PROTECT'] = True
    app.config['JWT_COOKIE_SAMESITE'] = 'Lax'  # Use Lax for local dev, None for production

    # Config
    app.config.from_object(Config)
    db.init_app(app)

    # Print the database URI for debugging
    print('Connecting to database:', app.config['SQLALCHEMY_DATABASE_URI'])

    # Enable CORS with cookies and allow only frontend origin
    CORS(app, supports_credentials=True, origins=["http://localhost:5174"])

    # Initialize JWT Manager
    jwt = JWTManager()
    jwt.init_app(app)

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)

    # Register blueprints
    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(quest_router, url_prefix='/api/quest')
    app.register_blueprint(lesson_router, url_prefix='/api/lesson')
    app.register_blueprint(battle_result_routes, url_prefix='/api')

    @app.before_request
    def https_redirect():
        if os.environ.get('FLASK_ENV') == 'production':
            if request.headers.get('X-Forwarded-Proto') == 'http':
                url = request.url.replace('http://', 'https://', 1)
                return redirect(url, code=301)


    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def react_root(path):
        # Serve static files if they exist, otherwise serve index.html for React Router
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, 'index.html')

    # Update the 404 error handler to render the index.html template
    @app.errorhandler(404)
    def not_found(e):
        return render_template('index.html')


    @app.route('/api/quest/logo/<filename>')
    def serve_quest_logo(filename):
        static_dir = os.path.join(os.path.dirname(__file__), 'static', 'quest_logos')
        return send_from_directory(static_dir, filename)

    return app

app = create_app()
if __name__ == '__main__':
    # app.run(debug=True)
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

