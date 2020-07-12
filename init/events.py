import random
from init import player

cases=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
template = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

def rand_no(rooms):
    while(True):
        room = str(random.random())[2:]
        if room not in rooms:
            return room


class played:

    def __init__(self,host,join):
        self.host=host
        self.join=join


