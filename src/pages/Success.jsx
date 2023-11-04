import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import successIcon from "../assets/success-icon.svg";
import "./Success.scss";

export const Success = ({messageContent}) => {
  const message = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    console.log(message);
    if (message.current) {
      message.current.style.display = "flex";
      message.current.style.top = "70vh";
    }
  }, [message]);

  // useEffect(() => {
  //   if (isSignedIn) {
  //     document.addEventListener('keydown', (event) => {
  //       var name = event.key;
  //       var code = event.code;

  //       if (code == 'Space') {
  //         vMsg = ''
  //       } else {
  //         addVmsg(name)
  //       }
  //     });
  //   }
  // },[isSignedIn])

  // const addVmsg = (key) => {
  //   vMsg = vMsg + key
    
  //   if (vMsg === 'virus') {
  //     console.log('should return');
  //     returnVirus()
  //   }
  // }

  const closeMessage = () => {
    if (message.current) {
      message.current.style.display = "none";
      message.current.style.top = "-50vh";
    }
  };

  return (
    <div className="success-cont">
      <h1>Добро пожаловать!</h1>
      <hr />
      <div className="btns">
        <div className="btn" onClick={() => navigate('/reset')}>Переустановить код</div>
        <a href={require('../assets/secret-info.pdf')} className="btn">Секретные данные</a>
      </div>
      <div className="message-cont" ref={message}>
        <img src={successIcon} alt="" />
        <div className="">
          {messageContent}
        </div>
        <div className="close" onClick={closeMessage}>
          <div className="">x</div>
        </div>
      </div>
      <div className="filter"></div>
    </div>
  );
};
