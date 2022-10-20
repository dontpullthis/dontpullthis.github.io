import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Homepage = lazy(() => import('./homepage/Homepage'));

// Scripts
const HashCalculator = lazy(() => import('./scripts/hash-calculator/HashCalculator'));
const PasswordGenerator = lazy(() => import('./scripts/password-generator/PasswordGenerator'));
const UnixTimestampConverter = lazy(() => import('./scripts/unix-timestamp-converter/UnixTimestampConverter'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/homepage" component={ Homepage } />
          <Route exact path="/scripts/hash-calculator" component={ HashCalculator } />
          <Route exact path="/scripts/password-generator" component={ PasswordGenerator } />
          <Route exact path="/scripts/unix-timestamp-converter" component={ UnixTimestampConverter } />
          <Redirect to="/homepage" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;