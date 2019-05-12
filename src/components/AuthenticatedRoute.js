import React from "react";
import { Route, Redirect } from "react-router-dom";

//syntax explanation: https://stackoverflow.com/questions/43484302/what-does-it-mean-rest-in-react-jsx
export default ({ component: C, props: cProps, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            cProps.isAuthenticated
                ? <C {...props} {...cProps} />
                : <Redirect
                    to={`/login?redirect=${props.location.pathname}${props.location
                        .search}`}
                />}
    />;
