import React from 'react';
import Field from '../Field/Field.js'
import fieldViewHeight from '../Field/Field.js'
import fieldViewWidth from '../Field/Field.js'
import './App.css';
import M from 'materialize-css';

const fieldViewPort = {
    width: fieldViewWidth,
    height: fieldViewHeight,
    border: '3px solid black',
    float: 'left',
    backgroundColor: 'black',
};

const buttonStyle = {
    background: '#4CAF50', /* Green */
    border: 'none',
    color: 'white',
    padding: '15px 32px'
};

const consoleViewPort = {
    border: '3px solid black',
    float: 'right',
    backgroundColor: 'black',
};

const divButtonStyle = {
    margin: 'auto'
};
function App() {

  return (
      <div>
          <div style={fieldViewPort}>
              <Field />
              <div style={divButtonStyle}>
                  <button style={buttonStyle}>Test</button>
              </div>

          </div>
      </div>
  );
}

export default App;