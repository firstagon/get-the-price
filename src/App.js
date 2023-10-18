import React, { Fragment, useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, signup } from "./store/login-actions";
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
// import getLocation from "./middleware/getLocation";

// import { LOGIN_URL, SIGNUP_URL } from './links';

const newHistory = createBrowserHistory();

const token = localStorage.getItem("token");
const expiryDate = localStorage.getItem("expiryDate");
const userId = localStorage.getItem("userId");
const name = localStorage.getItem("name");

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);


  // const [state, setState] = useState({
  //   showBackdrop: false,
  //   showMobileNav: false,
  //   isAuth: false,
  //   token: null,
  //   userId: null,
  //   authLoading: false,
  //   error: null,
  //   errorShown: false,
  //   name: null,
  //   status: null,
  //   location: null
  // });

  // function getLocation() {
  //   fetch('https://geolocation-db.com/json/')
  //     .then(response => response.json())
  //     .then(data => {
  //       return setState((prevState) => {
  //         return {
  //           ...prevState,
  //           location: { ...data }
  //         }
  //       })
  //     }).then((res) => console.log(state.location))
  //     .catch(error => console.log(error))
  // }

  // const userState = { token: state.token, userId: state.userId, name: state.name, location: state.location };

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
      // logoutHandler();
      dispatch(logout);
      return;
    }

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    // setState((prevState) => {
    //   return { ...prevState, isAuth: true, token: token, userId: userId, name: name };
    // });
    setAutoLogout(remainingMilliseconds);
  };

  useEffect(() => {
    mounted();
    getTheme();
  }, []);

  const logoutHandler = () => {
    dispatch(logout);
    //   setState((prevState) => {
    //     return {
    //       ...prevState,
    //       isAuth: false,
    //       token: null,
    //       name: null,
    //       userId: null,
    //     };
    //   });
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("expiryDate");
    //   localStorage.removeItem("userId");
    //   localStorage.removeItem("name");
  };

  function setAutoLogout(millisseconds) {
    setTimeout(() => {
      // logoutHandler();
      dispatch(logout);
    }, millisseconds);
  }

  const loginHandler = (authData) => {
    dispatch(login(authData));
  };

  const signupHandler = (authData) => {
    dispatch(signup(authData))
    // console.log(authData);
    // setState((prevState) => {
    //   return { ...prevState, authLoading: true };
    // });
    // fetch(SIGNUP_URL, {
    //   method: "PUT",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(authData),
    // })
    //   .then((res) => {
    //     if (res.status === 422) {
    //       throw new Error(
    //         "Validation failed. Make shure the email adress isn't used yet"
    //       );
    //     }
    //     if (res.status !== 200 && res.status !== 201) {
    //       console.log("Error!");
    //       throw new Error("Creating a user failed");
    //     }
    //     return res.json();
    //   })
    //   .then((resData) => {
    //     // console.log(resData);
    //     setState((prevState) => {
    //       return { ...prevState, isAuth: false, authLoading: false };
    //     });
    //     loginHandler(authData);
    //     newHistory.replace("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setState((prevState) => {
    //       return {
    //         ...prevState,
    //         isAuth: false,
    //         authLoading: false,
    //         error: err,
    //         errorShown: true,
    //       };
    //     });
    //   });
  };

  const errorCloseHandler = () => {
    //   setState((prevState) => {
    //     return { ...prevState, errorShown: false };
    //   });
  };

  const showError = (errorString) => {
    // setState(prevState => {
    //   return {
    //     ...prevState, error: errorString,
    //     errorShown: true,
    //   }
    // })
    dispatch(setError(errorString));
  }


  const showStatus = (str) => {
    let obj;
    switch (str) {
      case 'loading':
        obj = { message: "Идет поиск товара", title: "Sending request" };
        break;
      case 'complete':
        obj = { message: "Товар успешно добавлен", title: "Complete" };
        break;
      case 'loaded':
        obj = { message: 'Загрузка завершена', title: 'Complete' };
        break;
      case 'error':
        obj = { message: "Ошибка подключения к серверу", title: "Error" }
        break;
      default:
        break;
    }

    dispatch(setError({ status: obj }))

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
              <HomePage showStatus={showStatus} showError={showError} />
            </section>
            <Footer />
          </Route>
          <Route path="/item/:itemId" exact>
            <section className="mainSection">
              <ItemPage history={newHistory} showStatus={{ status: showStatus, clearStatus: clearStatus, onError: showError }} />
            </section>
            <Footer />
          </Route>
          <Route path="/login" exact>
            <LoginPage onLogin={loginHandler} history={newHistory} />
          </Route>
          <Route path="/signup" exact>
            <SignupPage onSignup={signupHandler} loading={state.authLoading} />
          </Route>
          <Route path="/profile" exact>
            <section className="mainSection">
              <ProfilePage state={state} />
            </section>
          </Route>
          <Route path="/userfeed" exact>
            <UsersFeed showStatus={{ status: showStatus, clearStatus: clearStatus, onError: showError }} />
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
        {!!userState.status && <Notificator status={userState.status} clearStatus={clearStatus} />}
        {/* <Notificator status={{message: "TESTING", title: "Sending request"}} clearStatus={clearStatus} /> */}
        {userState.errorShown && (
          <ErrorPopup error={userState.error} close={errorCloseHandler} />
        )}
      </Router>
    </Fragment>
  );
};


export default App;
