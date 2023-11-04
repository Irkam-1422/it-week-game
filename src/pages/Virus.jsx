import React from "react";
import virus from "../assets/virus.png";

import "./Virus.scss";

export const Virus = () => {
  return (
    <div className="virus-cont">
      <div className="virus-inner">
        <img src={virus} className="rotating" />
        <h1>
          Система недоступна. <br /> Обнаружен вирус.
        </h1>
      </div>
    </div>
  );
};
