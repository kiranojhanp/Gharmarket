import React from "react";
import "./App.css";

//Components
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import FloatingActionButton from "./components/FloatingActionButton";


import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />

        <main>
          <Switch>
            <Route path="/" component={Register} exact />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route component={Error} />
          </Switch>
        </main>

        <FloatingActionButton />

      </div>
    </>
  );
}

export default App;
