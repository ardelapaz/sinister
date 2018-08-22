import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Row, Input, Button } from 'react-materialize';
import update from 'immutability-helper';
import PlayerForm from './PlayerForm';

class CreateTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [], 
            length: 0,
            teamName: ''
        };

        this.teamsRef = firebase.database().ref('teams');
        this.createTeam = this.createTeam.bind(this);
        this.storage = firebase.storage().ref();

    }

    onTextChange(e) {
        const value = e.target.value;
        
        this.setState({ teamName: value });
    }

    matchingId(id) {
        return id;
    }

    createTeam() {
        var teamsRef = this.state.teamsRef;
        teamsRef.push({
            team: this.state.teamName
        }).then((team) => {
            var newTeamRef = teamsRef.child(team);
            this.state.players.map((player) => {
                newTeamRef.push({
                    name: player.name,
                    role: player.role,
                    image: player.image
                });
            });
            })


        // display notification alerting that team creation was successful
    }

    onSubmit() {
        this.state.players.map((player, id) => {
            var counter = 0;
            var selectedFile = player.image;
            const that = this;
            this.storageRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a file!');
                that.storage.child(snapshot.metadata.name).getDownloadURL().then((url) => {
                    var selectedPlayer = that.state.players[id].image;
                    that.setState({ selectedPlayer: url });
                    counter++;
                });
            });
        }), function() {
        this.createTeam();
        };
    }

    addPlayers() {
        const player = {'name': '', 'role': '', 'image': '', 'id': this.state.length};
        this.setState({ players: this.state.players.concat(player), length: (this.state.length+1) });
    }
    
    removePlayers() {
        this.setState({ players: this.state.players.pop(), length: (this.state.length-1) });
    }

    renderPlayers() {
        for(var i = 0; i < this.state.players.length; i++) {
            return <PlayerForm />
        }
    }
    render() {
        return (
            <div className = "post-form">
                <Row className = "form"  >
                    <h2>{this.state.players.length}</h2>
                    <Input  s={12} label="Team name" value={this.state.teamName} onChange={this.onTextChange.bind(this)} id="teamName" />
                    <Button floating large className='red' waves='light' icon='add' onClick = {this.addPlayers.bind(this)} /> Add or remove players
                    <Button floating large className='red' waves='light' icon='remove' onClick = {this.removePlayers.bind(this)} />
                    {this.renderPlayers()}
                    <Button s = {2} waves='light'  onClick={(e) => {  this.onSubmit() } } >Submit</Button>
                </Row>
            </div>
        );
    }
}

export default CreateTeam;