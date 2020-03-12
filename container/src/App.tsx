import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MicroFrontend from './components/micro-frontend/MicroFrontend';

const { REACT_APP_BROWSE_HOST, REACT_APP_RESTAURANT_HOST } = process.env;

const App: React.FC = () => {
  return (
    <div>
      MicroFrontend
      <MicroFrontend name='hello' host='http://localhost:3001' />
    </div>
  );
};

export default App;
