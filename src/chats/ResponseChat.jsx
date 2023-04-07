import React, { useEffect, useState } from 'react'
import './ResponseChat.css'

export const ResponseChat = ({answer}) => {

  // const[ans,setAns]=useState(answer);
  // useEffect(()=>{
  //   const parser= new DOMParser();
  //   const doc= parser.parseFromString(answer,"text/html");
  //   const text=doc.body.textContent;
  //   setAns(text);
  // },[answer])
  return (
    <div dangerouslySetInnerHTML={{ __html: answer }} className="ans"></div>
  )
}
