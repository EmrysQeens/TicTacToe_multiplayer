from flask import Flask, request, render_template, jsonify
from flask_socketio import join_room,leave_room,send,SocketIO,rooms,emit
from init import events, player

game=Flask(__name__)
game.config['SECRET_KEY'] = '234567834L'
socketio=SocketIO(game)

# This keeps track of list o rooms.
rooms=[]
rooms_id=[]
players=[]

#This is the homepage of the game.
@game.route('/')
def home():
    return render_template("game.html")


@game.route('/generate', methods=['POST'])
def generate():
    return jsonify({'connection_id':events.rand_no(rooms_id)})


# New game hosting.p,,,
@socketio.on('new_host')
def host(data):
    name=data['name']
    host_id=data['host_id']
    rooms_id.extend(data['host_id'])
    player(name,host_id)
    join_room(host_id)


@socketio.on('new_join')
def join(data):
    name=data['name']
    join_id=data['join_id']
    join_room(join_id)
    data="Emrys"
    emit('connected',{'data':data},room=join_id)