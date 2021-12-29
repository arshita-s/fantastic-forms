import React, { Component } from 'react';
import { render } from 'react-dom';
import Question from './Question';
import './styles.css';
let s = require('./styles.json');
let i = '1';

class App extends Component {
  constructor() {
    super();
    this.state = {
      children: [
        <Question key='0'/>
      ]
    }
  }

  UpdateSt() {
    console.log(s);
    for(let comp in s) {
        if (s[comp]['component'] === 'question' && document.querySelector("label") !== null) {
            let temp = s[comp]['styles'];
            Object.assign(document.querySelector('label').style, temp);
        }
        else if (s[comp]['component'] === 'title' && document.querySelector("span") !== null) {
          let temp = s[comp]['styles'];
          Object.assign(document.querySelector('span').style, temp);
        }
        else if (s[comp]['component'] === 'input-text' && document.querySelector("input") !== null) {
          let temp = s[comp]['styles'];
          var borderCol = temp['border-color-selected'];
          delete temp['border-color-selected'];
          
          Object.assign(document.querySelector('input').style, temp);
          
          // eslint-disable-next-line no-loop-func
          document.querySelector("input").addEventListener("focus", function () {
            this.style.borderColor = borderCol
          });
          // eslint-disable-next-line no-loop-func
          document.querySelector("input").addEventListener("focusout", function () {
            this.style.border = temp.border;
          });
        }
        
    }
}

  appendChild(){
    this.setState({
        children: [
          ...this.state.children, 
          <Question key={i}/>
        ]
    });
    
    i += 1;
}
  
  render() {
    window.addEventListener('DOMContentLoaded', (event) => {
      this.UpdateSt();
    });
    return (
      <div>   
          <div onSubmit={() => 
              document.getElementById("form").onanimationend = () =>
              {
                document.getElementById("form").parentNode.removeChild(document.getElementById("form"));
                this.appendChild();
                this.UpdateSt();
              }
          }>
              {this.state.children.map(child => child)}
          </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('root'));
