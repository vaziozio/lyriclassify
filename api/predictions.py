import pickle
from api.process_input import count_vector
import numpy as np


file = open("classifier/model_nb.pkl",'rb')
clf = pickle.load(file)

def format_response(pred, proba, classes=clf.classes_):
    
    predicted = {'predicted': pred[0]}
    probabilities = []
    n_classes = len(proba[0])

    for i in range(n_classes):
        probabilities.append({classes[i]: proba[0][i]})

    predicted['proba'] = probabilities

    return predicted

def predict_sentence(s):

    sentence_to_predict = count_vector.transform([s])
    pred = clf.predict(sentence_to_predict)
    proba = clf.predict_proba(sentence_to_predict) 

    return format_response(pred, proba)
