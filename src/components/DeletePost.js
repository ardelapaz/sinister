import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap';

class EditPost extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: [],
            selectedPostKey: ''
        }
        this.postsRef = firebase.database().ref('news');
        this.selectedpost = this.selectedpost.bind(this);
    }

    componentDidMount() {
        this.postsRef.on('child_added', snapshot => {
            const post = snapshot.val();
            post.key = snapshot.key;
            this.setState({ posts: this.state.posts.concat(post) });
        });
    }

    selectedpost(e) {
        const that = this;
        this.state.posts.map((post) => {
            if(post.title === e.target.value) {
                 that.setState({ selectedPostKey: post.key });
            }
        });
    }

    handleSubmit(e) {
        this.postsRef.child(this.state.selectedPostKey).remove().then(function() {

        }).catch(function(error){
            //error
        });
    }

    render() {
        let post;
        if (this.state.selectedPostKey != '' ) {
            post = <FormGroup>
            <Col>
                <Button type="submit" onClick={this.handleSubmit.bind(this)}>Delete post</Button>
            </Col>
        </FormGroup>
        }
        return (
                <form>
                <FormGroup controlId="formControlsSelect">
                     <ControlLabel>Select a post to delete</ControlLabel>
                     <FormControl componentClass="select" placeholder="Select a post" onChange = {this.selectedpost} defaultValue="Select a post">
                     <option value="Select a post">--</option>
                     {this.state.posts.map((post) => {
                         return(
                            <option value={post.title}>{post.title}</option>
                         )
                     })}
                    </FormControl>
                 </FormGroup>
                 {post}
            </form> 
        )
    }
}
export default EditPost;