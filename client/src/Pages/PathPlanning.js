import React, { Component } from "react";
import "./Login.css";
import Field from "../Components/PathPlanningViewer/Field";
import Editor from "../Components/PathPlanningEditor/Editor";

export default class PathPlanning extends Component {

    render() {
        return (
            <div className="main-div">
                <Field/>
                <Editor/>
            </div>
        );
    }
}