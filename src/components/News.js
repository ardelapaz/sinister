import React, { Component } from 'react';
import * as firebase from 'firebase';
import Post from '../components/Post';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            post: ''
        };
        this.newsRef = firebase.database().ref('news');
        this.createPost = this.createPost.bind(this);
    }

    componentDidMount() {
        

    }

    createPost() {
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
            <div className = "news">
                <Post/>

            </div>

        );
    }
}

export default News;