import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            youtube: '',
            image: ''
        };

        this.newsRef = firebase.database().ref('news');
        this.createPost = this.createPost.bind(this);
        this.storage = firebase.storage().ref();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const id = e.target.id;
        const type = e.target.type;

        if (type == 'file') {
            var selectedFile = document.getElementById("post-image").files[0];
                var fileName = selectedFile.name;
                this.setState({ image: fileName });
                this.storageRef = firebase.storage().ref(fileName);
        } else {
            this.setState({ [e.target.id]: value });
        }
    }

    createPost(url) {
        this.newsRef.push({
            title: this.state.title,
            body: this.state.body,
            youtube: this.state.youtube,
            image: url,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        });

        this.setState({
            title: '',
            body: '', 
            youtube: '', 
            image: '',
        })
        // display notification alerting that post was successful
    }

    onSubmit(e) {
        e.preventDefault();
        var selectedFile = document.getElementById("post-image").files[0];
        const that = this;
        this.storageRef.put(selectedFile).then((snapshot) => {
            console.log('Uploaded a file!');
            that.storage.child(snapshot.metadata.name).getDownloadURL().then((url) => {
                that.createPost(url);
            });
        });
    }


    render() {
        return (
            <div className = "post-form">
            <form>
            <ControlLabel>Title</ControlLabel>
            <FormControl
                     type="text"
                     value={this.state.title}
                     placeholder="Enter post title"
                     onChange={this.handleChange}
                     id = "title" className= "form-input"
                   />
                   <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Body</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Enter a post body" onChange = {this.handleChange} id="body" value = {this.state.body}/>
                  </FormGroup>
                  <ControlLabel>Youtube Link </ControlLabel>
                   <FormControl
                     type="text"
                     value={this.state.youtube}
                     placeholder="Enter youtube link (Optional)"
                     onChange={this.handleChange}
                     id = "youtube" className= "form-input"
                   />
                <ControlLabel>Post Image</ControlLabel>
                   <FormControl
                     type="file"
                     placeholder="Enter post preview image"
                     onChange={this.handleChange}
                     id = "post-image" className= "form-input"
                   />
                   <FormGroup>
                        <Col>
                            <Button type="submit" onClick={this.onSubmit.bind(this)}>Create Post</Button>
                        </Col>
                    </FormGroup>
            </form>
                {/* <Row className = "form"  >
                    <Input  s={12} label="Post Title" value={this.state.title} onChange={this.onTextChange.bind(this)} id="title" />
                    <Input type="textarea" s={12} label="Post Body" value = {this.state.body} onChange={this.onTextChange.bind(this)} id="body" />
                    <Input  s={12} label="YouTube Video Link" value = {this.state.youtube} onChange={this.onTextChange.bind(this)} id="youtube" />
                    <Input s = {10} name='public' type='checkbox' label='Make news post public?' onChange={this.onTextChange.bind(this)} id="public" />
                    <Button s = {2} waves='light'  onClick={(e) => {  this.onSubmit() } } >Submit</Button>
                    <Input s={12} type="file" id="input" onChange = {this.onTextChange.bind(this)} />
                </Row> */}
            </div>
        );
    }
}

export default Create;