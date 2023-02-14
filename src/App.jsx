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
  const [accuracy, setAccuracy] = useState(0);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      alert(`You pressed ${totalCount} keys in 5 minutes!`);
    }, 300000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [totalCount]);
  
  useEffect(() => {
    if(target[text.length] === ' '){
      // It will show the next letter after space
  // setNextChar(target[text.length+1]);
  setNextChar('space');
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
      if(eachCount>=target.length-2){
        console.log("eachCount: "+eachCount+" target.length: "+target.length)
        setTotalCount((prevCount) => prevCount + eachCount);
        const newAccuracy = Math.round((target.length/(eachCount+1)) * 100);
        // console.log(newAccuracy+" "+target.length+" "+eachCount);
        setAccuracy(newAccuracy);
        setIsCompleted(true);
        setText("");
        setTarget(
          sentences[Math.floor(Math.random() * sentences.length)]
        );
      }
      else{
        alert("You have to type the whole sentence");
        setText("");
        setEachCount(0);
      }
    }
  };

  return ( 
    <div style={{display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
    marginLeft:"35vw"}}>
    {!isCompleted ?(<div
    style={{
      backgroundColor: 'black',
      height: '300px',
      width: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
      backgroundColor: 'burlywood',
      padding: '20px 40px',
      color: 'white',
      width:'150px',
      height: '80px',
      marginLeft: '9vw',
      display: 'inline-block',
      borderRadius: '5px',
      fontSize: '70px',
      textAlign: 'center'}}>{nextChar}
      </div>
      <div style={{
         marginLeft: '3vw',
      }}>{target}</div>
      <textarea style={{minWidth:"400px",minHeight:"53px"}} value={text} placeholder={target} onChange={handleChange} />
      <div style={{
         marginLeft: '15vw',
      }}>Time: {(time>=16760232)?0:Math.floor(time / 1000)} seconds</div>
      <div style={{
         marginLeft: '15vw',
      }}>Count :{eachCount}</div>
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
      {/* <div>Total Count of words you have used:{totalCount}</div> */}
      <div>The Accuracy you achieved is: {accuracy}%</div>
      <button onClick={()=>{setIsCompleted(false)
      setEachCount(0)}}>Next Task</button>
    </div>)}
    </div>
  );
};


export default TypingBox;
