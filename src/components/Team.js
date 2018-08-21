import React, { Component } from 'react';
import * as firebase from 'firebase';


class team extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            team: []
        }

    this.teamsRef = firebase.database().ref('teams');
    }

componentDidMount() {
    this.teamsRef.child(this.props.match.params.id).on('child_added', snapshot => {
        const newTeam = snapshot.val();
        team.key = snapshot.key;
        this.setState({ team: this.state.team.concat(newTeam) });
    });
  }
    
    render() {
        return (
            <div className = 'team-div'>
                <div className = "team-header">
                    <h1 className = "teams-header">Players</h1>
                </div>
                    <div className = "player-card">
                    <img className = "player-image" src = {this.state.team[0] ? this.state.team[0].image : ''} />
                        <div className = "player-info">
                          <h2 className = "team-card-name">{this.state.team[0] ? this.state.team[0].name : ''}</h2>
                          <h3 className = "team-card-role">{this.state.team[0] ? this.state.team[0].role : ''}</h3>
                       </div>
                    </div>
                       <div className = "player-card">
                    <img className = "player-image" src = {this.state.team[1] ? this.state.team[1].image : ''} />
                        <div className = "player-info">
                          <h2 className = "team-card-name">{this.state.team[1] ? this.state.team[1].name : ''}</h2>
                          <h3 className = "team-card-role">{this.state.team[1] ? this.state.team[1].role : ''}</h3>
                       </div>
                    </div>
                       <div className = "player-card">
                    <img className = "player-image" src = {this.state.team[2] ? this.state.team[2].image : ''} />
                        <div className = "player-info">
                          <h2 className = "team-card-name">{this.state.team[2] ? this.state.team[2].name : ''}</h2>
                          <h3 className = "team-card-role">{this.state.team[2] ? this.state.team[2].role : ''}</h3>
                       </div>
                    </div>
                       <div className = "player-card">
                    <img className = "player-image" src = {this.state.team[3] ? this.state.team[3].image : ''} />
                        <div className = "player-info">
                          <h2 className = "team-card-name">{this.state.team[3] ? this.state.team[3].name : ''}</h2>
                          <h3 className = "team-card-role">{this.state.team[3] ? this.state.team[3].role : ''}</h3>
                       </div>
                    </div>
                       <div className = "player-card">
                    <img className = "player-image" src = {this.state.team[4] ? this.state.team[4].image : ''} />
                        <div className = "player-info">
                          <h2 className = "team-card-name">{this.state.team[4] ? this.state.team[4].name : ''}</h2>
                          <h3 className = "team-card-role">{this.state.team[4] ? this.state.team[4].role : ''}</h3>
                       </div>
                    </div>
                </div>
        );
    }
}

export default team;