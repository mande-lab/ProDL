  ingredients = input("Enter your ingredients, separated by commas: ").split(",")
  return [ingredient.strip() for ingredient in ingredients]

def get_dietary_restrictions():
  restrictions = input("Enter any dietary restrictions (e.g., vegetarian, vegan, gluten-free): ").lower()
  return restrictions

def generate_recipe():
  ingredients = get_ingredients()
  restrictions = get_dietary_restrictions()
  # Logic to generate a recipe based on ingredients and restrictions
  print("Here's a recipe suggestion:")
  print("...")
