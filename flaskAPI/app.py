#importing the necessary libraries
from flask import Flask, request,jsonify
from flask_cors import CORS
import os 
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, JSON, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

#load environment variables from .env file
load_dotenv()

#initialize flask app 
app = Flask(__name__)

#Get client URL from env variables
CLIENT_URL = os.getenv("CLIENT_URL")

#Configure CORS tp allow cross-origin request 
CORS(
    app,
    origins="*", 
    supports_credentials=True, 
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allow_headers=["Authorization", "Content-Type"])

#Configuring a PostgresSQL Database from the .env file
DATABASE_URL = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#Configure JWT for user authentication
app.config["JWT_SECRET_KEY"] =os.getenv("JWT_SECRET_KEY", "super-secret")
jwt = JWTManager(app)

#Initialize SQLAlchemy with Declarative Base
class Base(DeclarativeBase):pass
db = SQLAlchemy(model_class=Base)
db.init_app(app)

#Defining the User model
class User(db.Model):
    __tablename__ = "users"
    username: Mapped[str] = mapped_column(String, primary_key=True)
    password: Mapped[str] = mapped_column(String, nullable=False)
    backgroundPreference: Mapped[str] = mapped_column(String, nullable=True)
    toDoList: Mapped[JSON] = mapped_column(JSON, nullable=True)
    studyTimerLength:Mapped[int] = mapped_column(Integer, nullable=True)
    breakTimerLength:Mapped[int] = mapped_column(Integer, nullable=True)

#Utility class for handling database operations
class Database:
    """ Adding a new user with hashed password to the database"""
    def createUser(self, username:str, password:str):
        hashed_password = generate_password_hash(password)
        newUser = User(username=username, password=hashed_password)
        db.session.add(newUser)
        db.session.commit() 

    """ Retrieving a user via their username"""
    def get(self, username: str):
        if username:
            return db.session.get(User, username)
    
    """ Update users background preferences"""
    def updateBackgroundPreferences(self, username: str, backgroundURL: str):
        user = self.get(username)
        if user: 
            user.backgroundPreference = backgroundURL
            db.session.commit() 

#Instantiate a database manager
db_manager = Database() 

#Create a database table if it doesn't exist
with app.app_context():
    db.create_all()

# ------- ROUTES ------ #

"""
    Log in by verifying credentials
    Returns a JWT access token on success
"""
@app.route('/login',methods=['POST'])
def login():
    username = request.json.get('username', '')
    password = request.json.get('password', '')
    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=username)
        response = jsonify(access_token=access_token)
        return response
    return jsonify({"message":"Invalid credentials"}), 401

"""
Creates a new user account but only if the username is not already taken
"""
@app.route('/createAccount', methods=['POST'])
def createAccount():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 409
    db_manager.createUser(username=username, password=password)
    return jsonify({"message": "Account created successfully"}), 201


"""
Uses two HTTP methods and varies action depending on method recieved
- GET: Return the background preference of the logged-in user
- PUT: Update the background preference of the logged-in user
"""
@app.route('/background', methods=['GET', 'PUT'])
@jwt_required()
def background_preference():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    
    if request.method == "GET":
        return jsonify({"backgroundPreference": user.backgroundPreference})

    if request.method == 'PUT':
        data = request.get_json()
        background = data.get("backgroundPreference")
        db_manager.updateBackgroundPreferences(username, background)
        return jsonify({"message": "Background updated successfully"})

# Entry point for running the app locally
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
