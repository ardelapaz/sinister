import React, { Component } from 'react';
import { Redirect } from 'react-dom';
import * as firebase from 'firebase';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';



class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            user: null
        }

        this.handleChange = this.handleChange.bind(this);
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

    handleChange(e) {
        console.log(this.state.email);
        this.setState({ [e.target.type]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    


    render() {
        return this.state.user ? (
        <Button href = "/dashboard">Click me</Button>) : (
            <div className = "centered" id="login">
                <h1 className = "login">Log In</h1>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail"  >
                        <Col componentClass={ControlLabel} sm={2}>
                          Email
                        </Col>
                     <Col sm={10} >
                          <FormControl type="email" placeholder="Email" class="border-bottom border-danger" onChange = {this.handleChange}/>
                     </Col>
                     </FormGroup>

                     <FormGroup controlId="formHorizontalPassword" >
                      <Col componentClass={ControlLabel} sm={2}>
                        Password
                       </Col>
                       <Col sm={10} >
                         <FormControl type="password" placeholder="Password" onChange = {this.handleChange}/>
                       </Col>
                     </FormGroup>

                     <FormGroup>
                       <Col smOffset={2} sm={10}>
                         <Button type="submit" onClick={this.onSubmit.bind(this)}>Sign in</Button>
                       </Col>
                      </FormGroup>
                </Form>;
                {/* <Row>
                    <Input type="email" label="Email" s={12} onChange={this.handleChange.bind(this)} />
                    <Input type="password" label="password" s={12} onChange={this.handleChange.bind(this)} />
                    <Button waves='light' color='red' onClick={this.onSubmit.bind(this)}>Sign In</Button>
                </Row>             */}
            </div>
        );
    }
}

export default Login;