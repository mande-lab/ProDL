from random import choice

def start_story():
  print("You wake up in a dark forest. You hear a rustling in the bushes.")
  choice = input("Do you investigate the rustling or keep walking? (investigate/walk) ")
  if choice.lower() == "investigate":
    investigate_bushes()
  elif choice.lower() == "walk":
    keep_walking()
  else:
    print("Invalid choice. Please try again.")
    start_story()

def investigate_bushes():
  print("You cautiously approach the bushes and see a small, furry creature.")
  choice = input("Do you pet the creature or run away? (pet/run) ")
  if choice.lower() == "pet":
    print("The creature purrs and rubs against your leg. You feel a sense of peace.")
    happy_ending()
  elif choice.lower() == "run":
    print("You turn and run, but the creature chases after you. You never see it again.")
    sad_ending()
  else:
    print("Invalid choice. Please try again.")
    investigate_bushes()

def keep_walking():
  print("You continue walking through the forest. You come across a fork in the path.")
  choice = input("Do you take the left path or the right path? (left/right) ")
  if choice.lower() == "left":
    left_path()
  elif choice.lower() == "right":
    right_path()
  else:
    print("Invalid choice. Please try again.")
    keep_walking()

def left_path():
  print("You follow the left path and come to a clearing. In the center is a beautiful waterfall.")
  choice = input("Do you swim in the waterfall or admire it from afar? (swim/admire) ")
  if choice.lower() == "swim":
    print("You take a refreshing dip in the waterfall. You feel rejuvenated.")
    happy_ending()
  elif choice.lower() == "admire":
    print("You sit by the waterfall and enjoy the peaceful scenery.")
    neutral_ending()
  else:
    print("Invalid choice. Please try again.")
    left_path()

def right_path():
  print("You follow the right path and come to a dark cave.")
  choice = input("Do you enter the cave or turn back? (enter/turn) ")
  if choice.lower() == "enter":
    print("You enter the cave and find a treasure chest filled with gold.")
    happy_ending()
  elif choice.lower() == "turn":
    print("You decide to turn back. You never find the treasure.")
    sad_ending()
  else:
    print("Invalid choice. Please try again.")
    right_path()

def happy_ending():
  print("You have a wonderful adventure and live happily ever after.")

def sad_ending():
  print("Your adventure takes a dark turn and you meet an unfortunate end.")

def neutral_ending():
  print("You return home from your adventure with a newfound appreciation for life.")

start_story()