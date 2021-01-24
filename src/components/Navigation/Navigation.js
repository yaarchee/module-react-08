import { NavLink } from 'react-router-dom';
import routers from '../../routers';
import AuthNav from './AuthNav/AuthNav';
import UserMenu from './UserMenu/UserMenu';

import styles from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../redux/auth/authSelectors';

function Navigation() {
  const isAuth = useSelector(getIsAuth);
  console.log(isAuth);
  return (
    <nav className={styles.navMain}>
      <div className={styles.globalNav}>
        <NavLink
          to={'/'}
          exact
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
        >
          Главная
        </NavLink>

        {isAuth && (
          <NavLink
            to={routers.phoneBook}
            className={styles.navLink}
            activeClassName={styles.navLinkActive}
          >
            Телефонная книга
          </NavLink>
        )}
      </div>
      <div className={styles.userNav}>
        {isAuth ? (
          <UserMenu />
        ) : (
          <AuthNav
            className={styles.navLink}
            activeClassName={styles.navLinkActive}
          />
        )}
      </div>
    </nav>
  );
}

export default Navigation;
