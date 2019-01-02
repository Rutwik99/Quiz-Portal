

import React, { Component } from 'react';
import './DeleteQuiz.css';

class DeleteQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedOption: '',
      check: false,
      noData: false,
      submitted: false,
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/ViewQuiz');
    fetch(request)
    .then(response => response.json())
    .then(data => this.setState({data: data}));
  }

  handleOptionChange(event) {
      const eventTargetChecked = event.target.checked;
      this.setState((previousState) => {
          if(eventTargetChecked == true)
          {
              previousState.noData = true;
          }
          else
          {
              previousState.noData = false;
          }
          return previousState;
      })
}

  render() {
    return (
      <div className="App-DeleteQuiz">
        <header className="App-DeleteQuiz-Header">
          <h1 className="App-DeleteQuiz-Title">View All People</h1>
        </header>

        <table className="Table-DeleteQuiz-Hover">
          <thead>
            <tr>
              <th className="Table-DeleteQuiz-Rows">Name Of Quiz</th>
              <th className="Table-DeleteQuiz-Rows">Genre</th>
              <th className="Table-DeleteQuiz-Rows">Checked</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map(function(element, i) {
               return (
                  <tr key = {i}>
                      <td className="Table-DeleteQuiz-Rows">{element.quiz_name}</td>
                      <td className="Table-DeleteQuiz-Rows">{element.quiz_genre}</td>
                      {/*<td className="Table-DeleteQuiz-Rows"><input type="checkbox" checked={this.state.check} onClick={this.handleOptionChange} /></td>*/}
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default DeleteQuiz;

{/*import React, { Component } from 'react';
import "./DeleteQuiz.css"

class DeleteQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            checkdelete: "",
        }
        this.checkDeleted = this.checkDeleted.bind(this);
    }

    checkDeleted(event) {
        this.setState({ checkdelete: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8080/DeleteQuiz', {
            method: 'DELETE'
        })
        .then(response => {
            if(response.status >= 200 && response.status < 300)
            {
                window.location.reload();
            }
        })
    }

    render() {
        return (
            <div className="App-DeleteQuiz">
                <header className="App-DeleteQuiz-Header">
                    <h1 className="App-DeleteQuiz-Title">View All People</h1>
                </header>

                <table className="Table-Hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Genre</th>
                            <th>Checkbox</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.data.map((element, i) => {
                            return (
                                <tr key={i}>
                                    <td>{element.quiz_name}</td>
                                    <td>{element.quiz_genre}</td>
                                    <td><input type="checkbox" id={element.id} onChange={this.checkDeleted}></input></td>
                                </tr>
                            );
                        }) }
                    </tbody>
                </table>
                <button type="button" onClick={this.handleSubmit}>Submit</button>
                {this.state.submitted &&
                    <div>
                        <h2>
                            Selected Quiz/Quizzes Deleted.
                        </h2>
                    </div>
                }
            </div>
        );
    }
}

export default DeleteQuiz; */}

{/*<h4>Person deleted successfully with id {this.state.selectedOption}</h4> */}
