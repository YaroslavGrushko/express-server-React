import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import WeatherContent from './components/weather.jsx';
import App from './components/App.jsx';

// ReactDOM.render(
//     <WeatherContent/>,
//     document.getElementById("app")
// )

ReactDOM.render(
     <App/>,
     document.getElementById("World_modal_content")
)
