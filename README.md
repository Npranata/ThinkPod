# ThinkPod 
## Installation  
Make sure to have these packages installed if you wish to run this repo on your device
- node.js 
- yarn 
- python 
- tailwind
  
Run these installations first
- pip install flask-cors
- pip install python-dotenv

To get npm start to activate both front and back end (with the 4 neccessary terminal command lines): 
1) Make sure that flask_cors is installed in your venv 
  … cd flaskAPI

**Mac**
  … flaskAPI % source venv/bin/activate
  (venv) … flaskAPI % pip install flask_cors
  (venv) … flaskAPI % pip install flask-cors python-dotenv

**Windows**
  … flaskAPI % <venvname>\Scripts\activate
  (<venvname>) … flaskAPI % pip install flask_cors
  (<venvname>) … flaskAPI % pip install flask-cors python-dotenv

Note: **Windows** have a security exception where it disables running scripts on the system. You will need to disable this. 

Warning: It is dangerous to do this, so it would be best to restrict running scripts once you are done.

Windows Powershell:

  … Get-ExecutionPolicy - checks if running scripts is restricted or not
  … Set-ExecutionPolicy Unrestricted - this unrestricts the system that prevents running scripts

  To reverse this: 

  … Set-ExecutionPolicy Restricted

Another thing to check is the `package.json`:
  There are different Unix-style commands for both Windows and Mac; `./` is not recognized by Windows, so you would have to do `\\`

2) make sure concurrently is installed (globally and in the front end) 
  … cd ../thinkpod
  … ThinkPod % npm install -g concurrently
  … thinkpod % npm install concurrently --save-dev

3) Run it
  … npm start

  