import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
        <div className = "nav-bar">
              <ul className = "nav-link-box">
                <li className = "nav-links"><a className = "nav-link" href="/">HOME</a></li>
                <li className = "nav-links"><a className = "nav-link" href="/news">NEWS</a></li>
                <li className = "nav-links"><a className = "nav-link" href="/teams">TEAMS</a></li>
              </ul>
              { /* <a href="/">
                <img className = "logo" src = "../sin6.png" alt = "Team SiNister" onClick = {this.handleClick} />
        </a> */ }
              <ul className = "nav-link-box">
                <li className = "nav-links"><a className = "nav-link" href="https://metathreads.com/">STORE</a></li>
                <li className = "nav-links"><a className = "nav-link" href="https://www.twitch.tv/team/teamsinister">STREAMERS</a></li>
                <li className = "nav-links"><a className = "nav-link" href="/contact">CONTACT US</a></li>
             </ul>
          </div>
        );
    }
}

export default Header;