import { Route, Redirect } from 'react-router-dom';
import { getIsAuth } from '../redux/auth/authSelectors';

import { useSelector } from 'react-redux';

function PrivateRoute({ path, component: Component, redirectTo }) {
  const isAuth = useSelector(getIsAuth);
  console.log(isAuth + ' PrivateRoute');

  return (
    <Route path={path} exact>
      {isAuth ? <Component /> : <Redirect to={redirectTo} />}
    </Route>
  );
}

export default PrivateRoute;
