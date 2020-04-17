import React from 'react';
import Field from '../Components/PathPlanningViewer/Field.js'
import './App.css';
import Editor from "../Components/PathPlanningEditor/Editor";
import Login from "../Components/Login/Login";
/*<Field/>
        <Editor/>*/
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
      <Login />
  );
}

export default App;