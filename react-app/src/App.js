import React, { Component } from 'react';
import Home from "./Home";
import Genre from "./Genre"
import Leaderboard from "./Leaderboard"
import CreateQuiz from "./CreateQuiz"
import ViewQuiz from "./ViewQuiz"
import DeleteQuiz from "./DeleteQuiz"
import Login from "./Login"
import SignUp from "./SignUp"
import Dashboard from "./Dashboard"
import PlayQuiz from "./PlayQuiz"
// import { PlayQuizID } from "./PlayQuiz"
import PlayQuizID from "./PlayQuizID"


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <div>
                            <div className="w3-top">
                                <div className="w3-bar w3-red w3-card w3-left-align w3-large">
                                    <Link to={'/'}><a className="w3-bar-item w3-button w3-padding-large w3-white">Quizify</a></Link>
                                    {/*<Link to={'/Genre'}><a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Genres</a></Link>*/}                                 <Link to={'/Leaderboard'}><a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Leaderboard</a></Link>
                                    {/*}<Link to={'/Login'}><a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Log In</a></Link>*/}
                                    {/*}<Link to={'/SignUp'}><a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Sign Up</a></Link>*/}
                                </div>
                            </div>
                        </div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            {/*}<Route exact path="/Genre" component={Genre} />*/}
                            <Route exact path="/Leaderboard" component={Leaderboard} />
                            <Route exact path="/PlayQuiz" component={PlayQuiz} />
                            <Route exact path="/PlayQuiz/:id" component={PlayQuizID} />
                            <Route exact path="/CreateQuiz" component={CreateQuiz} />
                            <Route exact path="/ViewQuiz" component={ViewQuiz} />
                            <Route exact path="/DeleteQuiz" component={DeleteQuiz} />
                            <Route exact path="/Login" component={Login} />
                            <Route exact path="/SignUp" component={SignUp} />
                            <Route exact path="/Dashboard" component={Dashboard} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
