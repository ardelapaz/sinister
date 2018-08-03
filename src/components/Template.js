import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';

class Template extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            youtube: '',
            public: false
        };

    }
    render() {
        return (
            <div className = "post-form">
                <Row className = "form">
                    <Input  s={12} label="Post Title" value={this.state.title} />
                    <Input type="textarea" s={12} label="Post Body" value = {this.state.body} />
                    <Input  s={12} label="YouTube Video Link" value = {this.state.youtube} />
                    <Input name='public' type='checkbox' value={this.state.public} label='Make news post public?' />
                </Row>
            </div>
        );
    }
}

export default Template;