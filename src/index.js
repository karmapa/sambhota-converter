import 'babel-polyfill';
import './index.css';
import React from 'react';
import {render} from 'react-dom';
import App from './containers/App.js';

render(
  <App />,
  document.getElementById('root')
);
