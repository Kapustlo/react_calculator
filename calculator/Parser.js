import ExtendedMath from "./extendedMath.js";

export default function Parser(functions, constants) {
  return {
    __proto__: ExtendedMath,
    parseFunctions: function (string) {
      let newValue = ""; // The value we're going to return
      for (let i = 0; i < string.length; i++) {
        const char = string[i];
        // Here we determine whether the characher is a default function or not
        if (isNaN(Number(char)) && char in this.functions === false && char !== ".") {
          let fnName = ""; // This name will be used to get the actual function
          let fnValue = ""; // Value we're going to pass into the function
          for (let k = i; k < string.length; k++) {
            const curChar = string[k];
            if (curChar !== "(") {
              if (isNaN(Number(curChar)) && curChar === ")") {
                i = k;
                break;
              } else if (isNaN(Number(curChar)) && curChar !== ".") {
                fnName += curChar;
              } else {
                fnValue += curChar;
              }
            }
          }
          newValue += functions[fnName](fnValue); // Value returned by the function
        } else {
          // If it's not a custom function, do nothing but add the character for further parsing
          newValue += char;
        }
      }
      return newValue;
    },
    parseBrackets: function (string) {
      // If the string has brackets, parse it, else return it
      if (string.match(/\(/g)) {

        let parsedStr = "",
            curBracketValue = ""; // We will use this in order to get the actual value from a string

        let closed = true, // Current state
            opened = 0; // How times brackets were open

        let start = 0; // Where the last bracket opened

        for (let i = 0; i < string.length; i++) {
          const char = string[i];
          if (char === "(") {
            start = i;
            opened++;
            closed = false
            curBracketValue = "";
          } else if(char === ")") {
            const firstChar = string[0];
            let from;
            let v = String(this.parseString(curBracketValue)) + string.substring(i + 1, string.length);
            if (firstChar === "(" && opened === 1) {
              from =  1
            } else {
              from = 0;
              v = string.substring(from, start) + v;
            }
            return this.parseBrackets(v);
          } else {
            curBracketValue += char;
          }
        }
      } else {
        return string;
      }

    },
    parseString: function(string) {
      let newStr = "";
      for (let i = 0; i < string.length; i++) {
        const char = string[i];
        if (i + 1 === string.length && isNaN(Number(char)) && char !== ")" && char !== "!" && char !== ".") {
          string = string.substring(0, string.length - 1);
        } else if (char === "!") {
          let factValue = "";

          for (let k = i - 1; k >= 0; k--) {
            const curChar = string[k];
            if (isNaN(Number(curChar)) && char in this.functions) {
              i = k + factValue.length;
              break;
            }
            factValue = curChar + factValue;
          }

          if (factValue.length === newStr.length) newStr = "";

          newStr += this.factorial(factValue);
        } else {
          newStr += char;
        }
      }
      return eval(newStr);
    },
    parseConstants: function(string) {
      // Here we just basically go through all the passed constants and replace the text with their actual values
      for (const constant in constants) string = string.replace(new RegExp(constant), constants[constant]);
      return string;
    },
    parse: function (string) {
      if (string === "") {
        return "0";
      } else {
        string = string.replace(/\s/g,"");
        string = this.parseConstants(string);
        string = this.parseFunctions(string);
        string = string.replace(/\^/,"**");
        string = this.parseBrackets(string);
        return String(this.parseString(string));
      }
    }

  }
}
