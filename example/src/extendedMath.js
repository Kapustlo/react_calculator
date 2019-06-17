export default {
  __proto__: Math,
  // List of all default functions
  functions: {
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    "^": "^",
    "!": "!",
    "%": "%",
    "(": "(",
    ")": ")",
  },
  factorial: function (number) {
    number = Number(number);

    if (number) {
      let prevNum = 1;
      for (let i = 1; i <= number; i++) prevNum *= i;
      return prevNum;
    }

    return 0;
  }
}
