//Main control for game.

document.addEventListener(
  //When document loads.
    'DOMContentLoaded',()=>
    {
        //Declare a global variable to hold all components.
        const play_btn=document.querySelector('#btn');
        const name_box=document.querySelector('#name');
        const host_radio=document.querySelector('#host');
        const join_radio=document.querySelector('#join');
        const conn_id=document.querySelector('#disp_conn_id');
        const conn_id_box=document.querySelector('#conn_id');
        const play_btns=document.querySelectorAll('.btns');
        const host_score=document.querySelector('#host_score');
        const host_join=document.querySelector('#host_join');
        const load=document.querySelector('#load');
        const sub=document.querySelector('#sub');
        const main=document.querySelector('#main');
        var room=undefined;
        const hoster='X';
        const joiner='O';
        player=undefined;
        //End 6.

        //Connect to server
        //End Connect to server
        //Make a connection variable.
        const connection=new XMLHttpRequest();
        const socketio=io.connect(location.protocol+"//"+`${document.domain}:${location.port}`);

        //Event when server is connected to.
         socketio.on('connect',()=>
         {
            document.querySelector('#form').onsubmit=(form)=>
            {
                form.preventDefault();
                const name=name_box.value.charAt().toUpperCase()+name_box.value.substring(1);
                const selection=document.querySelector("input[name='host_join']:checked").value;
                //If names isn't typed and host or join not selected function returns.
                if(name.length<=0 || selection==undefined) return false;
                //If selection is host server is notified.
                if(selection=='host')
                {
                    socketio.emit('new_host',{'name':name,'host_id':conn_id.innerHTML.substring(10)});
                    room=conn_id.innerHTML.substring(10);
                    player='host';
                    loader(load);
                }
                else
                {
                const num=conn_id_box.value;
                connection.open('POST',`/exist/${num}`)
                connection.send();
                connection.onload=()=>
                {
                    response=JSON.parse(connection.responseText);
                    alert(response);
                    if(response.stat0){
                        if(!response.stat1){
                            socketio.emit('new_join',{'name':name,'join_id':num});
                            room=num;
                            player='join';
                            loader(load);
                        }
                        else
                        {
                            load.innerHTML="Can't Join please try another id.";
                            load.style.display='block';
                        }
                    }
                    else
                    {
                         load.innerHTML="Can't Join please try another id.";
                         load.style.display='block';
                    }
                }

                }

          }

          socketio.on('connected',(data)=>
          {
                sub.style.animationPlayState='running';
                main.style.animationPlayState='running';
                sub.addEventListener('animationend',()=>
                {
                    toggle(main,sub);
                    load.remove();
                 });
          });
         });
          //End Event when server is connected to.

          //Add Event to radio buttons in startup.
          multiple(document.querySelectorAll('.host_join'),input=>{
               input.onclick=function()
               {
                    if(this.value=='host')
                    {
                         response=undefined;
                         connection.open('POST' ,'/generate');
                         connection.send();
                         //Im still going to write a onprogress code
                         connection.onload=()=>{
                            stats=JSON.parse(connection.responseText);
                            response=stats.connection_id;
                            conn_id.innerHTML=`Room ID = ${response}`;
                            toggle(conn_id,conn_id_box);
                         }
                    }
                    else toggle(conn_id_box,conn_id);
               }
          });
          //Add Event to radio buttons in startup.

          //Add event to all play button on startup.
         multiple(play_btns,btn=>
         {
            btn.onclick=function(){
                if(btn.innerHTML==" ")
                    socketio.emit('play',{'button':this.dataset.no,'player':player,'room':room});
            }
        });
        //Add event to  all play button on startup.

        socketio.on('isplay',(data)=>
        {
            document.querySelectorAll('.btns')[data.btn].innerHTML=data.btn;
            console.log('Clicked');
        });

    }
    //End When document loads.
    );


