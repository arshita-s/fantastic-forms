import React from 'react';
import Input from "./Input";
import { Form } from "@unform/web";
import "./styles.css";
let d = require('./questions.json');

export default function Question({ n, ...rest }) {
    
    let q = null;
    let t = null;
    if(d.length > 0) {
        q = d[0]['question'];
        t = d[0]['type'];
        d.shift();
    }
    
    function handleSubmit(data, { reset }) {
        console.log(data);
        transition(document.getElementById("form"));
        
    }

    function transition(obj) {
        console.log(obj);
        obj.style.animation = "slide-away 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
    }

    if(q === null) {
        return (
            <>
                <label>You're done! You may exit this window.</label>
            </>
        );
    }
    if(t === 'text') {
        return (
            <>
              <Form id="form" onSubmit={handleSubmit}>
                  <Input 
                   name={n}
                   label={q} />
                  <button type="submit">OK</button>
              </Form>
            </>
          );
    }
    
    return (
      <>
        <label>Bleh.</label>
      </>
    );
  }