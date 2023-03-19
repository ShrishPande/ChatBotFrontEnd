import React, { useEffect, useState } from "react";
import "./Home.css";
import { UilMicrophone } from "@iconscout/react-unicons";
import { UilMicrophoneSlash } from "@iconscout/react-unicons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import TranscriptChats from "../../chats/TranscriptChats";
import { ResponseChat } from "../../chats/ResponseChat";
import ReactSwitch from "react-switch";
import { useSpeechSynthesis } from "react-speech-kit";
import * as API from '../../Request/Request.js'

function Home() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    console.log(false);
  }

  const [micIn, setMicIn] = useState(false);
  const [response, setResponse] = useState("");
  const [request, setRequest] = useState(transcript);

  const [value, setValue] = useState([]);

  const [submitted,setSubmitted]=useState(0);

  const { speak } = useSpeechSynthesis();
  const HandleMicrophoneInput = () => {
    setMicIn(true);
    setChecked(true);
    SpeechRecognition.startListening({ continuous: true });
    setRequest(transcript);
    setResponse("");
  };

  const handleChange = (e) => {
    setRequest(e.target.value);
    if (e.key !== 'Enter') setResponse("");
  };

  const handleStop = () =>{
    stopListening();
  }
  const stopListening = () => {
    setMicIn(false);
    SpeechRecognition.stopListening();
    setSubmitted((prev)=>prev=prev+1)
    console.log(request);
    // if (request !== "") {
    //   setValue([...value, { question: request, answer: response }]);
    // }
    if (checked) {
      speak({ text: response });
    }
  };

  useEffect(()=>{
    
    setRequest("");
  },[value]);
  useEffect(() => {
    localStorage.setItem("value", JSON.stringify(value));
  }, [value]);
  
  const generateResponse = async(request) => {
    try{
      const jsonRequest=JSON.stringify(request)
      console.log(jsonRequest)
      const res = await API.requestAnswer(jsonRequest)
      console.log(res.data.question)
      setResponse(res.data.question);
    }catch(error){
      console.error(error);
    }
    
  };
  useEffect(() => {
    generateResponse(request);
  }, [submitted]);
  
  useEffect(() => {
    setRequest(transcript);
  }, [transcript]);

  useEffect(()=>{
    if(response!=="")
      setValue([...value,{question:request,answer:response}])
  },[response])

  const [checked, setChecked] = useState(false);

  const handleChange2 = (val) => {
    setChecked(val);
  };


  return (
    <div className="home">
      <div className="title">
        Tech Elites
        <div className="voiceToggle">
          <ReactSwitch
            checked={checked}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={handleChange2}
          />
        </div>
      </div>
      <div className="content">
        <div className="chat">
          {value.map((value) => (
            <div>
              <TranscriptChats question={value.question} />
              <ResponseChat answer={value.answer} />
            </div>
          ))}
        </div>
      </div>

      <div className="inputArea">
        <div className="text">
          <input
            type="text"
            id="input"
            value={request}
            placeHolder="Enter Your question"
            onChange={handleChange}
            onKeyUp={(e) => (e.key === "Enter" ? stopListening() : "")}
          />
        </div>
        <div className="voiceInput">
          {micIn ? (
            <UilMicrophone
              style={{ color: "#0D2646", background: "#FECBCE" }}
              className="speaking"
              onClick={handleStop}
            />
          ) : (
            <UilMicrophoneSlash onClick={HandleMicrophoneInput} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
