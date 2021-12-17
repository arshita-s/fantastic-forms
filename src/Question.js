import React from 'react';
import Input from "./Input";
import Select from './Select';
import { Form } from "@unform/web";
import "./styles.css";
let d = require('./questions.json');
let results = []

export default function Question(...rest) {
    
    let question_str = null;
    let q_type = null;
    let q_name = null;
    let options = null;
    let buttonmsg = null;
    let isMulti = null;
    
    if(d.length > 0) {
        question_str = d[0]['question'];
        q_type = d[0]['type'];
        q_name = d[0]['name'];
        
        if(q_type === 'select') {
            options = d[0]['children'];
            isMulti = d[0]['isMulti'];
            console.log(isMulti)
        }

        if(q_type === 'title') {
            buttonmsg = d[0]['buttonmsg'];
        }
        
        d = d.slice(1);
    }
    
    function handleSubmit(data, { reset }) {
        const f = document.getElementById("form");
        if(f.checkValidity()) {
            results.push(data);
            transition(f);
        }
    }

    function transition(obj) {
        obj.style.animation = "slide-away 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
    }

    if(question_str === null) {
        console.log(results);
        return (
            <>
                <label>You're done! You may exit this window.</label>
            </>
        );
    }
    if(q_type === 'title') {
        return (
            <>
                <Form id="form" onSubmit={handleSubmit}>
                    <label style={{"fontSize": "100px", "marginBottom": "50px"}}>{question_str}</label>
                    <button className="material-bubble" type="submit">{buttonmsg}</button>
                </Form>
            </>
        );
    }
    if(q_type === 'text') {
        return (
            <>
              <Form id="form" onSubmit={handleSubmit}>
                  <Input 
                   name={q_name}
                   label={question_str} 
                   type='text'/>
                  <button className="material-bubble" type="submit">OK</button>
              </Form>
            </>
          );
    }
    if(q_type === 'email') {
        return (
            <>
              <Form id="form" onSubmit={handleSubmit}>
                  <Input 
                   name={q_name}
                   label={question_str} 
                   type='email'/>
                  <button className="material-bubble" type="submit">OK</button>
              </Form>
            </>
          );
    }
    if(q_type === 'select') {
        return (
            <>
              <Form id="form" onSubmit={handleSubmit}>
                  <label>{question_str}</label>
                    <Select 
                    name={q_name}
                    options={options}
                    isMulti={isMulti}/>
                  <button className="material-bubble" type="submit">OK</button>
              </Form>
            </>
        );
    }
    
    return (
      <>
        <label>Oops! An error occured.<br></br>Please refresh and try again.</label>
      </>
    );
  }