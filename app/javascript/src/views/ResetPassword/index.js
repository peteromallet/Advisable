import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword'
import RequestPasswordReset from './RequestPasswordReset'

export default ({ match }) => {
  return (
    <Switch>
      <Route path={match.path} exact component={RequestPasswordReset} />
      <Route path={`${match.path}/:token`} component={ResetPassword} />
    </Switch>
  )
}