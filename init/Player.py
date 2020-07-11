class Player:
    _opponent=''
    def __init__(self,name,room):
        self.name=name
        self.room=room

    def opponent(self,opponent):
        self._opponent=opponent


