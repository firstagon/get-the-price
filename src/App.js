import React, { Fragment } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./ui/Header";

import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import Footer from "./ui/footer/Footer";

const newHistory = createBrowserHistory();

function App() {
  // console.log(newHistory);
  // console.log("rendered");
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
            <LoginPage />
          </Route>
          <Route path="/signup" exact>
            <SignupPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
