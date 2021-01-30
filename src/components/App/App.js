import React, { lazy, Suspense, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { Route, Switch } from 'react-router-dom';
import routers from '../../routers';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from '../../redux/auth/authOperations';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import { getIsRefreching } from '../../redux/auth/authSelectors';

const Home = lazy(() => import('../Home/Home'));
const PhoneBookView = lazy(() => import('../../Views/PhoneBookView'));
const Registration = lazy(() => import('../Registration/Registration'));
const LogIn = lazy(() => import('../LogIn/LogIn'));

export default function App() {
  const dispatch = useDispatch();
  const isRefreching = useSelector(getIsRefreching);

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);
  return (
    <>
      {!isRefreching && (
        <>
          <Navigation />
          <Suspense fallback={<p>Загружаем..</p>}>
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

              <PublicRoute
                path={routers.logIn}
                redirectTo={routers.phoneBook}
                restricted
              >
                <LogIn />
              </PublicRoute>

              {/*<PublicRoute*/}
              {/*  path={routers.registration}*/}
              {/*  component={Registration}*/}
              {/*  redirectTo={routers.phoneBook}*/}
              {/*  restricted*/}
              {/*/>*/}

              {/*<PublicRoute*/}
              {/*  path={routers.logIn}*/}
              {/*  component={LogIn}*/}
              {/*  redirectTo={routers.phoneBook}*/}
              {/*  restricted*/}
              {/*/>*/}

              {/*<Route path={routers.registration} exact>*/}
              {/*  <Registration />*/}
              {/*</Route>*/}

              {/*<Route path={routers.logIn} exact>*/}
              {/*  <LogIn />*/}
              {/*</Route>*/}
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}
