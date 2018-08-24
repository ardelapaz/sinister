import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button, HelpBlock} from 'react-bootstrap';
import * as firebase from 'firebase';

class TeamForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamName: '',
            readOnly: '',
            submitted: false,
            newTeamKey: ''
        }
        this.teamsRef = firebase.database().ref('teams');
        this.teams = firebase.database().ref();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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
        const newTeamKey = this.teams.child('teams').push().key;
        if (this.state.submitted == false) {
            console.log('testing');
            this.teamsRef.push({
                teamName: this.state.teamName
            });
            this.setState({ readOnly: 'readOnly', submitted: true, newTeamKey: newTeamKey });
        } else if (this.state.newTeamKey != '') {
            console.log('teams/' + this.state.newTeamKey);
            // var editTeam = firebase.database().ref('teams/' + this.state.newTeamKey);
            // editTeam.update({ teamName: this.state.teamName });
            this.teamsRef.child(this.state.newTeamKey).update({ teamName: this.state.teamName });
            this.setState({ readOnly: 'readOnly' });
        }
    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({ readOnly: '' });
    }

    render() {
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
        return (
            <form>
                 <FormGroup
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
                 </FormGroup>
                </form> 
        )
    }
}
               
export default TeamForm;