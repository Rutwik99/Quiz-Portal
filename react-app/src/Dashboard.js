// Handle Errors when you directly try to access the URL
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom'

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            redirectToReferrer: false,
        };
        this.removesession = this.removesession.bind(this)
    }

    removesession() {
        sessionStorage.removeItem('userData')
    }

    render() {
        // if(!sessionStorage.getItem('userData') || this.state.redirectToReferrer) {
        //     return (<Redirect to={'/Dashboard'} />)
        // }

        return (
            <div className="App">
                <div class="w3-row-padding w3-light-grey w3-padding-64 w3-container">
                    <div className="w3-content">
                        <div className="w3-twothird">
                            <Link to={'/'}><a className="w3-button w3-black w3-padding-large w3-large w3-margin-top" onClick={this.removesession}>Log Out</a></Link>
                            <br/>
                        </div>
                    </div>
                </div>

                <div className="w3-row-padding w3-padding-64 w3-container">
                    <div className="w3-content">
                        <div className="w3-twothird">
                            <h1>Play Quiz</h1>
                            <Link to={'/PlayQuiz'}><a className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Play Quiz</a></Link>
                            <p className="w3-text-grey">Click the above button to play a quiz.</p>
                            <br/>
                        </div>
                    </div>
                </div>

                <div class="w3-row-padding w3-light-grey w3-padding-64 w3-container">
                    <div className="w3-content">
                        <div className="w3-twothird">
                            <h1>Create/View/Edit/Delete Quiz</h1>
                            <Link to={'/CreateQuiz'}><a className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Create Quiz</a></Link>
                            <p className="w3-text-grey">Click the above button to create a quiz.</p>
                            <br/>
                            <Link to={'/ViewQuiz'}><a className="w3-button w3-black w3-padding-large w3-large w3-margin-top">View Quiz</a></Link>
                            <p className="w3-text-grey">Click the above button to view all quizzes.</p>
                            <br/>
                            <Link to={'/EditQuiz'}><a className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Edit Quiz</a></Link>
                            <p className="w3-text-grey">Click the above button to edit a quiz.</p>
                            <br/>
                            <Link to={'/DeleteQuiz'}><a className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Delete Quiz</a></Link>
                            <p className="w3-text-grey">Click the above button to delete a quiz</p>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
