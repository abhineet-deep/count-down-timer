import './App.css';
import {React , useEffect, useState} from 'react';

function App() {

  const [second,setSecond] = useState(0)
  const [minute,setMinute] = useState(0)
  const [hour,setHour] = useState(0)
  const [isActive,setIsActive] = useState(false);
  const [start,setStart] = useState("Start");
  const [pause,setPause] = useState(0);


  function handleInput(e) {
    let id = e.target.id;
    console.log(e.target.value);
    if(id == "hour") setHour(e.target.value)
    if(id == "minute") setMinute(e.target.value)
    if(id == "second") setSecond(e.target.value)
  }

  function handleRun(second , minute, hour, interval) {
    if(second > 0) setSecond(second-1);
    else if(second == 0 && minute>0) {
      setMinute(minute-1);
      setSecond(59);
    }
    else if(minute == 0) {
      setHour(hour - 1);
      setMinute(59);
      setSecond(59);
    }

    if(second >= 60) {
      setMinute(minute + Math.floor(second/60));
      setSecond(second%60);
      if(minute>=60) {
        setHour(hour+ Math.floor(minute/60));
        setMinute(minute % 60);
      }
    }
      
  }

  function handleStart() {
    setStart("Stop");
    setPause(pause+1);  
    setIsActive(true);
  }

  function handleReset() {
    setSecond(0);
    setMinute(0);
    setHour(0);
    setPause(0);
    setStart("Start");
    setIsActive(false);
  }


  useEffect(() => {
    
    if(isActive) {
      if(second == 0 && hour == 0 && minute == 0) {
        alert('timer finished');
        handleReset();
        return;
      }
      if(pause%2 != 0) {
        const interval = setInterval(() => {
          handleRun(second, minute,hour,interval);
        },1000)
        
        return () => clearInterval(interval);
      }
      
    }
    if(pause> 0 && pause%2 == 0) setStart("Continue");
    
  },[second,isActive,pause]);

  

  return (



    <div>
      <h1>
        Countdown Timer
      </h1>
      <br/>
      <div>
  {!isActive ? 

    <div>
      <div>Hours : {hour}</div>
      <input type="number" id="hour" onChange={handleInput}/>
      <div>Minutes : {minute}</div>
      <input type="number" id="minute" onChange={handleInput}/>
      <div>Seconds : {second}</div>
      <input type="number" id="second" onChange={handleInput}/>
    </div>
   : 
    <div>
      {hour} : {minute} : {second}
    </div>}

</div>
      <br/>
      <button onClick={handleStart}>{start}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
