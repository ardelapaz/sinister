import React, { Component } from 'react';
import Social from '../components/Social';
import '../App.css';
import * as firebase from 'firebase';

class Post extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          open: false,
          post: ''
        };
        this.newsRef = firebase.database().ref('news'); 
        
        
        const post = this.newsRef.child(this.props.match.params.id).once('value').then((snap) => {
            const newsPost = snap.val();
            this.setState({ post: newsPost});
        });
      }
      
    render () {
        console.log(this.state.post);
        return (
            <div className = "content">
                <div class="one">
                    <div className = "nested">
                        <img className = 'post-image' src={this.state.post.image}/>
                        <h1 className = "post-title">{this.state.post.title}</h1>
                        <p className = "post-text">{this.state.post.body}
                    </p>
                    {this.state.post.youtube != '' &&
                    <div className = "post-video">
                        <iframe width="582.81" height="315" src={this.state.post.youtube} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                    }
                        <h3 className = "post-ending">Like what you see? Be sure to leave a like and comment on the video!</h3>
                        <h3 className = "post-ending">Never want to miss another video? Be sure to subscribe and turn on notifications!</h3>
                    </div>
                </div>
		        <div class="two">
                    <div className = "post-sidebar">
                        <div class = "social-sidebar">
                            <h2 className = "follow-social">Follow us on social media</h2>
                            <Social />
                        </div>
                        <a className="twitter-timeline" data-width="800" data-height="600" data-theme="dark" data-link-color="#d60000" href="https://twitter.com/TeamSiNisterGG?ref_src=twsrc%5Etfw">Tweets by TeamSiNisterGG</a>
                    </div>
                </div>
            </div>

        );
    }
}

export default Post;