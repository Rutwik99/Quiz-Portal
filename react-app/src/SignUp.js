import React, { Component } from 'react';
import "./SignUp.css";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            signupData: {
                name: "",
                email: "",
                password: "",
                isAdmin: 0
            },
            submitted: false
        };
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(event) {
        const eventValue = event.target.value;
        this.setState((previousState) => {
            previousState.signupData.name = eventValue;
            return previousState;
        })
    }

    handleEmailChange(event) {
        const eventValue = event.target.value;
        this.setState((previousState) => {
            previousState.signupData.email = eventValue;
            return previousState;
        })
    }

    handlePasswordChange(event) {
        const eventValue = event.target.value;
        this.setState((previousState) => {
            previousState.signupData.password = eventValue;
            return previousState;
        })
    }

    handleSubmit(event) {
        // console.log(this.state.signupData)
        event.preventDefault();
        fetch('http://localhost:8080/SignUp/', {
            method: 'POST',
            body: JSON.stringify(this.state.signupData),
        })
        .then(response => {
            if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});
                this.setState((previousState) => {
                    previousState.signupData = {
                        name: "",
                        email: "",
                        password: "",
                        isAdmin: 0
                    }
                    return previousState;
                })
            }
        })
    }

    render() {
        return (
            <div className="App-SignUp">
                <header className="App-SignUp-Header">
                    <h1 className="App-SignUp-Title">Sign Up</h1>
                </header>
                <br/><br/>
                <div className="Form-SignUp-Container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="Form-SignUp-Control">
                            <b><label>Full Name:</label></b>
                            <input type="text" className="Form-SignUp-Control" placeholder="Enter Full Name" name="name" required value={this.state.signupData.name} onChange={this.handleNameChange} />
                            <br/><br/>
                            <b><label>Email ID:</label></b>
                            <input type="email" className="Form-SignUp-Control" placeholder="Enter Email" name="email" required value={this.state.signupData.email} onChange={this.handleEmailChange} />
                            <br/><br/>
                            <b><label>Password:</label></b>
                            <input type="password" className="Form-SignUp-Control" placeholder="Enter Password" name="password" required value={this.state.signupData.password} onChange={this.handlePasswordChange} />
                            <br/><br/>
                            <button type="submit" onClick={this.handleSubmit}>Register</button>
                        </div>
                    </form>
                </div>

                {this.state.submitted &&
                    <div>
                        <h2>
                            New User Successfully Added.
                        </h2>
                    </div>
                }
            </div>
        );
    }
}

export default SignUp;
