import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')
from sklearn.naive_bayes import MultinomialNB
from sklearn.multiclass import OneVsRestClassifier
from sklearn import metrics
from sklearn.metrics import accuracy_score
from pandas.plotting import scatter_matrix
from sklearn.neighbors import KNeighborsClassifier
from sklearn import metrics
from sklearn.preprocessing import LabelEncoder
import seaborn as sns
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack
from pyresparser import ResumeParser

def GenerateCategory(resume_input):
    data = ResumeParser('Resume Screening/'+resume_input).get_extracted_data()

    current_resume_skills = data["skills"]
    current_resume_experience = data["experience"]
    current_skills_string = ''

    for word in current_resume_skills:
        current_skills_string += word + ' '
    for word in current_resume_experience:
        current_skills_string += word + ' '

    current_skills_string = [current_skills_string]

    resumeDataSet = pd.read_csv('Resume Screening/resume_dataset.csv' ,encoding='utf-8')
    resumeDataSet['cleaned_resume'] = ''
    resumeDataSet.head()


    def cleanResume(resumeText):
        resumeText = re.sub('http\S+\s*', ' ', resumeText)  # remove URLs
        resumeText = re.sub('RT|cc', ' ', resumeText)  # remove RT and cc
        resumeText = re.sub('#\S+', '', resumeText)  # remove hashtags
        resumeText = re.sub('@\S+', '  ', resumeText)  # remove mentions
        resumeText = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', resumeText)  # remove punctuations
        resumeText = re.sub(r'[^\x00-\x7f]',r' ', resumeText) 
        resumeText = re.sub('\s+', ' ', resumeText)  # remove extra whitespace
        return resumeText
    resumeDataSet['cleaned_resume'] = resumeDataSet.Resume.apply(lambda x: cleanResume(x))

    var_mod = ['Category']

    le = LabelEncoder()
    values = resumeDataSet['Category'].unique()

    for i in var_mod:        
        resumeDataSet[i] = le.fit_transform(resumeDataSet[i])
       
    #Getting the x and y text values in addition to the
    requiredText = resumeDataSet['cleaned_resume'].values
    requiredTarget = resumeDataSet['Category'].values

    #Generating the numbers of the different categories
    keys = resumeDataSet['Category'].unique()

    #Declaring the vectorizer
    word_vectorizer = TfidfVectorizer(
        sublinear_tf=True,
        stop_words='english',
        max_features=1500)

    #Generating the vector
    word_vectorizer.fit(requiredText)
    WordFeatures = word_vectorizer.transform(requiredText)

    #Generating the inputted resume vector
    resume_vectorizer = TfidfVectorizer(
        sublinear_tf=True,
        stop_words='english',
        max_features=1500)

    #Generating the data set    
    resume_vectorizer.fit(current_skills_string)
    ResumeWordFeatures = word_vectorizer.transform(current_skills_string)

    #Training the model
    X_train,X_test,y_train,y_test = train_test_split(WordFeatures,requiredTarget,random_state=0, test_size=0.2)


    #Generating the clf
    clf = OneVsRestClassifier(KNeighborsClassifier())
    clf.fit(X_train, y_train)   
    
    #Getting the prediction given the resume and 
    prediction = clf.predict(ResumeWordFeatures)
    prediction_probability = clf.predict_proba(ResumeWordFeatures)

    print("This is the prediction", prediction)

    category_dictionary={}

    #Generating the categories
    for key,value in zip(keys, values):
        category_dictionary[key] = value

    print(category_dictionary)

if __name__ == "__main__":
    GenerateCategory("Resume - Eric Kogut.pdf")