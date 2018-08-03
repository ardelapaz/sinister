import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Row, Input, Button } from 'react-materialize';

class Template extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            youtube: '',
            public: false
        };

        this.newsRef = firebase.database().ref('news');
        this.createPost = this.createPost.bind(this);

    }

    onTextChange(e) {
        const text = e.target.value;
        console.log(e.target.value);
        switch (e.target.id) {
            case ("title"):
                this.setState({ title: text });
                break;
            case ("body"):
                this.setState({ body: text });
                break;
            case ("youtube"):
                this.setState({ youtube: text });
                break;
            case ("public"):
                this.setState({ public: text });
                break;
        }

        console.log(this);
    }

    createPost() {
        console.log('test');
        this.newsRef.push({
            title: this.props.title,
            body: this.props.body,
            public: this.props.public,
            youtube: this.props.youtube,
            image: this.props.image
        });
    }


    render() {
        return (
            <div className = "post-form">
                <Row className = "form"  >
                    <Input  s={12} label="Post Title" value={this.state.title} onChange={this.onTextChange.bind(this)} id="title" />
                    <Input type="textarea" s={12} label="Post Body" value = {this.state.body} onChange={this.onTextChange.bind(this)} id="body" />
                    <Input  s={12} label="YouTube Video Link" value = {this.state.youtube} onChange={this.onTextChange.bind(this)} id="youtube" />
                    <Input name='public' type='checkbox' label='Make news post public?' onChange={this.onTextChange.bind(this)} id="public" />
                    <Button onClick={console.log('test')}   >Submit</Button>
                </Row>
            </div>
        );
    }
}

export default Template;