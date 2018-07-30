import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import { Carousel } from 'bootstrap';
import './App.css';

const images = [
  '../images/sin2.png',
  '../images/sin2.png'
];

class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class = "header">
            <div class = "middle-header">
              <ul class = "social-media-box">
                <li><a href="https://www.facebook.com/teamsinister/"><img class = "social-media-icons" src = "../images/facebook.png" alt = "discord" /></a></li>
                <li><a href="https://twitter.com/TeamSiNisterGG"><img class = "social-media-icons" src = "../images/twitter.png" alt = "discord" /></a></li>
                <li><a href="https://www.youtube.com/channel/UCg6AySKddP1PYudGG-H8Lzw"><img class = "social-media-icons" src = "../images/youtube.png" alt = "discord" /></a></li>
                <li><a href="https://www.twitch.tv/team/teamsinister"><img class = "social-media-icons" src = "../images/twitch.png" alt = "discord" /></a></li>
                <li><a href="https://youtube.com/TeamSiNisterGG.com"><img class = "social-media-icons" src = "../images/discord.png" alt = "discord" /></a></li>
              </ul>
              <div class = "login-box">
               <a class="login" href="login">Log In</a>
                <a class="login" href="login">Register</a>
              </div>
            </div>
          </div>
           <div class = "nav-bar">
            <div class = "nav-left">
              <ul class = "nav-link-box">
                <li class = "nav-links"><a href="#">HOME</a></li>
                <li class = "nav-links"><a href="#">NEWS</a></li>
                <li class = "nav-links"><a href="#">TEAMS</a></li>
              </ul>
            </div>
              <div class = "logo">
              <a href="test">
                <img class = "logo" src = "../images/teamsinister.png" alt = "Team SiNister" onClick = {this.handleClick} />
              </a>
            </div>
            <div class = "nav-right">
              <ul class = "nav-link-box">
                <li class = "nav-links"><a href="#">STORE</a></li>
                <li class = "nav-links"><a href="#">STREAMERS</a></li>
                <li class = "nav-links"><a href="#">CONTACT US</a></li>
             </ul>
            </div>
          </div>
        </header>
         <main>
         <div class = "s-box">
            <li class = "sponsor"><img class = "sponsors" src = "../images/zowie.png" alt = "Zowie" id = "zowie" /></li>
            <li class = "sponsor"><img class = "sponsors" src = "../images/Sponsors/gg1.png" alt = "GGsups" id = "gg"/></li>
            <li class = "sponsor"><img class = "sponsors" src = "../images/Sponsors/KF3.png" alt = "KontrolFreek" id = "kf" /></li>
          </div>
           <Slide images = {images} class = "slide-images"/>
            <div class = "twitter">
              <a class="twitter-timeline" data-width="800" data-height="600" data-theme="dark" data-link-color="#d60000" href="https://twitter.com/TeamSiNisterGG?ref_src=twsrc%5Etfw">Tweets by TeamSiNisterGG</a>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/oaDDXCmZE8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
         </main>
      </div>
    );
  }
}

export default App;
