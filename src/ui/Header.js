import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./Header.module.css";
import { Fragment } from "react";

const Header = ({ state, logout }) => {
  console.log(state);

  const userName = !!state.name ? state.name : "username";

  return (
    <header className={classes.header}>
      <nav className={classes.navContainer}>
        <NavLink to="/" className={classes.navLink + " " + classes.iconHome + " "} />
        <NavLink to="/item/1" className={classes.navLink + " " + classes.iconRandom} />
        <NavLink to="/login" className={classes.navLink + " " + classes.iconLogin} />
        <NavLink to="/signup" className={classes.navLink + " " + classes.iconSignup} />
      </nav>
      <div className={classes.userContainer}>
        <div className={classes.userData}>
          <div className={classes.userName}> {userName} </div>
          <div className={classes.userLoginBlock}>
            {!state.isAuth && (
              <Fragment>
                <NavLink to="/signup" className={classes.linkText}>
                  Sign up
                </NavLink>
                <NavLink to="/login" className={classes.linkText}>
                  Login
                </NavLink>
              </Fragment>
            )}
            {state.isAuth && (
              <Fragment>
                <NavLink to="/profile" className={classes.linkText}>
                  Profile
                </NavLink>
                <button className={classes.linkText} onClick={logout}>
                  Log out
                </button>
              </Fragment>
            )}
          </div>
        </div>
        <div className={classes.userImage} alt="profile pic">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
