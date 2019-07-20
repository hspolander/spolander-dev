import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

async function init() {
    ReactDOM.render(<App />, document.getElementById('root'));
    if (module.hot) {
        module.hot.accept();
    }
}
init();
