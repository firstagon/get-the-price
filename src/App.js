import React, { Fragment } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import Header from "./ui/Header";

import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";

const newHistory = createBrowserHistory();

function App() {
  console.log(newHistory);
  console.log("rendered");
  return (
    <Fragment>
      <Header />
      <Router history={newHistory}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/:itemId" exact>
            <ItemPage />
          </Route>
        </Switch>
      </Router>
      <div></div>
    </Fragment>
  );
}

export default App;
