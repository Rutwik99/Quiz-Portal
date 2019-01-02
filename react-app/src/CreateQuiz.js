import React, { Component } from 'react';
import "./CreateQuiz.css"

class CreateQuiz extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                title: "",
                genre: "",
                questions: ["", "", "", "", ""],
                options: [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]],
                answers: [[], [], [], [], []],
            },
            submitted: false,
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkedAnswers = this.checkedAnswers.bind(this);
    }

    handleTitleChange(event) {
        const eventValue = event.target.value;
        this.setState((previousState) => {
            previousState.formData.title = eventValue;
            return previousState;
        })
    }

    handleGenreChange(event) {
        const eventValue = event.target.value;
        this.setState((previousState) => {
            previousState.formData.genre = eventValue;
            return previousState;
        })
    }

    handleQuestionChange(i, event) {
        const eventValue = event.target.value;
        this.setState((previousState) => {
            previousState.formData.questions[i] = eventValue;
            return previousState;
        })
    }

    handleOptionsChange(i, j, event) {
        const eventValue = event.target.value;
        this.setState((previousState) => {
            previousState.formData.options[i][j] = eventValue;
            return previousState;
        })
    }

    checkedAnswers(i, j, event) {
        const eventTargetChecked = event.target.checked;
        this.setState((previousState) => {
            if(eventTargetChecked === true)
            {
                previousState.formData.answers[i].push(j);
            }
            if(eventTargetChecked === false)
            {
                let index = previousState.formData.answers[i].indexOf(j);
                if(index >= 0)
                {
                    previousState.formData.answers[i].splice(index, 1);
                }
            }
            return previousState;
        })
    }

    addQuestion() {
        this.setState((previousState) => {
            previousState.formData.questions.push("");
            previousState.formData.options.push(["", "", "", ""]);
            previousState.formData.answers.push([]);
            return previousState;
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8080/Quizzes/', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
        .then(response => {
            if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});
                this.setState((previousState) => {
                    previousState.formData = {
                        title: "",
                        genre: "",
                        questions: ["", "", "", "", ""],
                        options: [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]],
                        answers: [[], [], [], [], []],
                    }
                    return previousState;
                })
            }
        })
    }

    render() {
        return (
            <div className="App-CreateQuiz">
                <header className="App-CreateQuiz-Header">
                    <h1 className="App-CreateQuiz-Title">Create a Quiz</h1>
                </header>
                <br/><br/>
                <div className="Form-CreateQuiz-Container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="Form-CreateQuiz-Group">
                            <b><label>Title:</label></b>
                            <input type="text" className="Form-CreateQuiz-Control" value={this.state.formData.title} onChange={this.handleTitleChange} />
                        </div>
                        <div className="Form-CreateQuiz-Group">
                            <b><label>Genre:</label></b>
                            <input type="text" className="Form-CreateQuiz-Control" value={this.state.formData.genre} onChange={this.handleGenreChange} />
                        </div>
                        { this.state.formData.questions.map((element, index1) => { return (
                            <div className="Form-CreateQuiz-Group">
                                <b><label>Question {index1 + 1}:</label></b>
                                <input type="text" className="Form-CreateQuiz-Control" value={this.state.formData.questions[index1]} onChange={this.handleQuestionChange.bind(this, index1)} />
                                { this.state.formData.options[index1].map((element, index2) => { return (
                                    <div>
                                        <b><label>Option {index2 + 1}:</label></b>
                                        <input type="text" className="Form-CreateQuiz-Control" value={this.state.formData.options[index1][index2]} onChange={this.handleOptionsChange.bind(this, index1, index2)} />
                                        <input type="checkbox" className="Form-CreateQuiz-Control" checked={this.state.formData.answers[index1].includes(index2)} onClick={this.checkedAnswers.bind(this, index1, index2)} />
                                    </div>
                                ) }) }
                            </div>
                        ) }) }
                        <button type="button" onClick={this.addQuestion.bind(this)}>Add Question</button>
                        <br/><br/>
                        <button type="button" onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>

                {this.state.submitted &&
                    <div>
                        <h2>
                            New Quiz Successfully Added.
                        </h2>
                    </div>
                }
            </div>
        );
    }
}

export default CreateQuiz;
