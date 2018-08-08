import React, { Component } from 'react';
import News from '../components/News';
import firebase from '../firebase';

class NewsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }

        var query = firebase.database().ref("users").orderByKey();
        query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
             // key will be "ada" the first time and "alan" the second time
             var key = childSnapshot.key;
      // childData will be the actual contents of the child
             var childData = childSnapshot.val();
             this.stats.posts.concat(childData);
            });
        });
        console.log(this.state.posts);
    }

      imageUrl() {
          var storage = firebase.storage();
          var pathReference = storage.ref(this.props.image);
      }


    render() {
        return (
                    <div className = "news-list">
                        <div className = "news-header">
                            <h1 className = "news-header-text">News</h1>
                        </div>

                         {
                             this.state.posts.map((post, i) => {
                                <div className="list-1">
                                    <h1>post.title</h1>
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