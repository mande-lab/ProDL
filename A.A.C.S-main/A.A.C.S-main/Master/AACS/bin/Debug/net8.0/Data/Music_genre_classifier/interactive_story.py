import nltk
from nltk.chat.util import Chat, reflections

pairs = [
    [
        r"my name is (.*)",
        ["Hello %1, how can I help you?"]
    ],
    [
        r"what is your name?",
        ["My name is StoryBot."]
    ],
    [
        r"tell me a story about (.*)",
        ["Once upon a time, in a land far away, there was a %1..."]
    ],
]

chat = Chat(pairs, reflections)
chat.converse()