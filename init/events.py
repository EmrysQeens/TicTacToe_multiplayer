import random

def rand_no(rooms):
    is_rand=True
    while(is_rand):
        room=random.randrange(5)
        if room not in rooms:
            is_rand=False
        else: rand_no(rooms)
    return room



print(rand_no([0,2,3]))