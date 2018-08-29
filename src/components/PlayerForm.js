import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import Team from '../components/Team';

class PlayerForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            role: '',
            image: '',
            newPlayer: '',
            players: []
        }

        this.storage = firebase.storage().ref();
        this.teamRef = firebase.database().ref('teams');
        this.handleChange = this.handleChange.bind(this);
        this.createTeam = this.createTeam.bind(this);
    }


    handleChange(e) {
        const value = e.target.value;
        const id = e.target.id;
        const type = e.target.type;
        console.log(id);

        if (type == 'file') {
            var selectedFile = document.getElementById("player_file").files[0];
                var fileName = selectedFile.name;
                this.setState({ image: fileName });
                this.storageRef = firebase.storage().ref(fileName);
        } else {
            this.setState({ [e.target.id]: e.target.value });
        }
    }
    
    onSubmit(e) {
        e.preventDefault();
        var selectedFile = document.getElementById("player_file").files[0];
        const that = this;
        this.storageRef.put(selectedFile).then((snapshot) => {
            console.log('Uploaded a file!');
            that.storage.child(snapshot.metadata.name).getDownloadURL().then((url) => {
                that.createTeam(url);
            });
        });
    }

    createTeam(url) {
        const that = this;
        this.playerRef = firebase.database().ref('teams/' + this.props.key1);
        this.playerRef.push({
            name: this.state.name,
            role: this.state.role,
            image: url
        }).then(() => {
            this.playerRef.on('child_added', snapshot => {
                const player = snapshot.val();
                if(player.name) {
                    that.setState({ players: that.state.players.concat(player), newPlayer: player });
                }
            })
            this.setState({ name: '', role: '', image: '' });
        });
    }

    
    render() {
        let players;
        if(this.state.newPlayer) {
            console.log('players is initiated');
            players = <Team player = {this.props.key1} />
        }
        return (
            <div>
                <form>
                <FormControl
                     type="text"
                     readOnly = {this.state.readOnly}
                     value={this.state.name}
                     placeholder="Enter player name"
                     onChange={this.handleChange}
                     id = "name"
                   />
                    <FormControl
                     type="text"
                     readOnly = {this.state.readOnly}
                     value={this.state.role}
                     placeholder="Enter player role"
                     onChange={this.handleChange}
                     id = "role"
                   />
                   <FormControl
                   id="player_file"
                   type="file"
                   label="File"
                   help="Example block-level help text here."
                   onChange={this.handleChange}
                 />
                   <FormGroup>
                        <Col>
                            <Button type="submit" onClick={this.onSubmit.bind(this)}>Create Player</Button>
                        </Col>
                    </FormGroup>
                </form>
                {players}


                {/* <Input  s={12} label="Player name" value={this.state.name} onChange={this.handleChange.bind(this)} id="name" />
                <Input  s={12} label="Role" value={this.state.role} onChange={this.handleChange.bind(this)}  id="role" />
                <Input  s={12} type="file" id="file" onChange = {this.handleChange.bind(this)} />
                <Button s = {5} class = "btn waves-effect waves-light"  onClick={(e) => {  this.handleSubmit() } } >Submit</Button> */}
            </div>
        );
    }
}

export default PlayerForm;