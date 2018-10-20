import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import WeatherContent from './components/weather.jsx';
//import module from './components/App.jsx';
import './components/index.css';
import Module from './components/App.jsx';


// ReactDOM.render(
//     <WeatherContent/>,
//     document.getElementById("app")
// )

ReactDOM.render(
     <Module/>,
     document.getElementById("root")
)
