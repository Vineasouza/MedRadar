import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './index.css';
import MainInitial from './pages/main-initial/index';
import Main from './pages/main/index';
import Search from './pages/search/index';
import AddDoctor from './pages/addDoctor/index';
import Success from './pages/success/index';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Main} exact/>
      <Route path="/main-initial" component={MainInitial}/>
      <Route path="/search" component={Search} />
      <Route path="/add" component={AddDoctor} />
      <Route path="/success" component={Success} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);