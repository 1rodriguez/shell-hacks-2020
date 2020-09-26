from job import Job
import requests

url = 'https://jobs.github.com/positions.json'

stream = requests.get(url)
data = stream.json()

for entry in data:
    current_job = Job(entry['id'], entry['type'], entry['company'],
                      entry['location'], entry['title'], entry['description'])
    current_job.write_to_firestore()
