import React from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { isAuthenticated } from "./services/auth";

import SignIn from './pages/signin';
import UserForm from './pages/user/form'
import UserList from './pages/user/list';
import ClientForm from './pages/customer/form'
import ClientList from './pages/customer/list';
import RoomForm from './pages/room/form';
import RoomList from './pages/room/list';
import ReservaForm from './pages/ReservaForm';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn: boolean;
}   

function Routes() {
    const isSignedIn: boolean = isAuthenticated()
    

    return (
            <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/home" component={SignIn} />
                    <PrivateRoute isSignedIn={isSignedIn} exact path="/users" component={UserList} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/users/new" component={UserForm} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/users/:id" component={UserForm} />
                    <PrivateRoute isSignedIn={isSignedIn} exact path="/customers" component={ClientList} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/customers/new" component={ClientForm} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/customers/:id" component={ClientForm} />
                    <PrivateRoute isSignedIn={isSignedIn} exact path="/rooms" component={RoomList} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/rooms/new" component={RoomForm} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/rooms/:numero" component={RoomForm} />
                    <PrivateRoute isSignedIn={isSignedIn} path="/reservations/new" component={ReservaForm} />
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