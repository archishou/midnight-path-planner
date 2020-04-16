import React from 'react';
import Field from '../Components/PathPlanningViewer/Field.js'
import './App.css';
import Editor from "../Components/PathPlanningEditor/Editor";


function App() {

  return (
      <div className={"main-div"}>
        <Field/>
        <Editor/>
      </div>
  );
}

export default App;