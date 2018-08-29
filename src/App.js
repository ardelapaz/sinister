import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import './App.css';
import { Carousel } from 'react-materialize';
import Header from './components/Header';
import Social from './components/Social';
import Login from './components/Login';
import Sponsor from './components/Sponsors';
import Teams from './components/Teams';
import Contact from './components/Contact';
import News from './components/News';
import { Footer } from 'react-materialize';
import Create from './components/Create';
import Post from './components/Post';
import NewsList from './components/NewsList';
import Landing from './components/Landing';
import Team from './components/Team';
import Admin from './components/Admin';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
  }
  this.authListener = this.authListener.bind(this);
}


componentDidMount() {
  this.authListener();
}
componentWillUnmount() {
  this.authListener();
}

authListener() {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    if (user) {
      this.setState({ user: user });
    } else {
      this.setState({ user: null });
    }
  }.bind(this));
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
          <main>
            <Route path="/" render={props =>
            <div>
              <div className = "header">
                <Social />
                <Logout />
              </div>
              <Header />
              <Sponsor />
            </div>} />
            <Route exact path = "/" component = { Landing } />
            <Route exact path="/teams" component = { Teams } />
            <Route exact path="/news" component = { NewsList } />
            <Route path="/contact" component = { Contact } />
            <Route path="/news/:id" component = { Post } />
            <Route path="/teams/:id" component = { Team } />
            <Route exact path = "/dashboard" component = { Admin } />
            <Route exact path = "/login" component = { Login } />
            
         </main>


          <Footer  id = "footer" copyrights="&copy 2015 Copyright Text"
              links={
               <ul>
                 <li><a className="grey-text text-lighten-3" href="/">Home</a></li>
                 <li><a className="grey-text text-lighten-3" href="/news">News</a></li>
                 <li><a className="grey-text text-lighten-3" href="/team">Team</a></li>
                 <li><a className="grey-text text-lighten-3" href="/contact">Contact Us</a></li>
               </ul>
             }
             className='footer-color'
              >
                <img src="../images/teamsinister.png" className = "footer-picture"/>
            </Footer>
      </div>
    );
  }
}

export default App;
