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

const LOGIN_URL = "http://127.0.0.1:3030/auth/login";
const SIGNUP_URL = "http://127.0.0.1:3030/auth/signup";

const newHistory = createBrowserHistory();

const token = localStorage.getItem("token");
const expiryDate = localStorage.getItem("expiryDate");
const userId = localStorage.getItem("userId");

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

  const userState = { token: state.token, userId: state.userId };

  const [isDark, setIsDark] = useState(false);

  const themeToggle = (e) => {
    e.preventDefault();
    setIsDark((prevState) => !prevState);
    localStorage.setItem("theme", !isDark);
  };

  const theme = localStorage.getItem("theme");

  const getTheme = () => {
    if (!theme) {
      localStorage.setItem("theme", isDark);
      return;
    } else if (theme === "true") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  };

  const themechanger = (style) => {
    if (style === "dark") {
      document.documentElement.style.setProperty("--base-colour", "#ffffff");
      document.documentElement.style.setProperty("--base-font-colour", "#000");
    } else {
      document.documentElement.style.setProperty("--base-colour", "black");
      document.documentElement.style.setProperty("--base-font-colour", "#fff");
    }
  };

  const darkClass = isDark ? themechanger("dark") : themechanger();

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
      return { ...prevState, isAuth: true, token: token, userId: userId };
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
        console.log(resData);
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
          theme={{ toggle: themeToggle, class: darkClass }}
        />
        <Switch>
          <Route path="/" exact>
            <section className="mainSection">
            <HomePage userState={userState} />
            </section>
            <Footer />
          </Route>
          <Route path="/item/:itemId" exact>
          <section className="mainSection">
            <ItemPage userState={userState} />
            </section>
            <Footer />
          </Route>
          <Route path="/login" exact>
            <LoginPage onLogin={loginHandler} loading={state.authLoading} />
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
            </section>
          </Route>
          <Route path="/userfeed" exact>
          <section className="mainSection">
            <UsersFeed userState={userState} />
            </section>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
