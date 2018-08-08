import React, { Component } from 'react';
import * as firebase from 'firebase';
import Post from '../components/Post';
import Social from '../components/Social';
import { Card, CardTitle } from 'react-materialize';

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

    routeToPost() {
        console.log('test');
    }

    //rename this featured news
    render() {
        return (
            <div className = "news">
            <div className = "news-header">
                <h1 className = "news-header-text">Latest News</h1>
            </div>
            <div className="onee">
                <img className = 'post-image1' src='' onClick = {this.routeToPost}/>
            </div>
            <div className="twoo">
                <img className = 'post-image1' src='../images/vein.png' onClick = {this.routeToPost}/>
            </div>
            <div className="three">
                <img className = 'post-image1' src='../images/vein.png' onClick = {this.routeToPost}/>>
            </div>
            <div className="four">
                <img className = 'post-image1' src='../images/vein.png' onClick = {this.routeToPost}/>
            </div>
            <div className ="five">
             <img className = 'post-image1' src='../images/vein.png' onClick = {this.routeToPost}/>
            </div>
        </div>

        );
    }
}

export default News;