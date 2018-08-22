import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Row, Input, Button } from 'react-materialize';
import update from 'immutability-helper';

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
        const className = e.target.className;
        const value = e.target.value;
        const id = e.target.id;
        const type = e.target.type;

        
        const player = this.state.players[id];
            if(player) {
                switch(className) {
                    case("name" + id):
                        player.name = value;
                        this.forceUpdate();
                    break;
                    case("role" + id):
                        player.role = value;
                        this.forceUpdate();
                    break;
                }
            }
        if (type == 'file') {
            var selectedFile = document.getElementsByClassName("image" + id).files[0];
            var fileName = selectedFile.name;
            player.image = fileName;
            this.storageRef = firebase.storage().ref(fileName);
        }
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
            var selectedFile = document.getElementById(player).files[counter];
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

    render() {
        return (
            <div className = "post-form">
                <Row className = "form"  >
                    <h2>{this.state.players.length}</h2>
                    <Input  s={12} label="Team name" value={this.state.teamName} onChange={this.onTextChange.bind(this)} id="teamName" />
                    <Button floating large className='red' waves='light' icon='add' onClick = {this.addPlayers.bind(this)} /> Add or remove players
                    <Button floating large className='red' waves='light' icon='remove' onClick = {this.removePlayers.bind(this)} />
                    { this.state.players.map((player, id) => {
                        return(
                            <div>
                                <Input  s={12} label="Player name" value={this.state.players[id].name} onChange={this.onTextChange.bind(this)} className={"name" + player.id} id={player.id} />
                                <Input  s={12} label="Role" value={this.state.players[id].role} onChange={this.onTextChange.bind(this)} className={"role" + player.id} id={player.id} />
                                <Input  s={12} type="file" className={"image" + player.id} id={player.id} onChange = {this.onTextChange.bind(this)} />
                            </div>
                        )
                    })
                    }
                    <Button s = {2} waves='light'  onClick={(e) => {  this.onSubmit() } } >Submit</Button>
                </Row>
            </div>
        );
    }
}

export default CreateTeam;