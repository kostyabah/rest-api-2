import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"


let Ninja = (ninja) => (
  <li>
    {/* Availability */}
    <span className={ninja.available}></span>
    {/* Name: string */}
    <span className="name">{ninja.name}</span>
    {/* Rank: string */}
    <span className="rank">{ninja.rank}</span>
    {/* More info */}
    <span className="dist" ><Link to={"/more/" + ninja.id}>More</Link> </span>

    {/* Distance */}
    <span className="dist">{Math.floor(ninja.dist.calculated / 1000)} km</span>
  </li>
)

class NinzaAbout extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {

  }
  componentDidMount() {
    сonsole.log(this.props.id) //нужный id
    // отправляешь запрос о полуении подробных данный и меняешь state
  }
}

class NinzaContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      ninjas: []
    }
  }
  handleSubmit = (e) => {
    //tell the browser to prevent the default action, not be taken as it normally would be
    e.preventDefault();
    // reference to the longitude value set by the user 
    let lng = this.refs.lng.value;
    // reference to the latitude value set by the user 
    let lat = this.refs.lat.value;
    // function that tells the browser what to return after the request
    fetch('/api/ninjas?lng=' + lng + '&lat=' + lat).then(function (data) {
      // teel what to return after the GET request ↑
      return data.json();
    }).then(json => { //setting the state when the promise is resolved
      this.setState({
        ninjas: json
      });
      console.log(json);
    });
  }
  render() {
    return (
      <div id="ninja-container" >
        {/* Handle user's input  */}
        < form id="search" onSubmit={this.handleSubmit} >
          <label>Enter your Latitude:</label>
          <input type="text" ref="lat" placeholder="latitude" value="25.871" required />
          <label>Enter your Longitude:</label>
          <input type="text" ref="lng" placeholder="longitude" value="-80" required />
          <input type="submit" value="Find Ninjas" />
        </form>
        {/* List with users / ninjas */}
        < ul > {
          ninjas.map(item => (
            <Ninja key={item.id} {...item} />
          ))
        }</ul >
      </div >
    );
  }
}
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={NinzaContainer} />
        <Route path="/ninja/:id" component={NinzaAbout} />
      </Switch>
    </Router>
  );
}

export default App;
