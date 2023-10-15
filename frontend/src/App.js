//Importing React component from React Library
import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/global components/login";
import Signup from "./components/global components/signup";

import Landing from "./components/global components/landing";
import ChatUi from "./components/global components/chatUi";
import ErrorPage from './components/global components/errorPage/errorPage'

/**
 * @description rendering all the compomnents of the site here
 * using router,switch,route. And the user can render to that particular webpage accordingly.
 */
function App() {
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
  const pageRender = (Page, pageStr) => {
    if (
      pageStr === "login" ||
      pageStr === "signup" ||
      pageStr === "about" ||
      pageStr === "forget" ||
      pageStr === "email"|| 
      isLoggedIn
    ) {
      return (
        <>
          {/* <NavBar /> */}
          <Page />
          {/* <Footer /> */}
        </>
      );
    } else {

      return (
        <>
          {/* <NavBar /> */}
          <ErrorPage />
          {/* <Footer /> */}
        </>
      );
    }
  };

  return (
    <>
      <Router>
        <Switch>
         
          <Route
            exact
            path="/signup"
            render={() => pageRender(Signup, "signup")}
          />
          <Route
            exact
            path="/signup/:id"
            render={() => pageRender(Signup, "signup")}
          />
          <Route exact path="/dashboard" render={() => pageRender(Landing)} />
          <Route exact path="/userDashboard" render={() => pageRender(ChatUi)} />

          <Route exact path="/" render={() => pageRender(Login, "login")} />
         
        </Switch>
      </Router>
    </>
  );
}
export default App;
