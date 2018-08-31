import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap';

class EditTeam extends Component {
    constructor(props){
        super(props);

        this.state = {
            teams: [],
            selectedTeamKey: ''
        }
        this.teamsRef = firebase.database().ref('teams');
        this.selectedTeam = this.selectedTeam.bind(this);
    }

    componentDidMount() {
        this.teamsRef.on('child_added', snapshot => {
            const team = snapshot.val();
            team.key = snapshot.key;
            this.setState({ teams: this.state.teams.concat(team) });
        });
    }

    selectedTeam(e) {
        const that = this;
        this.state.teams.map((team) => {
            if(team.teamName === e.target.value) {
                 that.setState({ selectedTeamKey: team.key });
            }
        });
    }

    handleSubmit(e) {
        this.teamsRef.child(this.state.selectedTeamKey).remove().then(function() {

        }).catch(function(error){
            //error
        });
    }

    render() {
        let team;
        if (this.state.selectedTeamKey != '' ) {
            team = <FormGroup>
            <Col>
                <Button type="submit" onClick={this.handleSubmit.bind(this)}>Delete Team</Button>
            </Col>
        </FormGroup>
        }
        return (
                <form>
                <FormGroup controlId="formControlsSelect">
                     <ControlLabel>Select a team to delete</ControlLabel>
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