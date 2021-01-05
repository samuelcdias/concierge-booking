import React from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { isAuthenticated } from "./services/auth";

import SignIn from './pages/SignIn';
import UserForm from './pages/User/UserForm'
import UserList from './pages/User/UserList';
import ClientForm from './pages/Cliente/ClientForm'
import ClientList from './pages/Cliente/ClientList';
import RoomForm from './pages/Quarto/RoomForm';
import RoomList from './pages/Quarto/RoomList';
import ReservaForm from './pages/ReservaForm';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn: boolean;
}   

function Routes() {
    const isSignedIn: boolean = isAuthenticated();

    return (
            <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/home" component={RoomList} />
                    <PrivateRoute isSignedIn={isSignedIn} exact path="/users" component={UserList} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/users/novo" component={UserForm} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/users/:id" component={UserForm} />
                    <PrivateRoute isSignedIn={isSignedIn} exact path="/clientes" component={ClientList} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/clientes/novo" component={ClientForm} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/clientes/:id" component={ClientForm} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/reservas/novo" component={ReservaForm} />
                    <PrivateRoute isSignedIn={isSignedIn} exact path="/quartos" component={RoomList} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/quartos/novo" component={RoomForm} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/quartos/:numero" component={RoomForm} />
                    <Redirect to='/home' />
            </Switch>
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