import React, {Component}from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Create from '../components/Create';
import CreateTeam from '../components/CreateTeam';
import EditTeam from '../components/EditTeam';
import EditPost from '../components/EditPost';

class Dashboard extends Component {
    render() {
        return (
            <div className = "dashboard">
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                 <Tab eventKey={1} title="Create a new news post">
                 <Create/>
                </Tab>
                 <Tab eventKey={2} title="Create a new team">
                 <CreateTeam/>
                </Tab>
                <Tab eventKey={3} title="Edit an existing post">
                 <EditPost/>
                </Tab>
                <Tab eventKey={4} title="Edit an existing team">
                 <EditTeam/>
                </Tab>
                </Tabs>;
            </div>
        )
    }
}

export default Dashboard;