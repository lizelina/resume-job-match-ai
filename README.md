# OfferAgent
The OfferAgent project aims to help individuals find the most suitable jobs.
### Recorded video
Recorded video for presentation:
https://drive.google.com/file/d/1iZaPmNFUxbyNWL-JCsDHWRnNILZ4Oz00/view?usp=sharing


## Before Starting

### Database

Before running the project, set up the MongoDB database by following one of these methods:

1. Run the script using the MongoDB shell:
   ```
   mongo OfferAI scripts/init.mongo.js
   ```

2. Create the database and collections manually in your local MongoDB database:

   - Database:
     - OfferAI

   - Collections:
     - user (should insert one data entry with `mobile` and `password` specified for login, e.g., `{"mobile":"81234567", "password":"123456"}`. For the frontend part, we use the Singaporean mobile format for validation. The mobile number should start with 6, 8, or 9, and have 8 digits in total)
     - resume_pdf

### Backend

The backend of the project is developed using Python Flask. To install all the required packages, run the following command:

```
pip install pdfminer.six openai flask flask-cors numpy pymongo werkzeug bson langchain_community pandas chromadb tqdm
```

## Starting the Project

To start the project, follow these steps:

### Backend

1. Go to the backend folder:
   ```
   cd backend
   ```

2. Run the Flask server:
   ```
   python app.py
   ```

### Frontend

1. Go back to the project directory.

2. Install the frontend dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

The project should now be up and running. Access the frontend in your web browser at the specified URL (usually `http://localhost:3000`).

## Wait for around 10 seconds to see the recommended results!!!
