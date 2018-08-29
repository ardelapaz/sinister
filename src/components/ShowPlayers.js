import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class ShowPlayers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [],
            selectedplayer: '',
            selectedPlayerKey: ''
        }
        this.array1 = [];
        this.teamsRef = firebase.database().ref('teams');
    }
    componentDidMount() {
        const that = this;
        this.teamsRef.child(this.props.teamKey).on('child_added', snapshot => {
            const player = snapshot.val();
            if (player.name) {
                that.array1.push(player);
                that.setState({ players: that.state.players.concat(player) });
            }
        })
    }

    selectedPlayer(e) {
        const that = this;
        this.array1.map((player) => {
            if(player.name === e.target.value) {
                 that.setState({ selectedPlayerKey: player.key });
                 that.newKey = player.key;
            }
        });
        this.setState({ selectedPlayer: e.target.value });
    }

    render() {
        return(
            <form>
                <FormGroup controlId="formControlsSelect">
                     <ControlLabel>Select a player</ControlLabel>
                     <FormControl componentClass="select" placeholder="Select a player" onChange = {this.selectedPlayer.bind(this)} defaultValue="Select a player">
                     <option value="Select a player">--</option>
                     {this.array1.map((player) => {
                         return(
                            <option value={player.name}>{player.name}</option>
                         )
                     })}
                    </FormControl>
                 </FormGroup>
            </form> 
        )
    }
}
export default ShowPlayers;