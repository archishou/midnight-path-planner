import React, {Component} from "react"
import Field from "./PathPlanningViewer/Field";
import Editor from "./PathPlanningEditor/Editor";
import './FieldPage.css'

export default class FieldPage extends Component {
    render() {
        return (
            <div className={"full-field-container"}>
                <Field/>
                <Editor/>
            </div>
        );
    }
}