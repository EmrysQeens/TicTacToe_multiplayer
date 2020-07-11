import random

def rand_no(rooms):
    while(True):
        room = str(random.random())[2:]
        if room not in rooms:
            return room
