import React, { Component } from 'react';
import News from '../components/News';
import firebase from '../firebase';
import Social from '../components/Social'
import { Col, Card, CardTitle } from 'react-materialize';

class NewsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }

        this.newsRef = firebase.database().ref('news');
        this.storage = firebase.storage().ref();

    }

    componentDidMount() {
        this.newsRef.on('child_added', snapshot => {
            const post = snapshot.val();
            this.setState({ posts: this.state.posts.concat (post) });
        });
      }

      formatTime(time) {
        const formatted = new Date(time);
        const newTime = String(formatted);
        return newTime;
    }


    render() {
        console.log(this.state.posts);
        return (
                    <div className = "news-list">
                        <div className = "news-list-posts">
                            <h1 className = "news-header-text">News</h1>
                        </div>
                        <div className = "posts">
                         {
                             this.state.posts.map((post, id) => {
                                 console.log(id);
                                 return (
                                    <Col m={7} s={12} class = "dark gray">
                                    <Card horizontal header={<CardTitle image={post.image}></CardTitle>} actions={[<a id = 'read-more' href='#'  >Read More</a>]}>
                                        <a href='#'>
                                            <p>{post.title}</p>
                                        </a>
                                      </Card>
                                  </Col>
                                 )
                            })}
                        </div>
                        <div class="posts-social">
                            <div className = "post-sidebar">
                                <div class = "social-sidebar">
                                    <h2 className = "follow-social">Follow us on social media</h2>
                                        <Social />
                                </div>
                                    <a className="twitter-timeline" data-width="800" data-height="600" data-theme="dark" data-link-color="#d60000" href="https://twitter.com/TeamSiNisterGG?ref_src=twsrc%5Etfw">Tweets by TeamSiNisterGG</a>
                            </div>
                        </div>                        
        </div>)
    }
}

export default NewsList;