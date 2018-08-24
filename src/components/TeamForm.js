import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button, HelpBlock} from 'react-bootstrap';
import * as firebase from 'firebase';
import PlayerForm from '../components/PlayerForm';

class TeamForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            teamName: '',
            readOnly: '',
            submitted: false,
            newTeamKey: '',
            selectedTeam: ''
        }
        this.teamsRef = firebase.database().ref('teams');
        this.teams = firebase.database().ref();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.selectedTeam = this.selectedTeam.bind(this);
    }

    componentDidMount() {
        if (this.state.submitted === false) {
            this.teamsRef.on('child_added', snapshot => {
                this.setState({newTeamKey: snapshot.key });
            });
        }
        this.teamsRef.on('child_added', snapshot => {
            const team = snapshot.val();
            team.key = snapshot.key;
            this.setState({ teams: this.state.teams.concat (team) });
        });
    }

    handleChange(e) {
        this.setState({ teamName: e.target.value });
    }
    getValidationState() {
        const length = this.state.teamName.length;
        if (length > 5) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
      }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.submitted == false) {
            this.teamsRef.push({
                teamName: this.state.teamName
            });
            this.setState({ readOnly: 'readOnly', submitted: true });
        } else {
            this.teamsRef.child(this.state.newTeamKey).update({ teamName: this.state.teamName });
            this.setState({ readOnly: 'readOnly' });
        }
    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({ readOnly: '' });
    }

    selectedTeam(e) {
        this.setState({ selectedTeam: e.target.value });
    }

    returnTeamKey() {
        return this.state.newTeamKey
    }

    render() {
        let player;
        if (this.state.submitted === true) {
            console.log(this.state.newTeamKey);
            const key = this.state.newTeamKey;
            player = <PlayerForm key = {this.returnTeamKey.bind(this)} />
        }
        console.log(this.state.selectedTeam);
        let button;
        if (this.state.readOnly === '') {
            button = <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="submit" onClick={this.handleSubmit}>Create Team</Button>
                </Col>
            </FormGroup>
        } else {
            button = <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit" onClick={this.handleEdit}>Edit team name</Button>
            </Col>
            </FormGroup>
        }
        let team;
        if(this.state.selectedTeam == "other") {
            team = <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Create a new team</ControlLabel>
            <FormControl
              type="text"
              readOnly = {this.state.readOnly}
              value={this.state.teamName}
              placeholder="Enter team name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Team name must be longer than 5 characters</HelpBlock>
            {button}
            {player}
          </FormGroup>
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
                      <option value="other">Create a New Team</option>
                    </FormControl>
                 </FormGroup>
                 {team}
                </form> 
        )
    }
}
               
export default TeamForm;