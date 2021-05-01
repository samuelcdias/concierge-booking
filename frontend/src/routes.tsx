import { useContext } from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'

import SignIn from './pages/SignIn'
import Home from './pages/Home'

import CustomerForm from './pages/CustomerFormBuilder'
import CustomerList from './pages/CustomerListBuilder'
import ReservationForm from './pages/ReservationFormBuilder'
import ReservationList from './pages/ReservationListBuilder'
import RoomForm from './pages/RoomFormBuilder'
import RoomList from './pages/RoomListBuilder'
import UserForm from './pages/UserFormBuilder'
import UserList from './pages/UserListBuilder'

import { RoutesProvider } from './context/RoutesContext'
import { UserContext } from './context/UserContext'

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn: any;
}

function Routes() {
    const { auth } = useContext(UserContext)


    return (
        <RoutesProvider>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/home" component={Home} />
                <PrivateRoute isSignedIn={auth} exact path="/users" component={UserList} />
                <PrivateRoute isSignedIn={auth} path="/users/new" component={UserForm} />
                <PrivateRoute isSignedIn={auth} path="/users/:id" component={UserForm} />
                <PrivateRoute isSignedIn={auth} exact path="/customers/" component={CustomerList} />
                <PrivateRoute isSignedIn={auth} path="/customers/new" component={CustomerForm} />
                <PrivateRoute isSignedIn={auth} path="/customers/:id" component={CustomerForm} />
                <PrivateRoute isSignedIn={auth} exact path="/rooms" component={RoomList} />
                <PrivateRoute isSignedIn={auth} path="/rooms/new" component={RoomForm} />
                <PrivateRoute isSignedIn={auth} path="/rooms/:numero" component={RoomForm} />
                <PrivateRoute isSignedIn={auth} exact path="/reservations/" component={ReservationList} />
                <PrivateRoute isSignedIn={auth} path="/reservations/new" component={ReservationForm} />
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