import React, {Component}from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import Create from '../components/Create';
import CreateTeam from '../components/CreateTeam';

class Dashboard extends Component {
    render() {
        return (
            <div className = "dashboard">
                <Collapsible popout defaultActiveKey={2}>
                  <CollapsibleItem header='Create a new news post' icon='whatshot'>
                        <Create/>
                  </CollapsibleItem>
                  <CollapsibleItem header='Create a new team' icon='whatshot'>
                        <CreateTeam />
                  </CollapsibleItem>
                </Collapsible>
            </div>
        )
    }
}

export default Dashboard;