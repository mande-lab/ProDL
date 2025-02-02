    "start": {
        "text": "You wake up in a dark forest. You can hear the rustling of leaves and the distant call of an owl. To the north, you see a faint light. To the east, a narrow path leads deeper into the woods. Which way do you go?",
        "north": "northern_path",
        "east": "eastern_path"
    },
    "northern_path": {
        "text": "You follow the light and come to a small cottage. Smoke curls from the chimney. Do you knock on the door or continue walking?",
        "knock": "cottage_encounter",
        "walk": "forest_clearing"
    },
    "eastern_path": {
        "text": "The path winds through dense trees. You hear a twig snap behind you. Do you turn around or keep walking?",
        "turn": "encounter_creature",
        "walk": "lost_in_woods"
    },
    "cottage_encounter": {
        "text": "An old woman answers the door. She smiles warmly and invites you inside. You spend the night in the cottage, sharing stories with the woman. The next morning, you wake up feeling refreshed and decide to head back home.",
        "end": True
    },
    "forest_clearing": {
        "text": "You emerge into a sun-drenched clearing. A babbling brook flows through the center. You follow the brook and eventually find your way back to the edge of the forest.",
        "end": True
    },
    "encounter_creature": {
        "text": "You turn around to see a pair of glowing eyes staring at you from the shadows. The creature lunges! You barely manage to escape.",
        "end": True
    },
    "lost_in_woods": {
        "text": "You wander for hours, unable to find your way out of the woods. Night falls, and you are lost and alone.",
        "end": True
    }
}

current_node = "start"

while True:
    print(story_data[current_node]["text"])
    
    for choice in story_data[current_node]:
        if choice != "text" and choice != "end":
            print(f"- {choice}")
    
    choice = input("> ").lower()
    
    if choice in story_data[current_node]:
        if story_data[current_node][choice] == "end":
            print("The End")
            break
        else:
            current_node = story_data[current_node][choice]
    else:
        print("Invalid choice. Please try again.")
```
