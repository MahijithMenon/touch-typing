import React, { useState, useEffect } from "react";

const TypingBox = () => {
  const [text, setText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [eachCount, setEachCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [nextChar, setNextChar] = useState('');
  const [target, setTarget] = useState("The quick brown fox jumps over the lazy dog");
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [typed, setTyped] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (time >= 1000) {
      const newAccuracy = Math.round((typed/eachCount) * 100);
      setAccuracy(newAccuracy);
    }
  }, [time, typed]);
  
  useEffect(() => {
    if(target[text.length] === ' '){
  setNextChar(target[text.length+1]);
    }
    else{
      setNextChar(target[text.length]);
    } 
  });

  const sentences = [
    "She sells Seashells by the Seashore",
    "The rain in Spain stays mainly in the plain",
    "Curiosity killed the cat",
    "Rome wasn't built in a day",
    "An apple a day keeps the doctor away",
    "Actions speak louder than words",
    "Every cloud has a silver lining",
    "A bird in the hand is worth two in the bush",
    "The early bird catches the worm"
  ];

  const handleChange = (event) => {
    setEachCount((prevCount) => prevCount + 1);
    setText(event.target.value);
    if (startTime === 0) {
      setStartTime(Date.now());
    }
    setTime(Date.now() - startTime);
    // console.log(Date.now() - startTime);
    // console.log('startTime:' + startTime);
    // console.log('time: '+time);
    if (event.target.value === target) {
      setTotalCount((prevCount) => prevCount + eachCount+1);
      setIsCompleted(true);
      setTyped(target.length);
      setText("");
      setTarget(
        // target.slice(0, target.length - 1) +
        //   String.fromCharCode(target.charCodeAt(target.length - 1) + 1)
        sentences[Math.floor(Math.random() * sentences.length)]
      );
    }
  };

  return ( 
    <div>
    {!isCompleted ?(<div
    style={{
      backgroundColor: 'black',
      height: '300px',
      width: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
      backgroundColor: 'black',
      padding: '10px 20px',
      color: 'white',
      width:'100px',
      height: '100px',
      display: 'inline-block',
      borderRadius: '5px',
      fontSize: '20px',
      textAlign: 'center'}}>{nextChar}
      </div>
      <div>{target}</div>
      <textarea style={{minWidth:"380px",minHeight:"93px"}} value={text} placeholder={target} onChange={handleChange} />
      <div>Time: {(time>=16760232)?0:Math.floor(time / 1000)} seconds</div>
      <div>Count :{eachCount}</div>
    </div>):(<div
    style={{
      backgroundColor: 'black',
      height: '300px',
      width: '500px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* <div>Time: {Math.floor(time / 1000)} seconds</div> */}
      <div>Number of words you used in this question :{eachCount}</div>
      <div>Total Count of words you have used:{totalCount}</div>
      <div>The Accuracy you achieved is: {accuracy}%</div>
      <button onClick={()=>{setIsCompleted(false)
      setEachCount(0)}}>Next Task</button>
    </div>)}
    </div>
  );
};


export default TypingBox;
