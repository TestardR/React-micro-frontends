import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MicroFrontend from './components/micro-frontend/MicroFrontend';
import Header from './components/header/Header';
import About from './components/about/About';

const { REACT_APP_RESTAURANT_HOST: restaurantHost } = process.env;

const Restaurant = ({ history }: { history: any }) => {
  return (
    <MicroFrontend history={history} host={restaurantHost} name="Restaurant" />
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Restaurant} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
