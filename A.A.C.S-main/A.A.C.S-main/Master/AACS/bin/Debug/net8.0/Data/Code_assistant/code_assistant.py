from transformers import AutoModelForCodeCompletion, AutoTokenizer

model_name = "facebook/bart-large-cnn"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCodeCompletion.from_pretrained(model_name)

def generate_code_snippet(prompt):
  inputs = tokenizer(prompt, return_tensors="pt")
  outputs = model.generate(**inputs)
  generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
  return generated_text