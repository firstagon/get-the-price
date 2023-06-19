import React, { Fragment, useState } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./ui/Header";

import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import Footer from "./ui/footer/Footer";

const LOGIN_URL = "http://127.0.0.1:3030/auth/login";
const SIGNUP_URL = 'http://127.0.0.1:3030/auth/signup';

const newHistory = createBrowserHistory();

function App() {
  const [state, setState] = useState({
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  });
  // console.log(newHistory);
  // console.log("rendered");

  const mounted = () => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setState((prevState) => {
      return { ...prevState, isAuth: true, token: token, userId: userId };
    });
    setAutoLogout(remainingMilliseconds);
  };



  const logoutHandler = () => {
    setState((prevState) => {
      return { ...prevState, isAuth: false, token: null };
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  function setAutoLogout(millisseconds) {
    setTimeout(() => {
      logoutHandler();
    }, millisseconds);
  };

  const loginHandler = (authData) => {
    setState((prevState) => {
      return { ...prevState, authLoading: true };
    });
    fetch(LOGIN_URL, {method: 'POST', headers: { "Content-type": 'application/json' }, body: JSON.stringify(authData) })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setState((prevState) => {
          return { ...prevState, isAuth: true, token: resData.token, authLoading: false, userId: resData.userId };
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
        setState((prevState) => {
          return { ...prevState, isAuth: false, authLoading: false, error: err };
        });
      });
  };

  const signupHandler = (authData) => {
    console.log(authData)
    setState((prevState) => {
      return { ...prevState, authLoading: true}
    })
    fetch(SIGNUP_URL).then(res => {
      if (res.status === 422) {
        throw new Error('Validation failed. Make shure the email adress isn\'t used yet')
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        throw new Error('Creating a user failed');
      }
      return res.json();
    }).then(resData => {
      console.log(resData);
      setState((prevState) => {
        return {...prevState, isAuth: false, authLoading: false}
      })
      newHistory.replace('/');
    })
  }

  return (
    <Fragment>
      <Router history={newHistory}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/item/:itemId" exact>
            <ItemPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage onLogin={loginHandler} loading={state.authLoading} />
          </Route>
          <Route path="/signup" exact>
            <SignupPage onSignup={signupHandler} loading={state.authLoading}/>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
