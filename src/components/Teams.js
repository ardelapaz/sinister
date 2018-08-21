import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';


class Teams extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            teams: []
        }

    this.teamsRef = firebase.database().ref('teams');
    }

componentDidMount() {
    this.teamsRef.on('child_added', snapshot => {
        const team = snapshot.val();
        team.key = snapshot.key;
        this.setState({ teams: this.state.teams.concat (team) });
    });
  }
    
    render() {
        console.log(this.state.teams);
        return (
            <div className = 'team-div'>
                <div className = "team-header">
                    <h1 className = "teams-header">Teams</h1>
                </div>
                { this.state.teams.map((team) => {
                 console.log(team.key);
                 return (
                <div className = "team">
                    <Link to = {'/teams/' + team.key}> <img className = {"sin-team-img" + team.key} src = "../images/sin-team.png" /> </Link>
                    <img className = {"team-img" + team.key} src="../images/siege.jpg" />
                </div>
                 )
            })}
            </div>
        );
    }
}

export default Teams;