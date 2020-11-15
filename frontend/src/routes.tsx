import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { isAuthenticated } from "./services/auth";

import SignIn from './pages/SignIn';
import UserForm from './pages/UserForm'
import ClientForm from './pages/ClientForm'
import ReservaForm from './pages/ReservaForm';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, isSignedIn, ...rest } = props;

    return (
        <Route
            {...rest}
            render={props =>
                isSignedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                        />
                    )
            }
        />
    )
};

function Routes() {
    const isSignedIn: boolean = isAuthenticated();

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" component={SignIn} />
                <PrivateRoute isSignedIn={isSignedIn} path="/user/novo" component={UserForm} />
                <PrivateRoute isSignedIn={isSignedIn} path="/cliente/novo" component={ClientForm} />
                <PrivateRoute isSignedIn={isSignedIn} path="/reserva/novo" component={ReservaForm} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;