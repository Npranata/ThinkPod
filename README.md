
## Installation
Make sure to have these packages installed if you wish to run this repo on your device:

- Node.js  
- Yarn  
- Python  
- Tailwind CSS  

---

## Running the App (Front + Backend)

### 1. Backend Setup (Flask API)

Navigate to the Flask backend directory:
```bash 
cd flaskAPI 
``` 
**Mac**
```bash 
  source venv/bin/activate
  pip install flask_cors
  pip install flask-cors python-dotenv
  pip install Flask flask-jwt-extended
  pip install flask flask-sqlalchemy
```

**Windows**
```bash 
  <venvname>\Scripts\activate
  pip install flask_cors
  pip install flask-cors python-dotenv
```

Note: **Windows** have a security exception where it disables running scripts on the system. You will need to disable this. 

Warning: It is dangerous to do this, so it would be best to restrict running scripts once you are done.

In Windows Powershell:
 
  ``` bash
  … Get-ExecutionPolicy  #checks if running scripts is restricted or not
  … Set-ExecutionPolicy Unrestricted  #this unrestricts the system that prevents running scripts
  ```

  To re-enable the restriction:

``` bash
  … Set-ExecutionPolicy Restricted
  ```
Another thing to check is the `package.json`:
  There are different Unix-style commands for both Windows and Mac; `./` is not recognized by Windows, so you would have to do `\\`

### 2. Frontend Setup (React)
Navigate to the React frontend directory:

```bash 
cd ../thinkpod
```

Install the required packages 
```bash 
  npm install -g concurrently
  npm install concurrently --save-dev
  npm install react-icons
  npm install axios@0.24.0  
``` 

### Run the App 
While still in /thinkpod  
```bash 
  npm start
``` 


