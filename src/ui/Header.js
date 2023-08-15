import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import classes from "./Header.module.css";
import { Fragment } from "react";

const Header = ({ state, logout, themeToggle, isDark }) => {
  // console.log(state.name);
  // console.log(isDark);
  // state.isAuth = true;
  const userName = !!state.name ? state.name : "username";
  const userFirstLetter = userName.match(/\b(\w)/)[0];
  let darkBlock, darkPoint, darkType;

  if (isDark) {
    darkBlock = "darkBlock";
    darkPoint = "darkPoint";
    darkType = "darkType";
  } else {
    darkBlock = "";
    darkPoint = "";
    darkType = "";
  }

  const toggle = (e) => {
    e.preventDefault();
  };

  return (
    <header className="header">
      <nav className={"navContainer"}>
        <NavLink to="/" className={"navLink iconHome"} />
        <NavLink to="/item/1" className={"navLink iconRandom"} />
        <NavLink to="/login" className={"navLink iconLogin"} />
        <NavLink to="/signup" className={"navLink iconSignup"} />
        <NavLink to="/userfeed" className={"navLinkb textLink"}>
          userFeed
        </NavLink>
        <button className="themeToggle_Container" onClick={themeToggle}>
          <div className={"themetoggle_Block " + darkBlock}>
            <div className={"themeToggle_Point " + darkPoint}>
              <div className={"themeToggle_Point_type " + darkType}></div>
            </div>
          </div>
        </button>
      </nav>
      <div className={"userContainer"}>
        <div className={"userData"}>
          <div className={"userName"}> {state.name} </div>
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
