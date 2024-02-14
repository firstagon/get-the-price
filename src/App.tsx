import React, { Fragment, useState, useEffect } from "react";
// @ts-ignore
import { createBrowserHistory, History } from "history";
import { Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, init } from "./store/login-actions";
// import { setError } from "./store/error-actions";
import { RootState, AppDispatch } from "./store/store";

import "./App.scss";
import Header from "./ui/Header";

import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import Footer from "./ui/footer/Footer";
import ErrorPopup from "./ui/error/ErrorPopup";
import ProfilePage from "./pages/Profile/ProfilePage";
import UsersFeed from "./pages/UsersFeed/UsersFeed";
import AboutPage from "./pages/About/AboutPage";
import Notificator from "./ui/notifications/Notificator";
import NotFound from "./pages/NotFound";
import BackLight from "./ui/three-fiber/main-screen/backLight";

const newHistory: History = createBrowserHistory();

function App() {
  const dispatch: AppDispatch = useDispatch();
  // const userState = useSelector((state: RootState) => state.userState);
  const errorState = useSelector((state: RootState) => state.errorState);
  const noticeState = useSelector((state: RootState) => state.noticeState);

  const token = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expiryDate");
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");

  const theme = localStorage.getItem("theme");

  const [isDark, setIsDark] = useState(true);

  const themeToggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsDark((prevState) => !prevState);
    localStorage.setItem("theme", `${!isDark}`);
  };

  const getTheme = () => {
    if (theme === "false") {
      setIsDark(false);
    } else if (theme === "true") {
      setIsDark(true);
    } else {
      setIsDark(true);
      localStorage.setItem("theme", "true");
    }
  };

  if (!isDark) {
    document.documentElement.style.setProperty("--base-color", "#fff");
    document.documentElement.style.setProperty("--base-bg", "#f9f9f9");
    document.documentElement.style.setProperty("--base-font-color", "#000");
    document.documentElement.style.setProperty("--base-font-vsColor", "#fff");
  } else {
    document.documentElement.style.setProperty("--base-color", "black");
    document.documentElement.style.setProperty("--base-bg", "#1e1e1e");
    document.documentElement.style.setProperty("--base-font-color", "#fff");
    document.documentElement.style.setProperty("--base-font-vsColor", "#000");
  }

  const mounted = () => {
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      dispatch(logout);
      return;
    }

    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(
      init({
        isAuth: true,
        token: token,
        userId: userId,
        name: name,
      })
    );
    setAutoLogout(remainingMilliseconds);
  };

  useEffect(() => {
    mounted();
    getTheme();
  }, []);

  const logoutHandler = () => {
    dispatch(logout);
  };

  function setAutoLogout(millisseconds: number) {
    setTimeout(() => {
      dispatch(logout);
    }, millisseconds);
  }

  // const showError = (errorString) => {
  //   dispatch(setError(errorString));
  // }

  return (
    <Fragment>
      <Router history={newHistory}>
        <Header logout={logoutHandler} themeToggle={themeToggle} isDark={isDark} />
        <Switch>
          <Route path="/" exact>
            <section className="mainSection">
              <HomePage />
            </section>
            <Footer />
          </Route>
          <Route path="/item/:itemId" exact>
            <section className="mainSection">
              <ItemPage />
            </section>
            <Footer />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/signup" exact>
            <SignupPage history={newHistory} />
          </Route>
          <Route path="/profile" exact>
            <section className="mainSection">
              <ProfilePage />
            </section>
          </Route>
          <Route path="/userfeed" exact>
            <UsersFeed />
            <Footer />
          </Route>
          <Route path="/about" exact>
            <AboutPage />
            <Footer />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
          <Route path="/notfound">
            <NotFound />
          </Route>
        </Switch>
        {noticeState.isShown && <Notificator />}
        {errorState.errorShown && <ErrorPopup />}
        <BackLight />
      </Router>
    </Fragment>
  );
}

export default App;
