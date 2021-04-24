import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { isAuthenticated } from "./services/auth"

import SignIn from './pages/SignIn'
import ReservaForm from './pages/ReservaForm'

import CustomerForm from './pages/CustomerFormBuilder'
import CustomerList from './pages/CustomerListBuilder'
import RoomForm from './pages/RoomFormBuilder'
import RoomList from './pages/RoomListBuilder'
import UserForm from './pages/UserFormBuilder'
import UserList from './pages/UserListBuilder'

import Home from './pages/Home'
import { RoutesProvider } from './context/RoutesContext'

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn: boolean;
}

function Routes() {
    const isSignedIn: boolean = isAuthenticated()


    return (
        <RoutesProvider>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/home" component={Home} />
                <PrivateRoute isSignedIn={isSignedIn} exact path="/users" component={UserList} />
                <PrivateRoute isSignedIn={isSignedIn} path="/users/new" component={UserForm} />
                <PrivateRoute isSignedIn={isSignedIn} path="/users/:id" component={UserForm} />
                <PrivateRoute isSignedIn={isSignedIn} exact path="/customers/" component={CustomerList} />
                <PrivateRoute isSignedIn={isSignedIn} path="/customers/new" component={CustomerForm} />
                <PrivateRoute isSignedIn={isSignedIn} path="/customers/:id" component={CustomerForm} />
                <PrivateRoute isSignedIn={isSignedIn} exact path="/rooms" component={RoomList} />
                <PrivateRoute isSignedIn={isSignedIn} path="/rooms/new" component={RoomForm} />
                <PrivateRoute isSignedIn={isSignedIn} path="/rooms/:numero" component={RoomForm} />
                <PrivateRoute isSignedIn={isSignedIn} path="/reservations/new" component={ReservaForm} />
                <Redirect to='/home' />
            </Switch>
        </RoutesProvider>
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