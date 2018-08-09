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
            public: false,
            image: '',
            posts: []
        };

        this.newsRef = firebase.database().ref('news');
        this.createPost = this.createPost.bind(this);

    }

    componentDidMount() {
        this.newsRef.on('child_added', snapshot => {
            const post = snapshot.val();
            post.key = snapshot.key;
          this.setState({ posts: this.state.posts.concat( post ) });
          this.props.parentMethod(post);
        });
      }

    onTextChange(e) {
        const text = e.target.value;
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
                this.setState({ public: e.target.checked });
                break;
            case ("input"): 
                var selectedFile = document.getElementById('input').files[0];
                var fileName = selectedFile.name;
                this.setState({ image: fileName });
                this.storageRef = firebase.storage().ref(fileName);
                break;
        }
    }

    createPost() {
        this.newsRef.push({
            title: this.state.title,
            body: this.state.body,
            public: this.state.public,
            youtube: this.state.youtube,
            image: this.state.image
        });

        this.setState({
            title: '',
            body: '', 
            youtube: '', 
            image: '',
            public: false
        })
        // display notification alerting that post was successful
    }

    onSubmit() {
        var selectedFile = document.getElementById('input').files[0];
        this.storageRef.put(selectedFile).then(function(snapshot) {
            console.log('Uploaded a file!');
        });
        this.createPost();
    }


    render() {
        return (
            <div className = "post-form">
                <Row className = "form"  >
                    <Input  s={12} label="Post Title" value={this.state.title} onChange={this.onTextChange.bind(this)} id="title" />
                    <Input type="textarea" s={12} label="Post Body" value = {this.state.body} onChange={this.onTextChange.bind(this)} id="body" />
                    <Input  s={12} label="YouTube Video Link" value = {this.state.youtube} onChange={this.onTextChange.bind(this)} id="youtube" />
                    <Input s = {10} name='public' type='checkbox' label='Make news post public?' onChange={this.onTextChange.bind(this)} id="public" />
                    <Button s = {2} waves='light'  onClick={(e) => {  this.onSubmit() } } >Submit</Button>
                    <Input s={12} type="file" id="input" onChange = {this.onTextChange.bind(this)} />
                </Row>
            </div>
        );
    }
}

export default Template;