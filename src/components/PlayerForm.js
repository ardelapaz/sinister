import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';


class PlayerForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            role: '',
            image: ''
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
            var selectedFile = document.getElementById("file").files[0];
                var fileName = selectedFile.name;
                this.setState({ image: fileName });
                this.storageRef = firebase.storage().ref(fileName);
        } else {
            this.setState({ [e.target.id]: e.target.value });
        }
    }
    
    onSubmit() {
        var selectedFile = document.getElementById("file").files[0];
        const that = this;
        this.storageRef.put(selectedFile).then((snapshot) => {
            console.log('Uploaded a file!');
            that.storage.child(snapshot.metadata.name).getDownloadURL().then((url) => {
                that.createTeam(url);
            });
        });
    }

    createTeam() {
        this.playerRef = firebase.database().ref('teams/' + this.props.key());
        this.playerRef.push({
            name: this.state.name,
            role: this.state.role,
            image: this.state.image
        })
    }

    
    render() {
        console.log(this.props.key);
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
                   id="file"
                   type="file"
                   label="File"
                   help="Example block-level help text here."
                   onChange={this.handleChange}
                 />
                   <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" onClick={this.createTeam }>Create Player</Button>
                        </Col>
                    </FormGroup>
                </form>




                {/* <Input  s={12} label="Player name" value={this.state.name} onChange={this.handleChange.bind(this)} id="name" />
                <Input  s={12} label="Role" value={this.state.role} onChange={this.handleChange.bind(this)}  id="role" />
                <Input  s={12} type="file" id="file" onChange = {this.handleChange.bind(this)} />
                <Button s = {5} class = "btn waves-effect waves-light"  onClick={(e) => {  this.handleSubmit() } } >Submit</Button> */}
            </div>
        );
    }
}

export default PlayerForm;