import React from "react";
import "./loader.css";

export default function Loader({ msg }) {
  return (
    <div className="loading">
      <div className="loadingio-spinner-eclipse-tl18qrapo1f">
        <div className="ldio-u6wmgzlxuh9">
          <div></div>
        </div>
      </div>
      {msg && <h1>{msg}</h1>}
    </div>
  );
}
