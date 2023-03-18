import React, { useEffect, useState } from "react";
import "./Home.css";
import { UilMicrophone } from "@iconscout/react-unicons";
import { UilMicrophoneSlash } from "@iconscout/react-unicons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Home() {
  const [micIn, setMicIn] = useState(false);
  const {
    transcript,
    listening,
    resetTransscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    console.log(false);
  }
  const HandleMicrophoneInput = () => {
    setMicIn(true);
    SpeechRecognition.startListening({ continuous: true });
    let ln = 0;
    
    // while (true ) {
    //   // console.log(transcript.length)
    //   ln = transcript.length;
    //   setTimeout(() => {
    //   }, 2000);
    //   let length = transcript.length;
    //   if (ln === length && ln!=0) {
    //     console.log("stop");
    //     break;
    //   }
    // }
  };

  const stopListening = () => {
    setMicIn(false);
    SpeechRecognition.stopListening();
  };
  return (
    <div className="home">
      <div className="title">Tech Elites</div>
      <div className="voiceToggle"></div>
      <div className="content">
        <div className="chat">{transcript}</div>
        <div className="inputArea">
          <div className="text">
            <input type="text" id="input" />
          </div>
          <div className="voiceInput">
            {micIn ? (
              <UilMicrophone onClick={stopListening} />
            ) : (
              <UilMicrophoneSlash onClick={HandleMicrophoneInput} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
