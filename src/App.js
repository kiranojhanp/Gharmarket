import React from "react";
import "./App.css";

//Components
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import AdPage from "./components/AdPage";

import { Route, Switch } from "react-router-dom";
import UploadImage from "./components/UploadImage";
import AllAds from "./components/AllAds";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />

        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/home" component={AllAds} exact />
            <Route path="/home/:advertid" component={AdPage} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/post-advert" component={UploadImage} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route component={Error} />
          </Switch>
        </main>
      </div>
    </>
  );
}

export default App;
