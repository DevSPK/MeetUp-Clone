// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GroupsPage from "./components/GroupsPage";
import EventsPage from "./components/EventsPage";
import SplashPage from "./components/SplashPage";
import { SingleGroup } from "./components/SingleGroup";
import GroupInput from "./components/GroupInput";
import GroupUpdate from "./components/GroupUpdate";
import { SingleEvent } from "./components/SingleEvent";
import EventInput from "./components/EventInput";
import LoginFormModal from "./components/LoginFormModal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='App'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route
            path='/groups/:id/events'
            // /api/groups/:groupId/events
          >
            <EventInput />
          </Route>
          <Route path='/groups/:id'>
            <SingleGroup />
          </Route>
          <Route path='/events/:id'>
            <SingleEvent />
          </Route>
          <Route path='/login'>
            <LoginFormModal />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/groups'>
            <GroupsPage />
          </Route>
          <Route path='/events'>
            <EventsPage />
          </Route>
          <Route path='/start-a-group'>
            <GroupInput />
          </Route>
          <Route path='/edit-a-group/:id'>
            <GroupUpdate />
          </Route>

          <Route
            exact
            path='/'>
            <SplashPage />
          </Route>
          {/* <Route path=''>
            <SplashPage />
          </Route> */}
        </Switch>
      )}
    </div>
  );
}

export default App;
