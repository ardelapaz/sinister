import React, { Component } from 'react';
import * as firebase from 'firebase';
import Input from 'react-materialize';


class PlayerForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            role: '',
            image: '',
            id: 0
        }

        this.storage = firebase.storage().ref();
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
    
    render() {
        return (
            <div>
                <Input  s={12} label="Player name" value={this.state.name} onChange={this.handleChange.bind(this)} id="name" />
                <Input  s={12} label="Role" value={this.state.role} onChange={this.handleChange.bind(this)}  id="role" />
                <Input  s={12} type="file" id="file" onChange = {this.handleChange.bind(this)} />
            </div>
        );
    }
}

export default PlayerForm;