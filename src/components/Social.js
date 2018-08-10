import React, { Component } from 'react';

class Social extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facebook: "../favicons/facebook.png",
      twitter: "../favicons/twitter.png",
      youtube: "../favicons/youtube.png",
      twitch: "../favicons/twitch.png"
    }
    
    this.onHover.bind(this);
    this.onUnhover.bind(this);
  }

  onHover(e) {
    const image = e.target.id;
    switch (image) {
      case ('facebook'):
        this.setState({ facebook: "../favicons/facebook-blue.png" });
        break;
      case ('twitter'):
        this.setState({ twitter: "../favicons/twitter-blue.png" });
        break;
      case ('youtube'):
        this.setState({ youtube: "../favicons/youtube-red.png" });
        break;
      case ('twitch'):
        this.setState({ twitch: "../favicons/twitch-purple.png" });
        break;
    }
  }

  onUnhover(e) {
    const image = e.target.id;
    switch (image) {
      case ('facebook'):
        this.setState({ facebook: "../favicons/facebook.png" });
        break;
      case ('twitter'):
        this.setState({ twitter: "../favicons/twitter.png" });
        break;
      case ('youtube'):
        this.setState({ youtube: "../favicons/youtube.png" });
        break;
      case ('twitch'):
        this.setState({ twitch: "../favicons/twitch.png" });
        break;
    }
  }

    render() {
        return (
          <div className = "middle-header">
          <a href="https://www.facebook.com/teamsinister/"> <img className = "social-media-icons" src = {this.state.facebook} onMouseEnter={(e) => this.onHover(e)} onMouseLeave={(e) => this.onUnhover(e)} alt = "facebook" id = "facebook" /> </a>
          <a href="https://twitter.com/TeamSiNisterGG"><img className = "social-media-icons" src = {this.state.twitter} onMouseEnter={(e) => this.onHover(e)} onMouseLeave={(e) => this.onUnhover(e)} alt = "twitter" id = "twitter" /></a>
          <a href="https://www.youtube.com/channel/UCg6AySKddP1PYudGG-H8Lzw"><img className = "social-media-icons" src = {this.state.youtube} onMouseEnter={(e) => this.onHover(e)} onMouseLeave={(e) => this.onUnhover(e)} alt = "youtube" id = "youtube" /></a>
          <a href="https://www.twitch.tv/team/teamsinister"><img className = "smaller" src = {this.state.twitch} onMouseEnter={(e) => this.onHover(e)} onMouseLeave={(e) => this.onUnhover(e)} alt = "twitch"  id = "twitch" /></a>
             { /*<a href="https://youtube.com/TeamSiNisterGG.com"><img className = "social-media-icons" src = "../images/discord.png" alt = "discord" /></a> */ }
      </div>
        );
    }
}

export default Social;