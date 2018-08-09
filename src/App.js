import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import './App.css';
import { Carousel } from 'react-materialize';
import Header from './components/Header';
import Social from './components/Social';
import Login from './components/Login';
import Sponsor from './components/Sponsors';
import Teams from './components/Teams';
import Contact from './components/Contact';
import News from './components/News';
import { Footer } from 'react-materialize';
import Template from './components/Template';
import Post from './components/Post';
import NewsList from './components/NewsList';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      users: []
    }
  }

  newPost(post) {
    if (!post) {
      this.setState = ({ posts: this.state.posts.concat(post) });
      console.log(this.state.posts);
    console.log("above is the current state");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className = "header">
            <Social/>
            <Login/>
          </div>
           <Header />
        </header>
          <main>
            { /* <div className ="hero">
              <img src="../images/hero.jpg" className = "post-image" />
    </div> */ }
            <Sponsor/>
            {/* <NewsList component = { Template } /> */}
            <Template posts = { this.state.posts } parentMethod = { this.newPost } />
            { /* <Route exact path="/" component = { } /> */ }
            <Route path="/teams" component = { Teams } />
            <Route path="/news" render={(props) => <NewsList {...props } posts = {this.state.posts} /> } />
            <Route path="/contact_us" component = { Contact } />
            <div className = "news">
              
            </div>
         </main>


          { /* <Slide images = {images} className = "slide-images page-center"/>
            <Carousel images={[
                <iframe width="560" height="315" src="https://www.youtube.com/embed/oaDDXCmZE8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>,
                <iframe width="560" height="315" src="https://www.youtube.com/embed/oaDDXCmZE8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>,
                <iframe width="560" height="315" src="https://www.youtube.com/embed/oaDDXCmZE8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>,
                <iframe width="560" height="315" src="https://www.youtube.com/embed/oaDDXCmZE8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>,
                <iframe width="560" height="315" src="https://www.youtube.com/embed/oaDDXCmZE8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>,
                <iframe width="560" height="315" src="https://www.youtube.com/embed/oaDDXCmZE8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

            ]} />

            <div className = "twitter">
              <a className="twitter-timeline" data-width="800" data-height="600" data-theme="dark" data-link-color="#d60000" href="https://twitter.com/TeamSiNisterGG?ref_src=twsrc%5Etfw">Tweets by TeamSiNisterGG</a>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/oaDDXCmZE8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          */ }

          <Footer copyrights="&copy 2015 Copyright Text"
              links={
               <ul>
                 <li><a className="grey-text text-lighten-3" href="/">Home</a></li>
                 <li><a className="grey-text text-lighten-3" href="/news">News</a></li>
                 <li><a className="grey-text text-lighten-3" href="/team">Team</a></li>
                 <li><a className="grey-text text-lighten-3" href="/contact">Contact Us</a></li>
               </ul>
             }
             className='footer-color'
              >
                <img src="../images/teamsinister.png" className = "footer-picture"/>
            </Footer>;
      </div>
    );
  }
}

export default App;
