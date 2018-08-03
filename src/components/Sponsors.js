import React, { Component } from 'react';

class Sponsor extends Component {
    render() {
        return (
            <div className = "s-box white-bottom">
                <a className = "test" href="https://zowie.benq.com/en/index.html"><img className = "zowie" src = "../images/zowie.png" alt = "Zowie"  /></a>
                <a className = "test" href="https://gamersupps.gg/"><img className = "gg" src = "../images/Sponsors/gg3.png" alt = "GGsups"/></a>
                <a className = "test" href="https://www.kontrolfreek.com/"><img className = "kf" src = "../images/Sponsors/KF3.png" alt = "KontrolFreek"  /></a>
            </div>
        );
    }
}

export default Sponsor;