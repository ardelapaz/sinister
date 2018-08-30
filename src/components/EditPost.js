import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            selectedPostKey: null,
            title: '',
            body: '',
            youtube: '',
            image: ''
        }

        this.newsRef = firebase.database().ref('news');
        this.storage = firebase.storage().ref();
        this.selectedPost = this.selectedPost.bind(this);

    }

    componentDidMount() {
        this.newsRef.on('child_added', snapshot => {
            const post = snapshot.val();
            post.key = snapshot.key;
            this.setState({ posts: this.state.posts.concat (post) });
        });
      }
    

    selectedPost(e) {
        const that = this;
        this.state.posts.map((post) => {
            if(post.title === e.target.value) {
                 that.setState({ selectedPostKey: post.key, title: post.title, body: post.body, youtube: post.youtube });
            }
        });
    }

    handleChange(e) {
        const value = e.target.value;
        const type = e.target.type;

        if (type == 'file') {
            var selectedFile = document.getElementById("file").files[0];
                var fileName = selectedFile.name;
                this.setState({ image: fileName });
                this.storageRef = firebase.storage().ref(fileName);
        } else {
            this.setState({ [e.target.id]: value });
        }    
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.image != '') {
            var selectedFile = document.getElementById("file").files[0];
            const that = this;
            this.storageRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a file!');
                that.storage.child(snapshot.metadata.name).getDownloadURL().then((url) => {
                    that.updatePost(url);
                });
            });
        } else {
            this.updatePost();
        }
    }

    updatePost(url) {
        const dbRef = firebase.database().ref('news/' + this.state.selectedPostKey);
        if(url) {
            dbRef.update({
                title: this.state.title,
                body: this.state.body,
                youtube: this.state.youtube,
                image: url
            });
        } else {
            dbRef.update({
                title: this.state.title,
                body: this.state.body,
                youtube: this.state.youtube
            });
        }
    }

    render() {
        let editPost;
        if(this.state.selectedPostKey) {
           editPost = <form>
                <ControlLabel>Edit post details</ControlLabel>
            <FormControl
              type="text"
              id="title"
              value={this.state.title}
              placeholder="Enter post title"
              onChange={this.handleChange.bind(this)}
            />
            <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Body</ControlLabel>
                    <FormControl componentClass="textarea" onChange = {this.handleChange.bind(this)} id="body" value = {this.state.body}/>
                  </FormGroup>
            <FormControl
              type="text"
              id="body"
              value={this.state.youtube}
              placeholder="Enter youtube src link"
              onChange={this.handleChange.bind(this)}
            />
            <ControlLabel>Change post image</ControlLabel>
            <FormControl
                   id="file"
                   type="file"
                   label="File"
                   help="Example block-level help text here."
                   onChange={this.handleChange.bind(this)}
                 />

                 <FormGroup>
                <Col>
                    <Button type="submit" onClick={this.handleSubmit.bind(this)}>Update Post</Button>
                </Col>
            </FormGroup>
            </form>
        }
        return(
            <form>
            <FormGroup controlId="formControlsSelect">
                 <ControlLabel>Select a post</ControlLabel>
                 <FormControl componentClass="select" placeholder="Select a post" onChange = {this.selectedPost} defaultValue="Select a post">
                 <option value="Select a post">--</option>
                 {this.state.posts.map((post) => {
                        return(
                            <option value={post.title}>{post.title}</option>
                         )
                 })}
                </FormControl>
             </FormGroup>
             {editPost}
        </form> 
        )
    }

}
export default EditPost;