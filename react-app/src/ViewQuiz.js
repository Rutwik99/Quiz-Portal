import React, { Component } from 'react';
import "./ViewQuiz.css";

class ViewQuiz extends Component {
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
        .then(data => this.setState({data: data}));
    }

    render() {
        return (
            <div className="App-ViewQuiz">
                <header className="App-ViewQuiz-Header">
                    <h1 className="App-ViewQuiz-Title">View All Quizzes</h1>
                </header>
                <br/><br/>
                <table className="Table-ViewQuiz-Hover">
                    <thead>
                        <tr>
                            <th className="Table-ViewQuiz-Head">Name Of Quiz</th>
                            <th className="Table-ViewQuiz-Head">Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(function(element, i) {
                        return (
                            <tr key = {i}>
                                <td className="Table-ViewQuiz-Rows">{element.quiz_name}</td>
                                <td className="Table-ViewQuiz-Rows">{element.quiz_genre}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ViewQuiz;
