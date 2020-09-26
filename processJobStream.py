import firebase_interface
import re


class Job:

    def __init__(self, gh_id, job_type, company, location, title, description):
        self.id_code = gh_id
        self.job_type = job_type
        self.company = company
        self.location = location
        self.title = title
        self.description = description

        desc_removed_tags = re.sub("\<\/?[a-z]*\>", "", self.description)
        self.sanitized_description = re.sub("\<([a-z*])\s([a-z*]*=.*?)", "",
                                            desc_removed_tags)

    def write_to_firestore(self):
        doc_ref = firebase_interface.db.collection(u'postings') \
                                        .document(self.gh_id)

        doc_ref.set({
            u'type': self.job_type,
            u'company': self.company,
            u'location': self.location,
            u'position': self.title,
            u'plain_description': self.sanitized_description,
        })
