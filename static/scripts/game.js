//Main control for game.

document.addEventListener(
  //When document loads.
    'DOMContentLoaded',()=>
    {
        //Declare a global variable to hold all components.
        var play_btn=document.querySelector('#btn');
        var name_box=document.querySelector('#name');
        var host_radio=document.querySelector('#host');
        var join_radio=document.querySelector('#join');
        var conn_id=document.querySelector('#disp_conn_id');
        var conn_id_box=document.querySelector('#conn_id');
        var play_btns=document.querySelectorAll('.btns');
        var host_score=document.querySelector('#host_score');
        var host_join=document.querySelector('#host_join');
        var load=document.querySelector('#load');
        //End 6.

        //Connect to server
        var socketio=io.connect(location.protocol+"//"+`${document.domain}:${location.port}`);
        //End Connect to server
        //Make a request variable.
        const request=new XMLHttpRequest();

        //Event when server is connected to.
         socketio.on('connect',()=>
         {
            document.querySelector('#form').onsubmit=(form)=>
            {
                form.preventDefault();
                name=name_box.value.charAt().toUpperCase()+name_box.value.substring(1);
                selection=document.querySelector("input[name='host_join']:checked").value;
                //If names isn't typed and host or join not selected function returns.
                if(name.length<=0 || selection==undefined) return;
                //If selection is host server is notified.
                if(selection=='host') socketio.emit('new_host',{'name':name,'host_id':conn_id.innerHTML.substring(10)});
                else socketio.emit('new_join',{'name':name,'join_id':conn_id_box.value});
            }
          });
          //End Event when server is connected to.

          //Add Event to radio buttons in startup.
          multiple(document.querySelectorAll('.host_join'),input=>{
               input.onclick=function()
               {
                    if(this.value=='host')
                    {
                         connection_id=Math.random().toString().substring(2);
                         response=undefined;
                         request.open('POST' ,`/no/${connection_id}`);
                         request.send();
                         //Im still going to write a onprogress code
                         request.onload=()=>{
                            stat=JSON.parse(request.responseText);
                            response=stat.status;
                         alert(response);
                         conn_id.innerHTML=`Room ID = ${connection_id}`;
                         toggle(conn_id,conn_id_box);
                         }
                    }
                    else toggle(conn_id_box,conn_id);
               }
          });
          //Add Event to radio buttons in startup.

          //Add event to all play button on startup.
         multiple(play_btns,btn=>{

        });
        //Add event to  all play button on startup.


    }
    //End When document loads.
    );



 //Add event listener to all Play Buttons
 multiple=(vals,func)=>
    {
     vals.forEach(
            val=>
            {
                    func(val);
            });
    }
  //End Add event listener to all Play Buttons

 //Toggle function to hide/display components.
 toggle=(elem_a,elem_b)=>
 {
     elem_a.style.display='block';
     elem_b.style.display='none';
 }