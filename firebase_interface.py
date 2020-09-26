import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

keypath = "./ml-job-finder-2fa3b623837c.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = keypath
url = 'https://jobs.github.com/positions.json'
project_id = 'ml-job-finder'

# Use app-default credentials
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
    'projectId':  project_id,
})

db = firestore.client()
