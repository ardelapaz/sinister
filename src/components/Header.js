import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
        <div className = "nav-bar">
              <ul className = "nav-link-box">
                <li className = "nav-links"><a className = "nav-link" href="#">HOME</a></li>
                <li className = "nav-links"><a className = "nav-link" href="#">NEWS</a></li>
                <li className = "nav-links"><a className = "nav-link" href="#">TEAMS</a></li>
              </ul>
              <a href="#">
                <img className = "logo" src = "../sin6.png" alt = "Team SiNister" onClick = {this.handleClick} />
              </a>
              <ul className = "nav-link-box">
                <li className = "nav-links"><a className = "nav-link" href="#">STORE</a></li>
                <li className = "nav-links"><a className = "nav-link" href="#">STREAMERS</a></li>
                <li className = "nav-links"><a className = "nav-link" href="#">CONTACT US</a></li>
             </ul>
          </div>
        );
    }
}

export default Header;