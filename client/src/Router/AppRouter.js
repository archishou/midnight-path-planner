import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom"
import Login from "../Components/Login/Login";
import Field from "../Components/PathPlanningViewer/Field";
import Main from "../Pages/MainPage/Main";

export const LOGIN_ROUTE = "/login";
export const MAIN_ROUTE = "/main";
export const FIELD_ROUTE = MAIN_ROUTE + "/field";
export default class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path={LOGIN_ROUTE} component={Login} />
                <Route path={MAIN_ROUTE} component={Main}>
                    <Route path={FIELD_ROUTE} component={Field}/>
                </Route>
            </BrowserRouter>
        );
    }
}

