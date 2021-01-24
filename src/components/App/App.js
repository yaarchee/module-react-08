import React, { Component, useEffect } from 'react';

import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import { Route, Switch } from 'react-router-dom';
import routers from '../../routers';
import PhoneBookView from '../../Views/PhoneBookView';
import Registration from '../Registration/Registration';
import LogIn from '../LogIn/LogIn';
import { useDispatch } from 'react-redux';
import authOperations from '../../redux/auth/authOperations';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Navigation />

      <Switch>
        <Route path={'/'} exact>
          <Home />
        </Route>

        <PrivateRoute
          path={routers.phoneBook}
          component={PhoneBookView}
          redirectTo={routers.logIn}
        />

        <PublicRoute
          path={routers.registration}
          redirectTo={routers.phoneBook}
          restricted
        >
          <Registration />
        </PublicRoute>

        {/*<PublicRoute*/}
        {/*  path={routers.registration}*/}
        {/*  component={Registration}*/}
        {/*  redirectTo={routers.phoneBook}*/}
        {/*  restricted*/}
        {/*/>*/}

        <PublicRoute
          path={routers.logIn}
          component={LogIn}
          redirectTo={routers.phoneBook}
          restricted
        />

        {/*<Route path={routers.registration} exact>*/}
        {/*  <Registration />*/}
        {/*</Route>*/}

        {/*<PublicRoute path={routers.logIn} redirectTo={routers.phoneBook}>*/}
        {/*  <LogIn />*/}
        {/*</PublicRoute>*/}

        {/*<Route path={routers.logIn} exact>*/}
        {/*  <LogIn />*/}
        {/*</Route>*/}
      </Switch>
    </>
  );
}
