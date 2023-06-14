import React, { Fragment } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./ui/Header";

import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from './pages/Auth/SignupPage';

const newHistory = createBrowserHistory();

function App() {
  // console.log(newHistory);
  // console.log("rendered");
  return (
    <Fragment>
      <Router history={newHistory}>
        <Switch>
          <Route path="/" exact>
            <Header />
            <HomePage />
          </Route>
          <Route path="/item/:itemId" exact>
            <Header />
            <ItemPage />
          </Route>
          <Route path="/login" exact>
            <Header />
            <LoginPage />
          </Route>
          <Route path="/signup" exact>
            <Header />
            <SignupPage />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
