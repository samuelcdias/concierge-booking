import React from  'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import SignIn from './pages/SignIn';
import UserForm from './pages/CreateUser'
import ClientForm from './pages/CreateUser'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" component={SignIn} />
                <Route path="/user/new" component={UserForm} />
                <Route path="/client/new" component={ClientForm} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;