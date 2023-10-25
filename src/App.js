import React, { Fragment, useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, signup, init } from "./store/login-actions";
import { setError } from './store/error-actions';

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

const newHistory = createBrowserHistory();

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const errorState = useSelector(state => state.errorState);
  const noticeState = useSelector(state => state.noticeState);

  // console.log(noticeState);

  const token = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expiryDate");
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");

  const theme = localStorage.getItem("theme");

  const [isDark, setIsDark] = useState(null);

  const themeToggle = (e) => {
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
      localStorage.setItem("theme", 'true');
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

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(init({
      isAuth: true, token: token, userId: userId, name: name
    }))
    setAutoLogout(remainingMilliseconds);
  };

  useEffect(() => {
    mounted();
    getTheme();
  }, []);

  const logoutHandler = () => {
    dispatch(logout);
  };

  function setAutoLogout(millisseconds) {
    setTimeout(() => {
      dispatch(logout);
    }, millisseconds);
  }

  const loginHandler = (authData) => {
    dispatch(login(authData, newHistory))
  };

  const signupHandler = (authData) => {
    dispatch(signup(authData, newHistory))
  };

  const showError = (errorString) => {
    dispatch(setError(errorString));
  }


  const clearStatus = () => {
    dispatch(setError({ status: null }))
  }

  return (
    <Fragment>
      <Router history={newHistory}>
        <Header
          logout={logoutHandler}
          themeToggle={themeToggle}
          isDark={isDark}
        />
        <Switch>
          <Route path="/" exact>
            <section className="mainSection">
              <HomePage showError={showError} />
            </section>
            <Footer />
          </Route>
          <Route path="/item/:itemId" exact>
            <section className="mainSection">
              <ItemPage history={newHistory} />
            </section>
            <Footer />
          </Route>
          <Route path="/login" exact>
            <LoginPage onLogin={loginHandler} history={newHistory} />
          </Route>
          <Route path="/signup" exact>
            <SignupPage onSignup={signupHandler} />
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
          <Route path='/about' exact>
            <AboutPage />
            <Footer />
          </Route>
          <Route path='*' >
            <NotFound history={newHistory} />
          </Route>
          <Route path='/notfound' >
            <NotFound history={newHistory} />
          </Route>
        </Switch>
        {noticeState.isShown && <Notificator />}
        {errorState.errorShown && <ErrorPopup />}
      </Router>
    </Fragment>
  );
};


export default App;
