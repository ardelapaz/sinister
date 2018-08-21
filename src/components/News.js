import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import Social from '../components/Social';
import { Card, CardTitle } from 'react-materialize';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            newPosts: []
        };
        this.newsRef = firebase.database().ref('news');
    }

    componentDidMount() {
        this.newsRef.on('child_added', snapshot => {
            const post = snapshot.val();
            post.key = snapshot.key;
            this.setState({ posts: this.state.posts.concat (post) });
            var recentPosts = this.state.posts.slice((this.state.posts.length - 5));
            this.setState({ newPosts: recentPosts.reverse()});
        });
      }

    //rename this featured news
    render() {
        console.log(this.state.newPosts);
        return (
            <div className = "news">
                <div className = "latest-news">
                    <h1 className = "news-header-text">Latest News</h1>
                </div>

            {
                             this.state.newPosts.map((post, id) => {
                                return (
                                    <div className = {"a" + id}>
                                        <Link to = {'/news/' + post.key}> <img className = 'post-image1' src={post.image}/> </Link>
                                    </div>
                                 )})}
        </div>

        );
    }
}

export default News;