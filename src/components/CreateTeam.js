import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Row, Input, Button } from 'react-materialize';
import PlayerForm from '../components/PlayerForm';

class CreateTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [], 
            teamName: '',
            team: '',
            showForm: false
        };

        this.teamsRef = firebase.database().ref('teams');
        this.storage = firebase.storage().ref();

    }

    componentDidMount() {
        this.teamsRef.on('value', snapshot => {
            const team = snapshot.val();
            team.key = snapshot.key;
            this.setState({ team: team });
        });
    }

    handleChange(e) {
        this.setState({ teamName: e.target.value });
    }

    handleSubmit() {
        if(this.state.teamName != '') {
            this.teamsRef.push({
                teamName: this.state.teamName
            });
            this.setState({ teamName: '' });
        }
    }

    addPlayers() {
        this.setState({ showForm: true });
    }
    
    removePlayers() {
        this.setState({ players: this.state.players.pop(), length: (this.state.length-1) });
    }

    render() {
        let render;
        if (this.state.showForm) {
            render = <PlayerForm key = {this.state.team.key}/>
        }
        return (
            <div className = "post-form">
                <Row className = "form"  >
                    <h2>{this.state.players.length}</h2>
                    <Input  s={8} label="Team name" value={this.state.teamName} onChange={this.handleChange.bind(this)} onSubmit = {this.handleSubmit.bind(this)} id="teamName" />
                    <Button s = {5} class = "btn waves-effect waves-light"  onClick={(e) => {  this.handleSubmit() } } >Submit</Button>
                    {render}
                    <Button floating large className='red' waves='light' icon='add' onClick = {this.addPlayers.bind(this)} /> Add or remove player
                    <Button floating large className='red' waves='light' icon='remove' onClick = {this.removePlayers.bind(this)} />                </Row>
            </div>
        );
    }
}

export default CreateTeam;