from flask import Flask, request, render_template, jsonify
from flask_socketio import join_room,leave_room,send,SocketIO,rooms
from init import Player

game=Flask(__name__)
game.config['SECRET_KEY'] = '234567834L'
socketio=SocketIO(game)

# This keeps track of list o rooms.
rooms=[]
rooms_id=[]

#This is the homepage of the game.
@game.route('/')
def home():
    return render_template("game.html")


@game.route('/no/<int:num>', methods=['POST'])
def exist(num):
    if num in rooms_id: return jsonify({'status:True'})
    else: return jsonify({'status':False})


# New game hosting.p,,,
@socketio.on('new_host')
def host(data):
    name=data['name']
    host_id=data['host_id']
    rooms_id.extend(data['host_id'])
    rooms.extend(host_id)


@socketio.on('new_join')
def join(data):
    print(data['name'])
    print(data['join_id'])