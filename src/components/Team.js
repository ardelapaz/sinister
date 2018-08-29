import React, { Component } from 'react';
import * as firebase from 'firebase';


class team extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            players: [],
            teamKey: ''
        }
        this.array1 = [];

    this.teamsRef = firebase.database().ref('teams');
    }

componentDidMount() {
    const that = this;
    if(this.props.player != null && this.props.match === undefined) {
        this.setState({ teamKey: this.props.player });
       this.teamsRef.child(this.props.player).on('child_added', snapshot => {
           const newPlayer = snapshot.val();
           this.array1.push(newPlayer);
           if (newPlayer.name) {
               that.setState({ players: that.state.players.concat(newPlayer) });
           }
       })
    }
    else if (this.props.match != undefined && this.props.player == undefined) {
        this.teamsRef.child(this.props.match.params.id).on('child_added', snapshot => {
            const newplayer = snapshot.val();
            if(newplayer.name) {
                this.array1.push(newplayer);
            }
            this.setState({ players: this.state.players.concat(newplayer) });
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const that = this;
    if(nextProps.player != this.state.teamKey && nextProps.player != null) {
        this.array1 = [];
        this.setState({ teamKey: nextProps.player });
        console.log(nextProps);
        this.teamsRef.child(nextProps.player).on('child_added', snapshot => {
            const newPlayer = snapshot.val();
            that.array1.push(newPlayer);
            if (newPlayer.name) {
                that.setState({ players: that.state.players.concat(newPlayer) });
            }
        })
     }
  }
  
    
    render() {
        return (
            <div className = 'team-div'>
                <div className = "team-header">
                    <h1 className = "teams-header">Players</h1>
                </div>
                {
                    this.array1.map((player) => {
                        if(player.name) {
                        return (
                            <div className = "player-card">
                                <img className = "player-image" src = {player ? player.image : ''} />
                                    <div className = "player-info">
                                    <h2 className = "player-card-name">{player ? player.name : ''}</h2>
                                    <h3 className = "player-card-role">{player ? player.role : ''}</h3>
                                </div>
                             </div>
                        )
                    }
                    })
                }
                </div>
        );
    }
}

export default team;