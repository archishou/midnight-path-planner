import React from 'react';
import Field from '../Field/Field.js'
import './App.css';

const fieldViewPort = {
    width: '50%',
    height: '100%',
    border: '10px solid red',
    float: 'left',
    backgroundColor: 'black',
};

function App() {

  return (
      <div style={fieldViewPort}>
          <Field />
      </div>
  );
}

export default App;