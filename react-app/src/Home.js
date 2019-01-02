import React, { Component } from 'react';
import "./Home.css"

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <header className="w3-container w3-red w3-center" style={{padding:"128px 16px"}}>
                    <h1 className="w3-margin w3-jumbo">Quizify</h1>
                    <p className="w3-xlarge">Play a quiz or create your own. Improve your knowledge very effectively.</p>
                    <Link to={'/Signup'}><a className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Get Started</a></Link>
                    &nbsp;&nbsp;
                    <Link to={'/Login'}><a className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Login</a></Link>
                </header>

                <footer className="w3-container w3-padding-64 w3-center w3-opacity">
                    <p>By Rutwik Reddy</p>
                </footer>
            </div>
        );
    }
}

export default Home;
