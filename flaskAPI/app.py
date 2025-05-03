from flask import Flask, request,jsonify
from flask_cors import CORS
import os 
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, JSON, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity

#needed to make sure that the environment variables like CLIENT_URL load
load_dotenv()

app = Flask(__name__)

#for deployment the URL needs to be set to the actual domain name!!
CLIENT_URL = os.getenv("CLIENT_URL")

#setting up CORS
CORS(app, origins="*", supports_credentials=True, methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"], allow_headers=["Authorization", "Content-Type"])

#Configuring a PostgresSQL Database from the .env file
DATABASE_URL = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#Initializing JWT
app.config["JWT_SECRET_KEY"] =os.getenv("JWT_SECRET_KEY", "super-secret")
jwt = JWTManager(app)


#Initialize SQLAlchemy with Declarative Base
class Base(DeclarativeBase):pass
db = SQLAlchemy(model_class=Base)
db.init_app(app)

#Defining the User model using 'Mapped" and "mapped_column"
class User(db.Model):
    __tablename__ = "users"
    username: Mapped[str] = mapped_column(String, primary_key=True)
    password: Mapped[str] = mapped_column(String, nullable=False)
    backgroundPreference: Mapped[str] = mapped_column(String, nullable=True)
    toDoList: Mapped[JSON] = mapped_column(JSON, nullable=True)
    studyTimerLength:Mapped[int] = mapped_column(Integer, nullable=True)
    breakTimerLength:Mapped[int] = mapped_column(Integer, nullable=True)

#DATABASE UTLILTIY CLASS 
class Database:
    """ Adding a new user to the database"""
    def createUser(self, username:str, password:str):
        newUser = User(username=username, password=password)
        db.session.add(newUser)
        db.session.commit() 

    """ Retrieving all the informations of a user via their username"""
    def get(self, username: str):
        if username:
            return db.session.get(User, username)
      
    def updateBackgroundPreferences(self, username: str, backgroundURL: str):
        user = self.get(username)
        if user: 
            user.backgroundPreference = backgroundURL
            db.session.commit() 

    def updateToDoList(self, username:str, toDoList:JSON):
        user = self.get(username)
        if user:
            user.toDoList = toDoList
            db.session.commit()

    def updateTimer(self, username:str, studyTimer:int,  breakTimer: int):
        user = self.get(username)
        if user:
            user.studyTimerLength = studyTimer
            user.breakTimerLength = breakTimer
            db.session.commit()


#Creating a database manager
db_manager = Database() 

#creates database table if it doesn't exist
with app.app_context():
    db.create_all()

#ROUTES
@app.route('/login',methods=['POST'])
def login():
    username = request.json.get('username', '')
    password = request.json.get('password', '')
    user = User.query.filter_by(username=username).first()

    if user and user.password == password:
        access_token = create_access_token(identity=username)
        response = jsonify(access_token=access_token)
        return response
    return jsonify({"message":"Invalid credentials"}), 401

@app.route('/createAccount', methods=['POST'])
def createAccount():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 409
    db_manager.createUser(username=username, password=password)
    return jsonify({"message": "Account created successfully"}), 201

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
    

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
