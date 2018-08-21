import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Row, Input, Button } from 'react-materialize';

class CreateTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [], 
            length: 1,
            teamName: ''
        };

        this.newsRef = firebase.database().ref('teams');
        this.createPost = this.createPost.bind(this);
        this.storage = firebase.storage().ref();

    }

    onTextChange(e) {
        const text = e.target.value;
        if (text == "picture") {
            var selectedFile = document.getElementById('picture').files[0];
                var fileName = selectedFile.name;
                this.setState({ image: fileName });
                this.storageRef = firebase.storage().ref(fileName);
        }
        this.setState({ [e.target.id]: e.target.value });

    }

    createPost(url) {
        this.newsRef.push({
            title: this.state.title,
            body: this.state.body,
            public: this.state.public,
            youtube: this.state.youtube,
            image: url,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        });

        this.setState({
            title: '',
            body: '', 
            youtube: '', 
            image: '',
            public: false
        })
        // display notification alerting that post was successful
    }

    onSubmit() {
        var selectedFile = document.getElementById('input').files[0];
        const that = this;
        this.storageRef.put(selectedFile).then((snapshot) => {
            console.log('Uploaded a file!');
            that.storage.child(snapshot.metadata.name).getDownloadURL().then((url) => {
                that.createPost(url);
            });
        });
    }

    addPlayers() {
        var newPlayer = "player" + this.state.length;
        this.setState({ players: this.state.players.concat(newPlayer), length: (this.state.length+1) });
    }
    
    removePlayers() {
        this.setState({ players: this.state.players.pop(), length: (this.state.length-1) });
    }

    render() {
        console.log(this.state.players);
        console.log(this.state.players[0]);
        return (
            <div className = "post-form">
                <Row className = "form"  >
                    <h2>{this.state.players.length}</h2>
                    <Input  s={12} label="Team name" value={this.state.teamName} onChange={this.onTextChange.bind(this)} id="teamName" />
                    <Button floating large className='red' waves='light' icon='add' onClick = {this.addPlayers.bind(this)} /> Add or remove players
                    <Button floating large className='red' waves='light' icon='remove' onClick = {this.removePlayers.bind(this)} />
                    { this.state.players.map((player, id) => {
                        console.log(id);
                        return(
                            <div>
                                <Input  s={12} label="Player name" value={this.state.players[id].name} onChange={this.onTextChange.bind(this)} id={this.state.players[id].name} />
                                <Input  s={12} label="Role" value={this.state.players[id].role} onChange={this.onTextChange.bind(this)} id="role" />
                                <Input s={12} type="file" id="picture" onChange = {this.onTextChange.bind(this)} />
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