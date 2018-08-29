import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Team from '../components/Team';
import ShowPlayers from './ShowPlayers';

class EditTeam extends Component {
    constructor(props){
        super(props);

        this.state = {
            teams: [],
            players: [],
            selectedTeamKey: ''
        }
        this.teamsRef = firebase.database().ref('teams');
        this.teams = firebase.database();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.selectedTeam = this.selectedTeam.bind(this);
        this.storage = firebase.storage().ref();
    }
    componentDidMount() {
        this.teamsRef.on('child_added', snapshot => {
            const team = snapshot.val();
            team.key = snapshot.key;
            this.setState({ teams: this.state.teams.concat(team) });
        });
        if(this.state.selectedTeamKey != '') {
            this.teams.ref('teams/' + this.state.selectedTeamKey).on ('child_added', snapshot => {
                const player = snapshot.val();
                if(player.name) {
                    this.setState({ players: this.state.players.concat(player) });
                }
            })
        }
    }

    handleChange() {

    }

    handleSubmit() {

    }
    
    handleEdit() {

    }

    selectedTeam(e) {
        const that = this;
        this.state.teams.map((team) => {
            if(team.teamName === e.target.value) {
                 that.setState({ selectedTeamKey: team.key });
                 that.newKey = team.key;
            }
        });
    }


    render() {
        let team;
        if (this.state.selectedTeamKey != '' ) {
            team = <ShowPlayers teamKey = {this.state.selectedTeamKey} />
        }
        return (
                <form>
                <FormGroup controlId="formControlsSelect">
                     <ControlLabel>Select a team</ControlLabel>
                     <FormControl componentClass="select" placeholder="Select a team" onChange = {this.selectedTeam} defaultValue="Select a team">
                     <option value="Select a team">--</option>
                     {this.state.teams.map((team) => {
                         return(
                            <option value={team.teamName}>{team.teamName}</option>
                         )
                     })}
                    </FormControl>
                 </FormGroup>
                 {team}
            </form> 
        )
    }
}
export default EditTeam;