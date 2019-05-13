import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

export default ({childProps}) =>
    <Switch>
        <Route path={"/"} exact component={Home}/>
        <Route path={"/login"} exact component={Login}/>
        <Route path={"/signup"} exact component={Signup}/>
        {/* If nothing else: */}
        <Route component={NotFound}/>
    </Switch>;