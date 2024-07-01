# from flask import Flask, request, jsonify
# from gensim.models.doc2vec import Doc2Vec
# import pandas as pd
# import nltk
# import re
# from nltk.tokenize import word_tokenize
# from nltk.corpus import stopwords
# from nltk.stem.wordnet import WordNetLemmatizer
  

# app = Flask(__name__)

# # Path to the saved model
# model_path = "model/article_recommendation_model.d2v"

# # Load the saved model
# model = Doc2Vec.load(model_path)

# # NLTK setup
# lemma = WordNetLemmatizer()
# nltk.download('stopwords')
# stopword_list = stopwords.words('english')
# nltk.download('punkt')
# nltk.download('wordnet')

# def clean(text):
#     text = re.sub("[^A-Za-z0-9 ]", " ", text)
#     text = text.lower()
#     tokens = nltk.word_tokenize(text)
#     text_list = [lemma.lemmatize(token) for token in tokens if token not in stopword_list]
#     return ' '.join(text_list)

# # Load your articles dataset
# df = pd.read_csv('model/articles.csv')
# df['content'] = df['title'] + ' ' + df['author'] + ' ' + df['text']
# df['content'] = df['content'].apply(clean)

# @app.route('/recommend', methods=['POST'])
# def recommend():
#     data = request.json
#     user_interest = data.get("interest")
    
#     recommended_blogs = recommend_articles(user_interest)
    
#     return recommended_blogs.to_json(orient="records")

# def recommend_articles(input_text, topn=10):
#     input_clean = clean(input_text)
#     input_vectorized = model.infer_vector(input_clean.split(' '))
#     similar_articles = model.dv.most_similar(positive=[input_vectorized], topn=topn)
    
#     sim_list = []  
#     for ind, value in enumerate(similar_articles):
#         index = value[0]
#         sim_list.append([ind + 1, index, df['title'][index]])
#     return pd.DataFrame(sim_list, columns=["rank", "original_index", "title"])

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
from gensim.models.doc2vec import Doc2Vec
import pandas as pd
import nltk
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer

app = Flask(__name__)

# Path to the saved model
model_path = "model/article_recommendation_model.d2v"

# Load the saved model
model = Doc2Vec.load(model_path)

# NLTK setup
lemma = WordNetLemmatizer()
nltk.download('stopwords')
stopword_list = stopwords.words('english')
nltk.download('punkt')
nltk.download('wordnet')

def clean(text):
    text = re.sub("[^A-Za-z0-9 ]", " ", text)
    text = text.lower()
    tokens = word_tokenize(text)
    text_list = [lemma.lemmatize(token) for token in tokens if token not in stopword_list]
    return ' '.join(text_list)

# Load your articles dataset
df = pd.read_csv('model/articles.csv')
df['content'] = df['title'] + ' ' + df['author'] + ' ' + df['text']
df['content'] = df['content'].apply(clean)

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()
        user_interest = data.get("interest")
        
        if not user_interest:
            return jsonify({'error': 'No interest provided'}), 400
        
        recommended_blogs = recommend_articles(user_interest)
        return recommended_blogs.to_json(orient="records")
    except Exception as e:
        print('Error in Flask API:', str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

def recommend_articles(input_text, topn=10):
    input_clean = clean(input_text)
    input_vectorized = model.infer_vector(input_clean.split(' '))
    similar_articles = model.dv.most_similar(positive=[input_vectorized], topn=topn)
    
    sim_list = []  
    for ind, value in enumerate(similar_articles):
        index = value[0]
        sim_list.append([ind + 1, index, df['title'][index]])
    return pd.DataFrame(sim_list, columns=["rank", "original_index", "title"])

if __name__ == '__main__':
    app.run(debug=True)
