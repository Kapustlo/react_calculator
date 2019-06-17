import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button.js';
import ExtendedMath from './extendedMath';
import Handler from './Handler';
import './css/calculator.css';

export default class Calculator extends Handler {

  componentDidMount() {
    const top = this.refs.top;
    const topHeight = this.refs.top.offsetHeight;

    const calculator = this.refs.calculator;

    const width = calculator.offsetWidth,
          height = calculator.offsetHeight - topHeight; // The height of the div where buttons are located

    const container = this.refs.buttons_hull; // The div where buttons are located
    const rows = [];

    let counter = 0;

    let totalHeight = 0,
        totalWidth = 0,
        totalBtns = 0;

    if (this.props.rows) {
      const totalRows = Object.keys(this.props.rows).length;
      const btnHeight = height / (totalRows + 1);
      totalHeight += btnHeight;

      let functions = {}, // All passed functions
          constants = {}; // All non-number constants

      for (const row of this.props.rows) {
        const buttons = []; // React button objects
        const btnsInRow = Object.keys(row).length;
        totalBtns += btnsInRow;
        const btnWidth = width / (btnsInRow * 2);
        totalWidth += btnWidth;
        for (const button of row) {
          const { type, text, value } = button;
          let btn;

          if (type === "function") {
            btn = <Button key={"btn_"+counter} text={text} value={() => this.handleAction(value, text)} height={btnHeight} width={btnWidth}/>
            functions[text] = value;
          } else {
            btn = <Button key={"btn_"+counter} text={text} value={() => this.add(text)} height={btnHeight} width={btnWidth} />
            if (isNaN(Number(text))) constants[text] = value;
          }

          buttons.push(<div className={"btn_wrapper_" + counter / 2} key={"wrapper_"+counter} style={{padding: ".5rem", width: btnWidth, height: btnHeight}}>{btn}</div>);
          counter++;
        }
        rows.push(<div className="number-row" key={"row_"+counter}>{buttons}</div>);
      }

      this.setState({
        functions: functions,
        constants: constants
      });

    }

    let fontSize;

    try {
      fontSize = (2 * (totalHeight + totalWidth)) / totalBtns;
    } catch (e) {
      fontSize = 16;
    } finally {
      this.refs.text_area.style.fontSize = fontSize + "px";
      ReactDOM.render(rows, container);
    }

  }

  render() {

    let width = "auto",
        height = "auto";

    if (!isNaN(Number(this.props.width))) width = this.props.width + "px";
    if (!isNaN(Number(this.props.height))) height = this.props.height + "px";

    return (
      <div className="calculator" ref="calculator" style={{width: width, height: height}}>

        <div className="top" ref="top">
          <textarea className="screen" ref="text_area" onChange={this.handleChange} value={this.state.value}></textarea>
        </div>

        <div className="bottom">
          <div className="hull">
            <div className="buttons">
              <div ref="buttons_hull"></div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
