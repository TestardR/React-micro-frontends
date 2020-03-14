import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MicroFrontend from './components/micro-frontend/MicroFrontend';
import Header from './components/header/Header';

const {
  REACT_APP_BROWSE_HOST: browseHost,
  REACT_APP_RESTAURANT_HOST: restaurantHost
} = process.env;

const Restaurant = ({ history }: { history: any }) => {
  return (
    <MicroFrontend history={history} host={restaurantHost} name="Restaurant" />
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Restaurant} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
