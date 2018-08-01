import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className = "login-boxes">
            <a className="login" href="login">LOG IN</a>
            <a className="login" href="login">REGISTER</a>
          </div>
        );
    }
}

export default Login;