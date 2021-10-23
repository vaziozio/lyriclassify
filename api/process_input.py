import re
import nltk
import unicodedata
import string
import pickle

cv_file = open('classifier/count_vector.pkl','rb')
count_vector = pickle.load(cv_file)

def strip_accents(s):

    return ''.join(c for c in unicodedata.normalize('NFD', s)
                  if unicodedata.category(c) != 'Mn')


def clear_sentence(s):

    sentence = s.translate(str.maketrans('', '', string.punctuation))
    sentence = strip_accents(sentence).lower()

    return sentence


