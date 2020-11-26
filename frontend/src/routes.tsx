import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { isAuthenticated } from "./services/auth";

import SignIn from './pages/SignIn';
import UserForm from './pages/UserForm'
import ClientForm from './pages/Cliente/ClientForm'
import ReservaForm from './pages/ReservaForm';
import ClientList from './pages/Cliente/ClientList';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn: boolean;
}
const NotFound = () => <div>NotFound</div>;


function Routes() {
    const isSignedIn: boolean = isAuthenticated();

    return (
        <BrowserRouter>
            <Switch>
                    <Route exact path="/" component={SignIn} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/users/novo" component={UserForm} />
                    <PrivateRoute isSignedIn={isSignedIn} exact path="/clientes/" component={ClientList} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/clientes/novo" component={ClientForm} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/reservas/novo" component={ReservaForm} />
                    <Redirect to='/reservas' />
            </Switch>
        </BrowserRouter>
    )
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

export default Routes;