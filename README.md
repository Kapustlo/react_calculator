# Button

## Example

``` javascript
  <Button text="cos" value={() => alert("This button is meant for cos")} height={16} width={16} />
```

This component may be used separately from the Calculator component however when used in the Calculator component, it is created internally.

# Calculator

## Example

```javascript
  <Calculator rows={rows} height="600" width="400"/>
```

The variable **"rows"** is an array that contains other arrays that contain objects with following properties:

``` javascript
  const rows = [
    [
      {
        type: "function", 
        text: "ctg", 
        value: value => Math.cos(value) / Math.sin(value)
      },
      {
        type: "constant", 
        text: "pi", 
        value: Math.PI
      },
    ]
  ]
```

**Notice that type "function" is used for math operators as well**

### List of all default functions and operators

"+"

"."

"-"

"*"

"/"

"^"

"!"

"%"

"("

")"

### Some additional operators

"c" // Clear screen

"←" // Remove one character

# The rows used in the example

``` javascript

const rows = [
  [
    {
      "type": "function",
      "text": "sqr",
      "value": value => value ** 2
    },
    {
      "type": "function",
      "text": "^",
      "value": "**"
    },
    {
      "type": "function",
      "text": "sin",
      "value": value => Math.sin(value)
    },
    {
      "type": "function",
      "text": "cos",
      "value": value => Math.cos(value)
    },
    {
      "type": "function",
      "text": "tan",
      "value": Math.tan
    },
  ],
  [
    {
      "type": "function",
      "text": "sqrt",
      "value": value => value ** .5
    },
    {
      "type": "function",
      "text": "10^",
      "value": value => 10 ** value
    },
    {
      "type": "function",
      "text": "log",
      "value": Math.log
    },
    {
      "type": "function",
      "text": "%",
      "value": "%"
    },
    {
      "type": "function",
      "text": "ctg",
      "value": value => Math.cos(value) / Math.sin(value)
    },
  ],
  [
    {
      "type": "constant",
      "text": "π",
      "value": Math.PI
    },
    {
      "type": "constant",
      "text": "7",
      "value": "7"
    },
    {
      "type": "constant",
      "text": "8",
      "value": "8"
    },
    {
      "type": "constant",
      "text": "9",
      "value": "9"
    },
    {
      "type": "function",
      "text": "*",
      "value": "*"
    },
  ],
  [
    {
      "type": "function",
      "text": "!",
      "value": "!"
    },
    {
      "type": "constant",
      "text": "4",
      "value": "4"
    },
    {
      "type": "constant",
      "text": "5",
      "value": "5"
    },
    {
      "type": "constant",
      "text": "6",
      "value": "6"
    },
    {
      "type": "function",
      "text": "-",
      "value": "-"
    },
  ],
  [
    {
      "type": "function",
      "text": "/",
      "value": "/"
    },
    {
      "type": "constant",
      "text": "1",
      "value": "1"
    },
    {
      "type": "constant",
      "text": "2",
      "value": "2"
    },
    {
      "type": "constant",
      "text": "3",
      "value": "3"
    },
    {
      "type": "function",
      "text": "+",
      "value": "+"
    },
  ],
  [
    {
      "type": "function",
      "text": "(",
      "value": "("
    },
    {
      "type": "function",
      "text": ")",
      "value": ")"
    },
    {
      "type": "constant",
      "text": "0",
      "value": "0"
    },
    {
      "type": "function",
      "text": ".",
      "value": "."
    },
    {
      "type": "function",
      "text": "=",
      "value": "="
    },
  ],
  [
    {
      "type": "function",
      "text": "←",
      "value": "←"
    },
    {
      "type": "constant",
      "text": "00",
      "Value": "00"
    },
    {
      "type": "constant",
      "text": "e",
      "Value": Math.E
    },
    {
      "type": "function",
      "text": "C",
      "value": "c"
    },
  ],
];

```
