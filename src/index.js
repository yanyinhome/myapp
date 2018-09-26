import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import RouteMap from './myseltComponent/RouteMap';
import "bootstrap/dist/css/bootstrap.css";
ReactDOM.render(
    <div>
        <RouteMap/>
    </div>
    , document.getElementById('root'));
registerServiceWorker();
