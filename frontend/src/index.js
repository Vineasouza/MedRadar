import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './index.css';
import App from './pages/home/index';
import Search from './pages/search/index';
import AddDoctor from './pages/addDoctor/index';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/search" component={Search} />
      <Route path="/add" component={AddDoctor} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);