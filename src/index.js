import React, { Component } from 'react';
import { render } from 'react-dom';
import Question from './Question';
import './styles.css';
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
    return (
      <div>   
          <div onSubmit={() => 
              document.getElementById("form").onanimationend = () =>
              {
                document.getElementById("form").parentNode.removeChild(document.getElementById("form"));
                this.appendChild();
              }
          } className="box-container">
              {this.state.children.map(child => child)}
          </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
