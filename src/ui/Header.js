import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import classes from "./Header.module.css";
import { Fragment } from "react";

const Header = ({ state, logout, theme }) => {
  // console.log(state);
  // state.isAuth = true;
  const userName = !!state.name ? state.name : "asername";
  const userFirstLetter = userName.match(/\b(\w)/)[0];

  return (
    <header className="header">
      <nav className={"navContainer"}>
        <NavLink to="/" className={"navLink iconHome"} />
        <NavLink to="/item/1" className={"navLink iconRandom"} />
        <NavLink to="/login" className={"navLink iconLogin"} />
        <NavLink to="/signup" className={"navLink iconSignup"} />
        <NavLink to="/userfeed" className={"navLinkb textLink"}>
          {" "}
          userFeed{" "}
        </NavLink>
        <button className={"linkText"} onClick={theme.toggle}>
          theme
        </button>
      </nav>
      <div className={"userContainer"}>
        <div className={"userData"}>
          <div className={"userName"}> {userName} </div>
          <div className={"userLoginBlock"}>
            {!state.isAuth && (
              <Fragment>
                <NavLink to="/signup" className={"linkText"}>
                  Sign up
                </NavLink>
                <NavLink to="/login" className={"linkText"}>
                  Login
                </NavLink>
              </Fragment>
            )}
            {state.isAuth && (
              <Fragment>
                <NavLink to="/profile" className={"linkText"}>
                  Profile
                </NavLink>
                <button className={"linkText"} onClick={logout}>
                  Log out
                </button>
              </Fragment>
            )}
          </div>
        </div>
        <div className={"userImage"} alt="profile pic">
          {userFirstLetter.toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;
