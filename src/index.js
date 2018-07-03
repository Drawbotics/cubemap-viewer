import React from 'react';
import ReactDOM from 'react-dom';
import 'tourama/dist/vendor.js';
import 'tourama/dist/tourama.styles.css';
import { Tourama } from 'tourama';

import Viewer from './containers/Viewer';

import './styles/app';

ReactDOM.render(
  <Viewer />,
  document.getElementById('root'),
);


console.log('hi');
