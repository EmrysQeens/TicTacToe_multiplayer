
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

 loader=(elem)=>
 {
    var itr=0;
    const loading=['Loading.','Loading..','Loading...'];
    start=setInterval(()=>
    {
        elem.innerHTML=loading[itr++];
        itr= itr==3 ? 0 : itr;
    },1000);
 }