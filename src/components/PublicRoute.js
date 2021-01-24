import { Route, Redirect } from 'react-router-dom';
import { getIsAuth } from '../redux/auth/authSelectors';

import { useSelector } from 'react-redux';

function PublicRoute({ path, children, redirectTo, restricted }) {
  const isAuth = useSelector(getIsAuth);
  console.log(isAuth + '  isAuth  PublicRoute');
  console.log(restricted + '  restricted  PublicRoute');

  return (
    <Route path={path}>
      {!isAuth && restricted ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}

export default PublicRoute;
