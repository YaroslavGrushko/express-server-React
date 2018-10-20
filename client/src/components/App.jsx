import React, { Component } from 'react';
import logo from './logo.svg';
import Clock from 'react-live-clock';
//less (newest analogue of css):
/*-->*/
import './Appless.css';
/*<--*/

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

//webcames array with city name and src to youtube live
const PLACES={};
PLACES["Европа"]=[
  {city:"Saint-Malo-Le Port", src:"https://www.youtube.com/embed/fQ8pFCrVGzE", zip: "Saint-Malo", time_zone:"Europe/Berlin"},
  {city:"Baden-Baden", src:"https://www.youtube.com/embed/KiKuzd-ioRw", zip: "Baden-Baden", time_zone:"Europe/Berlin"},
  //{city:"Venice", src:"https://www.youtube.com/embed/YiiNSrDuECw", zip: "Venezia", time_zone:"Europe/Madrid"}
  {city:"Venice", src:"https://www.youtube.com/embed/vPbQcM4k1Ys", zip: "Moscow", time_zone:"Europe/Madrid"},
  {city:"Oslo", src:"https://www.youtube.com/embed/DhPYnvZmFQA", zip: "Oslo", time_zone:"Europe/Madrid"}
];
PLACES["Азия"]=[
  {city:"Koh Samui", src:"https://www.youtube.com/embed/y5hjoAZGf_E", zip: "Ko Samui", time_zone:"Asia/Saigon" },
  {city:"Tokyo", src:"https://www.youtube.com/embed/JYBpu1OyP0c", zip: "Tokyo", time_zone:"Asia/Tokyo"},
  {city:"Tokyo", src:"https://www.youtube.com/embed/nKMuBisZsZI", zip: "Tokyo", time_zone:"Asia/Tokyo"},
  {city:"Earth", src:"https://www.youtube.com/embed/qyEzsAy4qeU", zip: "Kiev", time_zone:"Europe/Kiev"}
];
PLACES["Америка"]=[
  {city:"New York", src:"https://www.youtube.com/embed/la90mA4VLa4", zip: "New York", time_zone:"America/New_York"},
  {city:"Banff", src:"https://www.youtube.com/embed/2UX83tXoZoU", zip: "Banff", time_zone:"Canada/Central"},
  {city:"Tucson", src:"https://www.youtube.com/embed/nmoQp7gyzIk", zip: "Tucson", time_zone:"America/Fort_Nelson"},
  {city:"Mexico City", src:"https://www.youtube.com/embed/jHD8XrAYAyk", zip: "Mexico City", time_zone:"America/Mexico_City"}
];
PLACES["Африка"]=[
  {city:"Cape Town", src:"https://www.youtube.com/embed/Ki-d5f5_WwU", zip: "Cape Town", time_zone:"Africa/Cairo"},
  {city:"Melbourne", src:"https://www.youtube.com/embed/FZ72I6o6Z9k", zip: "Melbourne", time_zone:"Australia/Melbourne"},
  {city:"Animals", src:"https://www.youtube.com/embed/TW19E-C8nJ8", zip: "Cape Town", zip: "Cape Town"},
  {city:"Animals", src:"https://www.youtube.com/embed/Kay9czw22ew", zip: "Cape Town", zip: "Cape Town"}
];
//country array with country name and onClick function:
const ALL_COUNTRIES=[
  {name:"Европа", imgCss:"EuropeImg CountryButton", fontStyle:"Country light"},
  {name:"Азия", imgCss:"AsiaImg CountryButton", fontStyle:"Country dark"},
  {name:"Америка", imgCss:"AmericaImg CountryButton", fontStyle:"Country light"},
  {name:"Африка", imgCss:"AfricaImg CountryButton", fontStyle:"Country dark"}
];
class WeatherDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      customers: null,
    };
  }
  componentDidMount() {
    // get whether API from whether server
    const zip = this.props.zip;
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({
    weatherData: json,
    });
     });
  }

render() {
  const weatherData = this.state.weatherData;
  {/*alert('this.state.weatherData='+this.state.weatherData);*/}
  if (!weatherData) return (<div>Loading</div>);
  const weather = weatherData.weather[0];
  const iconUrl = "https://openweathermap.org/img/w/" + weather.icon + ".png";
  return (
  <div>
    <div>  {/*JSON.stringify(weatherData)*/}
           {/* <img src={iconUrl} alt={weatherData.description} /> */}
      <p>t:{weatherData.main.temp}°C</p>
      <p>{weatherData.wind.speed} km/h</p>
    </div>
  </div>
    );
  }
}

//component of single video:
class AwebCam extends Component{
  render(){
    return(
      <div>
      <iframe className="WebCamVideo" src={this.props.src} frameBorder="0" allow="encrypted-media" allowFullScreen>
      </iframe>
      </div>
    );
  }
}

//component of several AwebCam components:
class WebCames extends Component{
  constructor(){
    super();
    this.state = {
     PLACES: {},
    }
  }
  componentDidMount(){
    console.log('WebCames component starts did mount');
    //now we don't write http://localhost:5000/api/customers
    //because we wrote proxy in package.json of client
    fetch('/api/places')
    .then(res=>res.json())
    .then(PLACES => this.setState({PLACES:PLACES}, () => console.log('PLACES fetched ...', PLACES))); 
}


  render(){
  const country=this.props.country;
  const myPLACES = this.state.PLACES[country];

  if (!myPLACES) return (<div>Loading</div>);
    return(
      <Grid>
      <Row md={6} sm={6}>
      {myPLACES.map((place, index) => (
      <Col key={index} md={6} sm={6}>
        <table>
          <tr>
            <td>
              <AwebCam className="Wrapper" src={place.src} />
              <span className="CenturyGothicCommon">{place.city}</span>
            </td>
            <td>
            <span class="clock_span">
              <Clock
                format={'HH:mm:ss'}
                ticking={true}
                timezone={place.time_zone}
              />
            </span>
              <WeatherDisplay zip={place.zip}/>
            </td>
          </tr>
        </table>
     </Col>
  ))
}
        </Row>
        </Grid>
);
// // test
// return <div>hello, this is test!</div>
  }
}

//component of single Country button
class Country extends Component{
  render(){
    let css1="grow "+this.props.imgCss;
    return(
  <button className={css1} onClick={this.props.onClick}>
    <div className={this.props.fontStyle}>{this.props.name}</div>
  </button>
    );
  }
}

//component of several Country components:
class Countries extends Component{
  render(){
    return(<div>
      <p className="App-intro">
        to start, please select a country:
      </p>
      <Grid>
      <Row md={6} sm={6}>
      {ALL_COUNTRIES.map((country, index) => (
        <Col key={index} md={6} sm={6}>
            <Country className="Wrapper" imgCss={country.imgCss} onClick={() => this.props.onClick(country.name)} name={country.name} fontStyle={country.fontStyle}/>
        </Col>
    ))
    }
        </Row>
        </Grid>
        </div>
    );
    }
    }

//components of back button on WebCams "page":
class BackButton extends Component{
  render(){
    return(
      <div>
        <button className="BackButton button_back" onClick={()=>this.props.onClick()}>
          <span className="CenturyGothicCommon">go <b>back</b> to the countries</span>
        </button>
      </div>
    );
  }
}

//main component of whole app:
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWebCames:false,
      country:ALL_COUNTRIES[0].name,
      customers: [],
    };
  }
//Country button handler function:
handleClick(countryName) {
    this.setState({
      country:countryName,
      showWebCames:true,
    });
  }
//"to back" button handler function:
handleBackClick(){
  this.setState({
    showWebCames:!this.state.showWebCames,
  });
}
//function that returns <Countries/> tag(component):
renderCountries(){
    let countries=[];
  countries.push(<Countries key={0} onClick={(i) => this.handleClick(i)} />);
  return countries;
}
//function that returns <BackButton/> and <WebCames/> tag(component):
renderWebCames(){
let webCames=[];
  webCames.push(<BackButton key={1} onClick={() => this.handleBackClick()} />);
  webCames.push(<WebCames key={2} country={this.state.country} />);
  return webCames;
}
// when component has mount
// componentDidMount(){
//   //now we don't write http://localhost:5000/api/customers
//   //because we wrote proxy in package.json of client
//   fetch('/api/customers')
//   .then(res=>res.json())
//   .then(customers => this.setState({customers:customers}, () => console.log('Customers fetched ...', customers)));
// }
  //////////
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-title">let's see the world online!</p>
        </header>
        {this.state.showWebCames ? this.renderWebCames() : this.renderCountries()}
        {/* test>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        {/* <div>
        <h2>Customers</h2>
        <ul>
          {this.state.customers.map(customer =>
            <li key={customer.id}>{customer.firstName}  {customer.lastName}</li>
            )}
        </ul>
      </div> */}
      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<test */}
      </div>
    );
  }
}

//module.exports = App;
 export default App;
