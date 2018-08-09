import React, { Component } from 'react';
import News from '../components/News';
import firebase from '../firebase';

class NewsList extends Component {
    constructor(props) {
        super(props);
    }

      imageUrl() {
          var storage = firebase.storage();
          var pathReference = storage.ref(this.props.image);
      }


    render() {
        console.log(this.props.posts);
        return (
                    <div className = "news-list">
                        <div className = "news-header">
                            <h1 className = "news-header-text">News</h1>
                        </div>

                         {
                             this.props.posts.map((post, index) => {
                                <div className="list-1">
                                    <h1>{post.title}</h1>
                                </div>
                            })}

                        <div className="list-1">
                            <h1> HELLO</h1>
                        </div>
                        <div className="list-2">
                            <h1> HELLO</h1>
                        </div>
                        <div className="list-3">
                            <h1> HELLO</h1>
                     </div>
                     <div className ="list-4">
                         <h1> HELLO</h1>
                     </div>
                </div>)
    }
}

export default NewsList;