import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./Header.module.css";
import { Fragment } from "react";

const Header = ({ state, logout, theme }) => {
  // console.log(state);
  // state.isAuth = true;
  const userName = !!state.name ? state.name : "asername";
  const userFirstLetter = userName.match(/\b(\w)/)[0];

  return (
    <header className={classes.header + ' ' + theme.class}>
      <nav className={classes.navContainer}>
        <NavLink to="/" className={classes.navLink + " " + classes.iconHome + " "} />
        <NavLink to="/item/1" className={classes.navLink + " " + classes.iconRandom} />
        <NavLink to="/login" className={classes.navLink + " " + classes.iconLogin} />
        <NavLink to="/signup" className={classes.navLink + " " + classes.iconSignup} />
        <NavLink to="/userfeed" className={classes.navLink + " " + classes.textLink}> userFeed </NavLink>
        <button className={classes.linkText} onClick={theme.toggle}>
                  theme
                </button>
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
          {userFirstLetter.toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;
