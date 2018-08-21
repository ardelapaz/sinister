import React, { Component } from 'react';
import News from '../components/News';
import Teams from '../components/Teams';


class Landing extends Component {
    render() {
        return (
            <div>
                <div>
                  <News />
                </div>
                <div>
                   <Teams />
                </div>
            </div>
        );
    }
}

export default Landing;