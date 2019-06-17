import React from "react";
import './css/button.css';

export default function Button(props) {
  return (
    <button onClick={() => {props.value()}} className="c-button" style={{width: props.width, height: props.height}}>
      <span>{props.text}</span>
    </button>
  );
}
