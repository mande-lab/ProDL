from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

recipes_df = pd.read_csv("recipes.csv")
ingredients = recipes_df["ingredients"].values
descriptions = recipes_df["description"].values

vectorizer = TfidfVectorizer()
ingredient_vectors = vectorizer.fit_transform(ingredients)
description_vectors = vectorizer.transform(descriptions)

def get_recipe_recommendations(user_ingredients, user_description):
  user_ingredient_vector = vectorizer.transform([user_ingredients])
  user_description_vector = vectorizer.transform([user_description])
  
  similarity_scores_ingredients = cosine_similarity(user_ingredient_vector, ingredient_vectors)
  similarity_scores_description = cosine_similarity(user_description_vector, description_vectors)

  combined_scores = (similarity_scores_ingredients + similarity_scores_description) / 2
  recommended_recipe_indices = combined_scores.argsort()[0][::-1]

  return recommended_recipe_indices