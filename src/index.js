import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Menu from './components/menu'
import Login from './components/login'
import Deposit from './components/deposit';
import Checkout from './components/checkout';
import Update from './components/update';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={App} />
        <Route path="/menu" component={Menu} />
          <Route path="/deposit" component={Deposit} />
            <Route path="/checkout" component={Checkout} />
              <Route path="/update" component={Update} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
