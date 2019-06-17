import React from 'react';
import Parser from './Parser.js';

export default class Handler extends React.Component {
  state = {
    functions: {}, // All passed functions
    constants: {}, // Non-number constants
    num: 0, // Current number
    value: "0" // The actual text you see on the screen
  }

  add = number => {
    let value = String(number);
    if (this.state.value[0] !== "0" || this.state.value.length > 1) value = this.state.value + value;

    number = String(number);
    if (this.state.num) number = String(this.state.num) + number;

    this.setState({
      value: value,
      num: number
    });
  }

  handleChange = event => {
    if (event.nativeEvent.inputType === "insertLineBreak") {
      this.handleAction("=","=");
    } else {
      const value = event.currentTarget.value;
      let num = "";
      for (let i = value.length - 1; i >= 0; i--) {
        const char = value[i];
        if (isNaN(Number(char))) break;
        num = char + num;
      }
      this.setState({value: value, num: Number(num)})
    }
  }

  handleAction = (action, text) => {
    const functions = this.state.functions || {},
          constants = this.state.constants || {};

    const parser = Parser(functions, constants);
    if (action === "=") {
      let value = "";
      try {
        value = parser.parse(this.state.value);
      } catch (e) {
        value = "Error"
      } finally {
        this.setState({
          value: String(value),
          num: Number(value)
        });
      }
    } else if (action === "c") {
      this.setState({
        value: "0",
        num: 0
      });
    } else if(action === "←") {
      let value = this.state.value.substring(0, this.state.value.length - 1);
      if (value === "") value = "0";
      this.setState({
        value: value
      });
    } else {
      const valueLength = this.state.value.length;
      const lastChar = this.state.value[valueLength - 1];
      // Yeah, maybe I'll add comments here later...
      if (!isNaN(Number(lastChar)) || action === "(" || action === ")" || lastChar === "(" || lastChar === ")" || lastChar in this.state.constants) {

        const curNum = this.state.num;

        let curVal = this.state.value;

        if (typeof action === "string") {
          curVal === "0" && (action === "-" || action === "(") ? curVal = action : curVal += action;
        } else {
          if (lastChar !== ")") {
            curVal = "";
            if (lastChar in this.state.constants) {
              for (let i = 0; i < valueLength - 1; i++) curVal += this.state.value[i];
              curVal += `${text}(${lastChar})`;
            } else {
              const curNumLength = String(curNum).length;
              for (let i = 0; i < valueLength - curNumLength; i++) curVal += this.state.value[i];
              curVal += `${text}(${curNum})`;
            }
          } else {
            let charsToParse = [];

            for (let k = valueLength - 1; k >= 0; k--) {
              const curChar = this.state.value[k];
              charsToParse.push(curChar);
              if (curChar === "(") {
                curVal = this.state.value.substring(0, k);
                break;
              }
            }

            charsToParse = charsToParse.reverse();

            let strToParse = "";
            for (const parseChar of charsToParse) strToParse += parseChar;

            const parsedStr = Number(parser.parseBrackets(strToParse));

            curVal += `${text}(${parsedStr})`;

          }
        }

        if (curVal === "") curVal = "0";

        this.setState({
          num: 0,
          value: curVal
        });

      }

    }

  }

}
