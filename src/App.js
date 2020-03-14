import React from 'react';
import Field from './Components/Field/Field.js'
import './App.css';
const fieldViewPort = {
    width: '100vh',
    height: '100vh',
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