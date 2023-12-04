import { NavLink } from "react-router-dom";
// import classes from "./Header.module.css";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { isDraft } from "@reduxjs/toolkit";

interface IProps {
  logout: () => void;
  themeToggle: (e: React.SyntheticEvent) => void;
  isDark: boolean;
}

const Header: React.FunctionComponent<IProps> = ({ logout, themeToggle, isDark }) => {
  const state = useSelector((state: RootState) => state.userState);

  const userName = !!state.name ? state.name : ("username" as string);
  // const userFirstLetter = userName.match(/\b(\w)/)[0];
  const userFirstLetter = userName.slice(0, 1);

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

  // const toggle = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  // };

  return (
    <header className="header">
      <div className="headerBlock">
        <nav className={"navContainer"}>
          {/* <NavLink to="/" className={"navLink iconHome"} />
          <NavLink to="/item/1" className={"navLink iconRandom"} />
          <NavLink to="/login" className={"navLink iconLogin"} />
          <NavLink to="/signup" className={"navLink iconSignup"} /> */}
          <button className="themeToggle_Container" onClick={themeToggle}>
            <div className={"themetoggle_Block " + darkBlock}>
              <div className={"themeToggle_Point " + darkPoint}>
                <div className={"themeToggle_Point_type " + darkType}></div>
              </div>
            </div>
          </button>
          <NavLink to="/" exact className={"navLink linkText"}>
            Домой
          </NavLink>
          {!!state.token && (
            <NavLink to="/userfeed" className={"navLink linkText"}>
              Лента
            </NavLink>
          )}
        </nav>
        <div className={"userContainer"}>
          <div className={"userData"}>
            <div className={"userName"}> {state.name} </div>
            <div className={"userLoginBlock"}>
              {!state.isAuth && (
                <Fragment>
                  <NavLink to="/signup" className={"linkText"}>
                    Регистрация
                  </NavLink>
                  <NavLink to="/login" className={"linkText"}>
                    Войти
                  </NavLink>
                </Fragment>
              )}
              {state.isAuth && (
                <Fragment>
                  {/* <NavLink to="/profile" className={"linkText"}>
                    Профиль
                  </NavLink> */}
                  <button className={"linkText"} onClick={logout}>
                    Выйти
                  </button>
                </Fragment>
              )}
            </div>
          </div>
          {!!state.name && <div className={"userImage"}>{userFirstLetter.toUpperCase()}</div>}
        </div>
      </div>
    </header>
  );
};

export default Header;
