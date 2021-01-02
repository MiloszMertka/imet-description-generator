import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import Header from "./components/header";
import GeneratorForm from "./components/generator-form";
import Login from "./components/login";
import EditorForm from "./components/editor-form";
import PrivateRoute from "./components/private-route";

function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false, token: null });

  const authenticate = (token) => {
    if (token) {
      setAuth({ isAuthenticated: true, token });
      sessionStorage.setItem("jwt", token);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (token && token !== "null") {
      authenticate(token);
    }
  }, []);

  return (
    <ToastProvider autoDismiss={true}>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path={`/`}>
              <GeneratorForm />
            </Route>
            <Route
              exact
              path={`/login`}
              render={(props) => (
                <Login
                  isAuthenticated={auth.isAuthenticated}
                  authenticate={authenticate}
                  {...props}
                />
              )}
            />
            <PrivateRoute
              exact
              path="/edytor-szablonow"
              component={EditorForm}
              isAuthenticated={auth.isAuthenticated}
              token={auth.token}
            />
          </Switch>
        </main>
      </Router>
    </ToastProvider>
  );
}

export default App;
