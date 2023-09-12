import React, { Fragment, useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";

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

import {LOGIN_URL, SIGNUP_URL} from './links';

const newHistory = createBrowserHistory();

const token = localStorage.getItem("token");
const expiryDate = localStorage.getItem("expiryDate");
const userId = localStorage.getItem("userId");
const name = localStorage.getItem("name");

function App() {
  const [state, setState] = useState({
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
    errorShown: false,
    name: null,
  });

  const userState = { token: state.token, userId: state.userId, name: state.name };

  const theme = localStorage.getItem("theme");

  const [isDark, setIsDark] = useState(null);

  const themeToggle = (e) => {
    e.preventDefault();
    setIsDark((prevState) => !prevState);
    // themechanger(isDark);
    localStorage.setItem("theme", `${!isDark}`);
  };

  const getTheme = () => {
    if (theme === "false") {
      setIsDark(false);
    } else if (theme === "true") {
      // console.log('its true')
      setIsDark(true);
      // console.log(isDark);
    } else {
      setIsDark(false);
      localStorage.setItem("theme", 'false');
    }

  };

  if (!isDark) {
    document.documentElement.style.setProperty("--base-color", "#fff");
    document.documentElement.style.setProperty("--base-bg", "#f9f9f9");
    document.documentElement.style.setProperty("--base-font-color", "#000");
    document.documentElement.style.setProperty("--base-font-vsColor", "#fff");
    // document.documentElement.style.setProperty("--base-border", "#aaa");
  } else {
    document.documentElement.style.setProperty("--base-color", "black");
    document.documentElement.style.setProperty("--base-bg", "#1e1e1e");
    document.documentElement.style.setProperty("--base-font-color", "#fff");
    document.documentElement.style.setProperty("--base-font-vsColor", "#000");
    // document.documentElement.style.setProperty("--base-border", "#aaa");
  }


  // isDark ? themechanger(true) : themechanger(false);

  const mounted = () => {
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    // console.log('token!')

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setState((prevState) => {
      return { ...prevState, isAuth: true, token: token, userId: userId, name: name };
    });
    setAutoLogout(remainingMilliseconds);
  };

  useEffect(() => {
    mounted();
    getTheme();
  }, []);

  const logoutHandler = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isAuth: false,
        token: null,
        name: null,
        userId: null,
      };
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
  };

  function setAutoLogout(millisseconds) {
    setTimeout(() => {
      logoutHandler();
    }, millisseconds);
  }

  const loginHandler = (authData) => {
    setState((prevState) => {
      return { ...prevState, authLoading: true };
    });
    fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(authData),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          if (res.status === 401) {
            throw new Error("User not exist or incorrect password.");
          }
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then((resData) => {
        // console.log(resData);
        newHistory.replace("/");
        setState((prevState) => {
          return {
            ...prevState,
            isAuth: true,
            token: resData.token,
            authLoading: false,
            userId: resData.userId,
            name: resData.name,
          };
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("name", resData.name);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        newHistory.replace("/");
      })
      .catch((err) => {
        console.log(err);
        const newErr = {
          name: 'Ошибка подключения',
          message: 'Проблемы с подключением к серверу.'
        }
        const error = err.message == 'Failed to fetch' ? newErr : err;

        setState((prevState) => {
          return {
            ...prevState,
            isAuth: false,
            authLoading: false,
            error: error,
            errorShown: true,
          };
        });
      });
  };

  const signupHandler = (authData) => {
    console.log(authData);
    setState((prevState) => {
      return { ...prevState, authLoading: true };
    });
    fetch(SIGNUP_URL, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(authData),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make shure the email adress isn't used yet"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed");
        }
        return res.json();
      })
      .then((resData) => {
        // console.log(resData);
        setState((prevState) => {
          return { ...prevState, isAuth: false, authLoading: false };
        });
        loginHandler(authData);
        newHistory.replace("/");
      })
      .catch((err) => {
        console.log(err);
        setState((prevState) => {
          return {
            ...prevState,
            isAuth: false,
            authLoading: false,
            error: err,
            errorShown: true,
          };
        });
      });
  };

  const errorCloseHandler = () => {
    setState((prevState) => {
      return { ...prevState, errorShown: false };
    });
  };

  return (
    <Fragment>
      <Router history={newHistory}>
        <Header
          state={state}
          logout={logoutHandler}
          themeToggle={themeToggle}
          isDark={isDark}
        />
        <Switch>
          <Route path="/" exact>
            <section className="mainSection">
              <HomePage userState={userState} />
              {state.errorShown && (
              <ErrorPopup error={state.error} close={errorCloseHandler} />
            )}
            </section>
            <Footer />
          </Route>
          <Route path="/item/:itemId" exact>
            <section className="mainSection">
              <ItemPage userState={userState} />
              {state.errorShown && (
              <ErrorPopup error={state.error} close={errorCloseHandler} />
            )}
            </section>
            <Footer />
          </Route>
          <Route path="/login" exact>
            <LoginPage onLogin={loginHandler} history={newHistory} loading={state.authLoading} />
            {state.errorShown && (
              <ErrorPopup error={state.error} close={errorCloseHandler} />
            )}
          </Route>
          <Route path="/signup" exact>
            {state.errorShown && (
              <ErrorPopup error={state.error} close={errorCloseHandler} />
            )}
            <SignupPage onSignup={signupHandler} loading={state.authLoading} />
          </Route>
          <Route path="/profile" exact>
            <section className="mainSection">
              <ProfilePage state={state} />
              {state.errorShown && (
              <ErrorPopup error={state.error} close={errorCloseHandler} />
            )}
            </section>
          </Route>
          <Route path="/userfeed" exact>
            {/* <section className="mainSection"> */}
              <UsersFeed userState={userState} />
              {state.errorShown && (
              <ErrorPopup error={state.error} close={errorCloseHandler} />
            )}
            {/* </section> */}
            <Footer isDark={isDark} />
          </Route>
          <Route path='/about' exact>
                <AboutPage />
                <Footer isDark={isDark} />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
