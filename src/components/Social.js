import React, { Component } from 'react';

class Social extends Component {
    render() {
        return (
          <div className = "middle-header">
          <a href="https://www.facebook.com/teamsinister/"><img className = "social-media-icons" src = "../favicons/facebook.png" alt = "facebook"
            onMouseOver = "this.src='../favicons/facebook-blue.png';"
            onMouseOut = "this.src='../favicons/facebook.png';" /></a>
          <a href="https://twitter.com/TeamSiNisterGG"><img className = "social-media-icons" src = "../favicons/twitter.png" alt = "twitter" /></a>
          <a href="https://www.youtube.com/channel/UCg6AySKddP1PYudGG-H8Lzw"><img className = "social-media-icons" src = "../favicons/youtube.png" alt = "youtube" /></a>
          <a href="https://www.twitch.tv/team/teamsinister"><img className = "smaller" src = "../favicons/twitch.png" alt = "twitch" /></a>
             { /*<a href="https://youtube.com/TeamSiNisterGG.com"><img className = "social-media-icons" src = "../images/discord.png" alt = "discord" /></a> */ }
      </div>
        );
    }
}

export default Social;