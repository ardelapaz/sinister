import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import './App.css';
import { Carousel } from 'react-materialize';
import Header from './components/Header';
import Social from './components/Social';
import Login from './components/Login';
import Sponsor from './components/Sponsors';

const images = [
  '../images/sin2.png',
  '../images/sin2.png'
];



class App extends Component {


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
            <Sponsor/>
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
      </div>
    );
  }
}

export default App;
