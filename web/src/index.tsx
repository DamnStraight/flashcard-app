import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import "@blueprintjs/core/lib/css/blueprint.css";

import { Provider, createClient } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
})

ReactDOM.render(
  <Provider value={client}>
    <App /> 
  </Provider>
, document.getElementById('root'));
