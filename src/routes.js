import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './App';
import LoginPage from './page/Login.page';
import BookManagementPage from './page/BookManagement.page';

export default function createRoutes() {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={LoginPage} />
      <Route path="/" component={LoginPage} />
      <Route path="/books" component={BookManagementPage} />
    </Route>
  )
}