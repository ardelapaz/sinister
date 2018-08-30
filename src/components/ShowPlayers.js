import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap';

class ShowPlayers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [],
            selectedPlayerKey: '',
            teamKey: '',
            name: '',
            role: '',
            image: ''
        }
        this.array1 = [];
        this.teamsRef = firebase.database().ref('teams');
        this.storage = firebase.storage().ref();
        this.updateTeam.bind(this);
    }
    componentDidMount() {
        const that = this;
        this.teamsRef.child(this.props.teamKey).on('child_added', snapshot => {
            const player = snapshot.val();
            if (player.name) {
                player.key = snapshot.key;
                that.array1.push(player);
                that.setState({ players: that.state.players.concat(player) });
            }
        })
        this.setState({ teamKey: this.props.teamKey });
    }
    componentWillReceiveProps(nextProps) {
        const that = this;
        if(nextProps.teamKey != this.state.teamKey && nextProps.teamKey != null) {
            this.array1 = [];
            this.setState({ teamKey: nextProps.teamKey });
            this.teamsRef.child(nextProps.teamKey).on('child_added', snapshot => {
                const newPlayer = snapshot.val();
                that.array1.push(newPlayer);
                if (newPlayer.name) {
                    that.setState({ players: that.state.players.concat(newPlayer) });
                }
            })
         }
      }
    

    selectedPlayer(e) {
        const that = this;
        this.array1.map((player) => {
            if(player.name === e.target.value) {
                console.log(player.key);
                 that.setState({ selectedPlayerKey: player.key, name: player.name, role: player.role });
                 that.newKey = player.key;
            }
        });
    }

    handleChange(e) {
        const value = e.target.value;
        const type = e.target.type;

        if (type == 'file') {
            var selectedFile = document.getElementById("file").files[0];
                var fileName = selectedFile.name;
                this.setState({ image: fileName });
                this.storageRef = firebase.storage().ref(fileName);
        } else {
            this.setState({ [e.target.id]: value });
        }    
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.image != '') {
            var selectedFile = document.getElementById("file").files[0];
            const that = this;
            this.storageRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a file!');
                that.storage.child(snapshot.metadata.name).getDownloadURL().then((url) => {
                    that.updateTeam(url);
                });
            });
        } else {
            this.updateTeam();
        }
    }

    updateTeam(url) {
        if(url) {
            firebase.database().ref('teams/' + this.state.teamKey + "/" + this.state.selectedPlayerKey).update({
                name: this.state.name,
                role: this.state.role,
                image: url
            });
        } else {
            firebase.database().ref('teams/' + this.state.teamKey + "/" + this.state.selectedPlayerKey).update({
                name: this.state.name,
                role: this.state.role
            });
        }
    }

    render() {
        let editPlayer;
        if(this.state.selectedPlayerKey != '' && this.state.selectedPlayerKey != undefined) {
            editPlayer = <form>
                <ControlLabel>Edit player details</ControlLabel>
            <FormControl
              type="text"
              id="name"
              value={this.state.name}
              placeholder="Enter player name"
              onChange={this.handleChange.bind(this)}
            />
            <FormControl
              type="text"
              id="role"
              value={this.state.role}
              placeholder="Enter player role"
              onChange={this.handleChange.bind(this)}
            />
            <ControlLabel>Change player image</ControlLabel>
            <FormControl
                   id="file"
                   type="file"
                   label="File"
                   help="Example block-level help text here."
                   onChange={this.handleChange.bind(this)}
                 />

                 <FormGroup>
                <Col>
                    <Button type="submit" onClick={this.handleSubmit.bind(this)}>Update Player</Button>
                </Col>
            </FormGroup>
            </form>
        }
        return(
            <form>
                <FormGroup controlId="formControlsSelect">
                     <ControlLabel>Select a player</ControlLabel>
                     <FormControl componentClass="select" placeholder="Select a player" onChange = {this.selectedPlayer.bind(this)} defaultValue="Select a player">
                     <option value="Select a player">--</option>
                     {this.array1.map((player) => {
                         if(player.name) {
                            return(
                                <option value={player.name}>{player.name}</option>
                             )
                         }
                     })}
                    </FormControl>
                 </FormGroup>
                 {editPlayer}
            </form> 
        )
    }
}
export default ShowPlayers;