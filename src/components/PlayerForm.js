import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Input, Button } from 'react-materialize';


class PlayerForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            role: '',
            image: '',
            key: ''
        }

        this.storage = firebase.storage().ref();
        this.teamRef = firebase.database().ref('teams');
    }

    componentDidMount() {
        this.teamRef.on('child_added', snapshot => {
            this.setState({ key: snapshot.key });
        });
    }


    handleChange(e) {
        const value = e.target.value;
        const id = e.target.id;
        const type = e.target.type;
        
            switch(id) {
                case("name"):
                    this.setState({ name: value });
                    break;
                case("role"):
                    this.setState({ role: value })
                    break;
            }

        if (type == 'file') {
            var selectedFile = document.getElementById(id).files[0];
                var fileName = selectedFile.name;
                this.setState({ image: fileName });
                this.storageRef = firebase.storage().ref(fileName);
        }
    }
    
    handleSubmit() {
        var selectedFile = document.getElementById('input').files[0];
        const that = this;
        this.storageRef.put(selectedFile).then((snapshot) => {
            console.log('Uploaded a file!');
            that.storage.child(snapshot.metadata.name).getDownloadURL().then((url) => {
                that.createTeam(url);
            });
        });
    }

    createTeam(url) {
        this.playerRef.push({
            name: this.state.name,
            role: this.state.role,
            image: url
        })
    }
    
    render() {
        console.log(this.state.key);
        return (
            <div>
                <Input  s={12} label="Player name" value={this.state.name} onChange={this.handleChange.bind(this)} id="name" />
                <Input  s={12} label="Role" value={this.state.role} onChange={this.handleChange.bind(this)}  id="role" />
                <Input  s={12} type="file" id="file" onChange = {this.handleChange.bind(this)} />
                <Button s = {5} class = "btn waves-effect waves-light"  onClick={(e) => {  this.handleSubmit() } } >Submit</Button>
            </div>
        );
    }
}

export default PlayerForm;