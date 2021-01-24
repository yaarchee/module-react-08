import { NavLink } from 'react-router-dom';
import routers from '../../../routers';

function AuthNav({ className, activeClassName }) {
  return (
    <>
      <NavLink
        to={routers.registration}
        className={className}
        activeClassName={activeClassName}
      >
        Зарегестрироваться
      </NavLink>
      <NavLink
        to={routers.logIn}
        className={className}
        activeClassName={activeClassName}
      >
        Войти
      </NavLink>
    </>
  );
}

export default AuthNav;
