import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import "./PlayQuizID.css"

class PlayQuizID extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            options: [[], [], [], [], []],
            inputAnswers: [[], [], [], [], []],
            correctAnswers: [[], [], [], [], []],
            submitted: false,
            score: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkedAnswers = this.checkedAnswers.bind(this)
    }

    componentDidMount() {
        const qid = this.props.match.params.id
        const request = new Request('http://127.0.0.1:8080/PlayQuiz/' + qid);
        fetch(request)
        .then(response => response.json())
        .then(data => {
            this.setState((previousState) => {
                previousState.questions = data.questions;
                previousState.options = data.options;
                previousState.correctAnswers = data.answers;
                // add
                return previousState;
        })});
        console.log(this.state)
    }

    checkedAnswers(i, j, event) {
        const eventTargetChecked = event.target.checked;
        this.setState((previousState) => {
            if(eventTargetChecked === true)
            {
                previousState.inputAnswers[i].push(j);
            }
            if(eventTargetChecked === false)
            {
                let index = previousState.inputAnswers[i].indexOf(j);
                if(index >= 0)
                {
                    previousState.inputAnswers[i].splice(index, 1);
                }
            }
            return previousState;
        })
    }

        // { this.state.options.map((element, index) => {
        //     this.state.inputAnswers[index].sort()
        //     this.state.correctAnswers[index].sort()
        //     // console.log(this.state.inputAnswers[index])
        //     // console.log(this.state.correctAnswers[index])
        //     if(JSON.stringify(this.state.inputAnswers[index]) === JSON.stringify(this.state.correctAnswers[index])) {
        //         // this.setState({score: this.state.score + 100})
        //         this.setState((previousState) => {
        //             previousState.score = 100
        //             return previousState
        //         });
        //         console.log("DSAD")
        //     }
        //     // else {
        //     //     this.setState({score: this.state.score - 50})
        //     // }
        //     console.log(this.state.score)
        // })}

    handleSubmit(event) {
        event.preventDefault()
        this.setState({submitted: true})
        this.state.inputAnswers.map((ele, i) => {
            if(this.state.inputAnswers[i] && this.state.correctAnswers[i])
            {
                this.state.inputAnswers[i].sort();
                this.state.correctAnswers[i].sort();
            }
            console.log(ele, this.state.correctAnswers[i]);
            if (JSON.stringify(ele) === JSON.stringify(this.state.correctAnswers[i]))  {
                this.setState(prevState => {
                    prevState.score += 100;
                    return prevState
                });
                console.log(this.state.score)
                console.log("came here");
            }
            // else {
            //     this.setState(prevState => {
            //         prevState.score += 100;
            //         return prevState
            //     });
            // }
        })
        this.forceUpdate();
    }

    render() {
        return (
            <div className="App">
                <header className="App-CreateQuiz-Header">
                    <h1 className="App-CreateQuiz-Title">Create a Quiz</h1>
                </header>
                <br/><br/>
                <div className="Form-CreateQuiz-Container">
                    <form onSubmit={this.handleSubmit}>
                        { this.state.questions.map((element, index1) => { return (
                            <div className="Form-CreateQuiz-Group">
                                <b><label>Question {index1 + 1}:</label></b>
                                <input type="text" className="Form-CreateQuiz-Control" value={this.state.questions[index1]} disabled/>
                                <br/><br/>
                                { this.state.options[index1].map((element, index2) => { return (
                                    <div>
                                        <b><label>Option {index2 + 1}:</label></b>
                                        <input type="text" className="Form-CreateQuiz-Control" value={this.state.options[index1][index2]} disabled/>
                                        <input type="checkbox" className="Form-CreateQuiz-Control" checked={this.state.inputAnswers[index1].includes(index2)} onClick={this.checkedAnswers.bind(this, index1, index2)} />
                                        <br/><br/>
                                    </div>
                                ) }) }
                            </div>
                        ) }) }
                        <br/><br/>
                        <button type="button" onClick={this.handleSubmit}>Submit</button>
                        {this.state.submitted && alert("Your Score:" + this.state.score)}
                        {this.state.submitted && <Redirect to="/PlayQuiz" />}
                    </form>
                </div>
            </div>
        );
    }
}

export default PlayQuizID;
