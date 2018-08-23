import React, { Component } from 'react';
import * as firebase from 'firebase';
import Dashboard from '../components/Dashboard';
import News from '../components/News';
import Login from '../components/Login';
import { Row, Input, Button } from 'react-materialize';


class Admin extends Component {
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

  authListener() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    }.bind(this));
  }


    render() {
        let render;
        if (this.state.user != null) {
         render = <Dashboard /> 
        } else {
            render = <Login />
        }
        return (
        
            <div>{render}</div>
        );
    }
}

export default Admin;