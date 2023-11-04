import React, { useRef, useState } from "react";
import errorIcon from "../assets/error-icon.svg"
import "./Home.scss";

const array = [1, 2, 3, 4, 5, 6];

export const Home = ({returnSuccess, info}) => {
  const message = useRef(null);
  const [code, setCode] = useState([]);
  const [checking, setChecking] = useState(false);

  const testJump = (x, i) => {
    const temp = code;
    temp[i] = x.value;
    setCode(temp);

    var ml = ~~x.getAttribute("maxlength");
    if (ml && x.value.length >= ml) {
      do {
        x = x.nextSibling;
      } while (x && !/text/.test(x.type));
      if (x && /text/.test(x.type)) {
        x.focus();
      }
    }
  };

  const checkCode = (x, i) => {
    const temp = code;
    temp[i] = x.value;
    setCode(temp);

    if (info) {
      setChecking(true);
      setTimeout(() => {
        if (temp.join("") === info.code) {
          returnSuccess()
        } else {
          if (message.current) {
              message.current.style.display = 'flex'
              message.current.style.top = '70vh'
              setChecking(false)
              Array.from(document.getElementsByTagName('input')).forEach(element => {
                  element.value = ''
              });
          }
        }
      }, 5000);
    }
  };

  const closeMessage = () => {
    if (message.current) {
        message.current.style.display = 'none'
        message.current.style.top = '-50vh'
    }
  }

  return (
    <div className="home-cont">
      <h1>Введите код:</h1>
      <div className="inputs-cont">
        {array.map((a, i) => (
          <input
            type="text"
            className={checking ? "checking" : ""}
            maxLength={1}
            onInput={
              a !== array.length
                ? (e) => testJump(e.target, i)
                : (e) => checkCode(e.target, i)
            }
          />
        ))}
      </div>
      <div className="load-cont">
        <div className="bar" style={checking ? { maxWidth: "100%" } : {}}></div>
      </div>
      <div className="message-cont" ref={message}>
        <img src={errorIcon} alt="" />
        <div className="">Неверный код. <br className="d-block d-md-none"/> В доступе отказано.</div>
        <div className="close" onClick={closeMessage}>
            <div className="">x</div>
        </div>
      </div>
    </div>
  );
};
