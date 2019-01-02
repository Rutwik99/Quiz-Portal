import React, { Component } from 'react';
import "./PlayQuiz.css"

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class PlayQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/Quizzes/');
        fetch(request)
        .then(response => response.json())
        .then(data => {this.setState({data: data})});
    }

    render() {
        return (
            <div className="App-PlayQuiz">
                <header className="App-PlayQuiz-Header">
                    <h1 className="App-PlayQuiz-Title">View All Quizzes and Their Genres</h1>
                </header>
                <br/><br/>
                <table className="Table-PlayQuiz-Hover">
                    <thead>
                        <tr>
                            <th className="Table-PlayQuiz-Head">Name Of Quiz</th>
                            <th className="Table-PlayQuiz-Head">Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((element, i) => {
                        return (
                            <tr key = {i}>
                                <td className="Table-PlayQuiz-Rows"><Link to={`/PlayQuiz/${this.state.data[0].quiz_id}`}>{element.quiz_name}</Link></td>
                                <td className="Table-PlayQuiz-Rows">{element.quiz_genre}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PlayQuiz;
