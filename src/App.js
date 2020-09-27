import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header";
import GeneratorForm from "./components/generator-form";
import Login from "./components/login";
import EditorForm from "./components/editor-form";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path={`/`}>
            <GeneratorForm />
          </Route>
          <Route path={`/login`}>
            <Login />
          </Route>
          <Route path={`/edytor-szablonow`}>
            <EditorForm />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
