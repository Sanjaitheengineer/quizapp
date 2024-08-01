import React, { useRef, useState } from "react";
import './quiz.css';
import { data } from "./data";
export default function Quiz()
{
    let[index,setindex]=useState(0);
    let[question,setQuestion]=useState(data[index]);
    let[lock,setlock]=useState(false);
    let[result,setresult]=useState(false);
    let[score,setscore]=useState(0);
    let[message,setmessage]=useState(false);
    let Option1=useRef(null);
    let Option2=useRef(null);
    let Option3=useRef(null);
    let Option4=useRef(null);
    const optionarr=[Option1,Option2,Option3,Option4];
    const checkanswer =(e,ans1) =>
    {
        if(lock===false)
        {
          if(question.ans===ans1)
          {
            e.target.classList.add("correct");
            setlock(true);
            setscore((prev)=>prev+1);
          }
          else  
          {
            e.target.classList.add("wrong");
            setlock(true);
            optionarr[question.ans-1].current.classList.add("correct");
          }
    }
}
       const next1=()=>
       {
        if(index===data.length-1)
        {
            setresult(true)
            return ;
        }
        if(lock===true)
        {
          setmessage(false);
          setindex(++index);
          setQuestion(data[index]);
          setlock(false);
          optionarr.map((option) =>{
            option.current.classList.remove("correct");
            option.current.classList.remove("wrong");
            return null;
          })
        }
          if(lock===false)
          {
           setmessage(true);
          }
       }
       const restart=()=>
       {
        setindex(0);
        setQuestion(data[0]);
        setlock(false);
        setresult(false);
       }
       const messanger=()=>
       {
       
       }
    return(
        <div className="container">
            <h1>Quiz App</h1> 
            <hr/>
            {result? <> </>:<>
            <h2>{index+1}.{question.question}</h2>
            <ul>
                <li  ref={Option1} onClick={(e)=>checkanswer(e,1)}>{question.option1} </li>
                <li ref={Option2} onClick={(e)=>checkanswer(e,2)}>{question.option2}</li>
                <li ref={Option3} onClick={(e)=>checkanswer(e,3)}>{question.option3} </li>
                <li ref={Option4} onClick={(e)=>checkanswer(e,4)}>{question.option4} </li>
            </ul>
            {message?
            <p className="messanger">*click any option to go next</p> 
            :<p className="hider">Welcome from React</p>
            } 
            <span className="lower">
            <button onClick = {next1}>Next</button>
            <div className="slider">( {index+1} of {data.length} )
            </div>
            </span>
            </>}
            {result?<>
            <h2>Your scored {score} out of {data.length}</h2>
            <button onClick={restart}>Restart</button>
            </>:<></>}
        </div>
    
    )
}