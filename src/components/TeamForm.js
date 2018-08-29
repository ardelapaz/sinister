import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button, HelpBlock} from 'react-bootstrap';
import * as firebase from 'firebase';
import PlayerForm from '../components/PlayerForm';
import Team from '../components/Team';

class TeamForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            teamName: '',
            readOnly: '',
            submitted: false,
            newTeamKey: '',
            selectedTeam: 'Select a team', 
            teamImage: '',
            players: [],
            selectedTeamKey: ''
        }
        this.teamsRef = firebase.database().ref('teams');
        this.teams = firebase.database().ref();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.selectedTeam = this.selectedTeam.bind(this);
        this.storage = firebase.storage().ref();

    }

    componentDidMount() {
        if(this.state.submitted === true) {
            this.newTeamRef = firebase.database.ref('teams/' + this.state.newTeamKey);
        }
        if (this.state.submitted === false) {
            this.teamsRef.on('child_added', snapshot => {
                this.setState({newTeamKey: snapshot.key });
            });
        }
        if(this.newTeamRef) {
            this.newTeamRef.on('child_added', snapshot => {
                const newPlayer = snapshot.val();
                this.setState({ players: this.state.players.concat(newPlayer) });
            });
        }
        this.teamsRef.on('child_added', snapshot => {
            const team = snapshot.val();
            team.key = snapshot.key;
            this.setState({ teams: this.state.teams.concat (team) });
        });
    }

    handleChange(e) {
        const value = e.target.value;
        const id = e.target.id;
        const type = e.target.type;
        console.log(id);

        if (type == 'file') {
            var selectedFile = document.getElementById("file").files[0];
                var fileName = selectedFile.name;
                this.setState({ image: fileName });
                this.storageRef = firebase.storage().ref(fileName);
        } else {
            this.setState({ teamName: value });
        }    
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
            var selectedFile = document.getElementById("file").files[0];
            const that = this;
            this.storageRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a file!');
                that.storage.child(snapshot.metadata.name).getDownloadURL().then((url) => {
                    that.createTeam(url);
                });
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
        const that = this;
        this.state.teams.map((team) => {
            if(team.teamName === e.target.value) {
                 that.setState({ selectedTeamKey: team.key });
                 that.newKey = team.key;
                 console.log(team.key);
            }
        });
        this.setState({ selectedTeam: e.target.value });
        if (e.target.value === "other") {
        }
    }

    createTeam(url) {
        this.teamsRef.push({
            teamName: this.state.teamName,
            teamImage: url
        });
        this.setState({ teamImage: '' });
    }



    render() {

        let player;
        if (this.state.submitted === true) {
            player = <PlayerForm key1 = {this.state.newTeamKey} />
        }
        let button;
        if (this.state.readOnly === '') {
            button = <FormGroup>
                <Col>
                    <Button type="submit" onClick={this.handleSubmit}>Create Team</Button>
                </Col>
            </FormGroup>
        } else {
            button = <FormGroup>
            <Col>
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
            <FormControl
                   id="file"
                   type="file"
                   label="File"
                   help="Example block-level help text here."
                   onChange={this.handleChange}
                 />
            <HelpBlock>Team name must be longer than 5 characters</HelpBlock>

            {button}
            {player}
          </FormGroup>
        } else if (this.state.selectedTeam != "other" && this.state.selectedTeam != "Select a team") {
            team = <Team player = {this.newKey} />
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