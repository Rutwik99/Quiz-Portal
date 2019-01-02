import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {PostData} from './PostData.js'
import {Redirect} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLogin: {
                name: "",
                email: "",
                password: "",
                type: "form"
            },
            dataSocial: {
                name: "",
                email: "",
                provider: "",
                token: "",
                profilePic: "",
                providerId: "",
                type: "social"
            },
            message: "",
            redirectToReferrer: false,
            submitted: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        // this.handleSocialSubmit = this.handleSocialSubmit.bind(this);
        this.handleFacebookResponseSuccess = this.handleFacebookResponseSuccess.bind(this);
        this.handleFacebookResponseFailure = this.handleFacebookResponseFailure.bind(this);
        this.handleGoogleResponseSuccess = this.handleGoogleResponseSuccess.bind(this);
        this.handleGoogleResponseFailure = this.handleGoogleResponseFailure.bind(this);
    }

    handleEmailChange(event) {
        const eventTarget = event.target.value;
        this.setState((previousState) => {
            previousState.dataLogin.email = eventTarget;
            return previousState;
        });
    }

    handlePasswordChange(event) {
        const eventTarget = event.target.value;
        this.setState((previousState) => {
            previousState.dataLogin.password = eventTarget;
            return previousState;
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state.dataLogin);
        fetch('http://localhost:8080/Login/', {
            method: 'POST',
            body: JSON.stringify(this.state.dataLogin),
        })
        .then(response => {
            if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});
            }
            return response.json();
        }).then(msg => {
            if(msg.message == "Success"){
                // this.setState({message: msg.message})
                // console.log(msg.name)
                this.setState((data) => {
                    data.dataLogin.name = msg.name
                    data.message = msg.message
                    data.redirectToReferrer = true
                });
                sessionStorage.setItem('userData', {name: this.state.dataLogin.name, email: this.state.dataLogin.email})
                console.log(this.state.redirectToReferrer)
            }
            else{
                alert("Wrong Credentials")
                window.location.reload();
            }
            console.log(this.state.dataLogin)
        })
    }

    handleGoogleResponseSuccess(response) {

        this.setState(previousState => {
            previousState.dataSocial.name = response.profileObj.name;
            previousState.dataSocial.providerId = response.profileObj.googleId;
            previousState.dataSocial.email = response.profileObj.email;
            previousState.dataSocial.provider = 'google';
            previousState.dataSocial.profilePic = response.profileObj.imageUrl;
            previousState.dataSocial.token = response.accessToken;
            return previousState
        });
        // console.log(response);
        console.log(this.state.dataSocial);
        fetch('http://localhost:8080/SocialLogin/', {
            method: 'POST',
            body: JSON.stringify(this.state.dataSocial),
        })
        .then(response => {
            if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});
            }
            return response.json();
        }).then(msg => {
            this.setState({message: msg.message})
            this.setState({redirectToReferrer: true})
            sessionStorage.setItem('userData', {name: this.state.dataSocial.name, email: this.state.dataSocial.email})
            console.log(this.state.dataSocial)
        })
    }

    handleGoogleResponseFailure(response) {
        console.log(response);
    }

    handleFacebookResponseSuccess(response) {
        console.log(response)
        this.setState((previousState) => {
            previousState.dataSocial.name = response.name;
            previousState.dataSocial.email = response.email;
            previousState.dataSocial.provider = 'facebook';
            previousState.dataSocial.token = response.accessToken;
            previousState.dataSocial.providerId = response.id;
            previousState.dataSocial.profilePic = response.picture.data.url;
            return previousState
        });
        // console.log(response);
        console.log(this.state.dataSocial);
        fetch('http://localhost:8080/SocialLogin/', {
            method: 'POST',
            body: JSON.stringify(this.state.dataSocial),
        })
        .then(response => {
            if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});
            }
            return response.json()
        }).then(msg => {
            this.setState({message: msg.message})
            this.setState({redirectToReferrer: true})
            sessionStorage.setItem('userData', {"name": this.state.dataSocial.name, "email": this.state.dataSocial.email})
            // console.log(this.state.dataSocial.name)
            // console.log(this.state.dataSocial.email)
            // console.log(sessionStorage.getItem('userData'))
        })
    }

    handleFacebookResponseFailure(response) {
        console.log(response);
    }

    render() {
        if(this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/Dashboard'} />)
        }

        // const responseGoogle = (response) => {
        //     console.log(response);
        //     this.signup(response, 'facebook')
        // }
        //
        // const responseFacebook = (response) => {
        //     console.log(response);
        //     this.signup(response, 'google')
        // }



        return (
            <div className="App-Login">
                <header className="App-Login-Header">
                    <h1 className="App-Login-Title">Log In</h1>
                </header>
                <br/><br/>
                <div className="Form-Login-Container">
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="Form-Login-Control">
                            <b><label>Email ID:</label></b>
                            <input type="email" className="Form-Login-Control" required placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                            <br/><br/>
                            <b><label>Password:</label></b>
                            <input type="password" className="Form-Login-Control" required placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            <br/><br/>
                            <button type="submit" onClick={this.handleFormSubmit}>Login</button>
                        </div>
                    </form>
                    <Link to={"/Dashboard"}><a>{this.state.message}</a></Link>
                </div>
                <br/><br/>

                <GoogleLogin
                clientId="667769021407-ce6nafa7jf6m95hs55tm9qibcg67vl9b.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.handleGoogleResponseSuccess}
                onFailure={this.handleGoogleResponseFailure} />

                &nbsp; &nbsp;

                <FacebookLogin
                appId="2036558133073295"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile, email"
                onFailure={this.handleFacebookResponseFailure}
                callback={this.handleFacebookResponseSuccess} />

            </div>
        );
    }
}

export default Login;
