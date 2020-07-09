header="Tic-Tac-Toe";
colors=["red","orange","yellow","green","blue","indigo","violet","cyan","pink","purple","magenta","teal"];
itr=0;
var name="";

//This sets name of last player and changes text.
textcount=()=>
{
    document.getElementById("name").value=localStorage.getItem("name");
    setInterval(
      function()
      {
        document.getElementById("hd").innerHTML=header.substr(0,++itr);
        document.getElementById("hd").style.color=colors[itr];
        itr=(itr==11) ? 0 : itr;
      },1000);
}

//This loads gameplay.
on_select=(param)=>
{
  name=document.getElementById("name").value;
  if(name.length!=0)
  {
    pc=param.value;
    cc=(pc=="X") ? "O" : "X";
    localStorage.setItem("name",name);
    document.getElementById("player").innerHTML=`${name} : 0`;
    document.getElementById("selectC").style.display="none";
    document.getElementById("cont").style.display="block";
  }
  else document.getElementById("name").placeholder="Enter a valid name.."; 
}


var btn_vals=["a","b","c","d","e","f","g","h","i"];
const btn_tests=["a","b","c","d","e","f","g","h","i"];
const cases=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const twoWays=[[0,2,8],[0,4,2],[0,6,8],[0,4,6],[2,0,6],[2,4,8],[2,8,6],[6,4,8]];
pc="";
cc="";
p=0;
c=0;
noC=0; noP=0;
wait=false;

//Returns a boolean if two values are same and matches testcase "d". 
twoSame=(x,d)=>{return (x[0]==d && (x[0]==x[1] || x[0]==x[2]) && x[1]!=x[2]) ||(x[1]==d && (x[1]==x[0] || x[1]==x[2]) && x[0]!=x[2]) || (x[2]==d && (x[2]==x[1] || x[2]==x[0]) && x[1]!=x[0]) ;}

isEmpty=(test)=>
{
  num=-1;
  for(tst of test)
    if(btn_vals[tst]==btn_tests[tst]){num=tst; break;}
  return num;
}
 
val=(test)=>{return [btn_vals[test[0]],btn_vals[test[1]],btn_vals[test[2]]];}

reset=()=>
{
  btn_vals=["a","b","c","d","e","f","g","h","i"];
  noP=0; noC=0;
  for(i=0;i<9;i++)
  {
    cont=document.getElementById("cont");
    cont.getElementsByTagName("button")[i].innerHTML="";
    cont.getElementsByTagName("button")[i].style.background="#D7816A";
    cont.getElementsByTagName("button")[i].value=i;
  }
}

compute=(test)=>
{
  num=-1;
  for(tests of cases)
  {
    if(twoSame(val(tests),test))
    {
      num=isEmpty(tests);
      break;
    }
  }
  return num;
}

randNo=(limit)=>
{
  while(true)
  {
    num=Math.floor(Math.random()*limit);
    if(btn_vals[num]==btn_tests[num]) return num;
  }
}

isWin=()=>
{
  for(t of cases)
   if(btn_vals[t[0]]==btn_vals[t[1]] && btn_vals[t[0]]==btn_vals[t[2]])
    return btn_vals[t[0]];
}

won=()=>
{
 switch(isWin())
 {
  case pc:
   alert(`${name} Won`);
   document.getElementById("player").innerText=`${name} : ${++p}`;
    reset();
    break;
  case cc:
  alert(`Qeens Won`);
   document.getElementById("computer").innerText=`Qeens : ${++c}`;
   reset();
   break;
   default:;
  }
}
  
    
player=(param)=>
{
  wait=true;
  param.innerHTML=pc;
  btn_vals[param.value]=pc;
  param.style.background = "#e53935";
  ++noP;
  setTimeout(won,500);
  setTimeout(()=>{if(noP==5) reset();},750);
}

computer=()=>
{
  np=compute(pc);
  nc=compute(cc);
  comput= np==-1 && nc==-1 ? randNo(9) : nc==-1 ? np : nc;
  cont.getElementsByTagName("button")[comput].innerHTML=cc;
  cont.getElementsByTagName("button")[comput].value=cc;
  btn_vals[comput]=cc;
  ++noC;
  setTimeout(won,1500);
  setTimeout(()=>{if(noC==5) reset(); wait=false;},1250);

}

on_event=(param)=>
{
  if(param.innerHTML!="X" && param.innerHTML!="O" && wait==false)
  {
    player(param);
    setTimeout(computer,1000);
  }
}

