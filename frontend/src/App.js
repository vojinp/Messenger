import React from 'react';
import LogIn from './containers/LogIn';
import Messenger from './containers/Messenger';
import PrivateRoute from './shared/PrivateRoute';

import { HashRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <PrivateRoute exact path="/" component={Messenger} />
        <PrivateRoute exact path="/messages/:id" component={Messenger} />
        <Route path="/log-in" component={LogIn} />
      </div>
    </Router>
  );
};

export default App;
