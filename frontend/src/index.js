import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './index.css';
import AddDoctor from './pages/addDoctor/index';
import MainInitial from './pages/main-initial/index';
import Main from './pages/main/main';
import SaibaMais from './pages/saiba-mais/index';
import Search from './pages/search/index';
import Success from './pages/success/index';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Main} exact/>
      <Route path="/main-initial" component={MainInitial}/>
      <Route path="/search" component={Search} />
      <Route path="/add" component={AddDoctor} />
      <Route path="/success" component={Success} />
      <Route path="/saiba-mais" component={SaibaMais} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);