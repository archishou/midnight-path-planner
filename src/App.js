import React from 'react';
import Field from './Components/Field/Field.js'
import fieldViewHeight from './Components/Field/Field.js'
import fieldViewWidth from './Components/Field/Field.js'
import './App.css';

const fieldViewPort = {
    width: fieldViewWidth,
    height: fieldViewHeight,
    border: '3px solid black',
    float: 'left',
    backgroundColor: 'black',
};

const consoleViewPort = {
    border: '3px solid black',
    float: 'right',
    backgroundColor: 'black',
};
function App() {

  return (
      <div>

          <div style={fieldViewPort}>
          <Field />
          </div>
      </div>


  );
}

export default App;