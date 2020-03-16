import React from 'react';
import Field from '../Field/Field.js'
import './App.css';

const fieldViewPort = {
    width: '50vw',
    height: '100vh',
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