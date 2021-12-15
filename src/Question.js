import React from 'react';
import Input from "./Input";
import { Form } from "@unform/web";
import "./styles.css";
let d = require('./questions.json');
let results = []

export default function Question(...rest) {
    let q = null;
    let t = null;
    let n = null;
    if(d.length > 0) {
        q = d[0]['question'];
        t = d[0]['type'];
        n = d[0]['name'];
        d = d.slice(1);
    }
    
    function handleSubmit(data, { reset }) {
        results.push(data);
        transition(document.getElementById("form"));
        
    }

    function transition(obj) {
        obj.style.animation = "slide-away 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
    }

    if(q === null) {
        console.log(results);
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