import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Redirect } from 'react-dom';
import * as firebase from 'firebase';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange(e) {
        this.setState({ [e.target.type]: e.target.value });
    }

    onSubmit(e) {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    


    render() {
        return (
            <div className = "centered" id="login">
                <h1 className = "login">Log In</h1>
                <Row>
                    <Input type="email" label="Email" s={12} onChange={this.handleChange.bind(this)} />
                    <Input type="password" label="password" s={12} onChange={this.handleChange.bind(this)} />
                    <Button waves='light' color='red' onClick={this.onSubmit.bind(this)}>Sign In</Button>
                </Row>            
            </div>
        );
    }
}

export default Login;