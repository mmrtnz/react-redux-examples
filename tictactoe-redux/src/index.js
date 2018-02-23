// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Local Dependencies
import Game from './components/Game';
import reducers from './state/reducers'
import './main.css';

let store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
      <Game />
  </Provider>,
  document.getElementById('root'));
