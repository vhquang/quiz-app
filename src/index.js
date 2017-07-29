import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
// import logo from './logo.svg';
// import './App.css';

// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// todo clean up

// registerServiceWorker();

// todo write validator
const list = [
  {
    "question": "question 1",
    "correct": [
      "this is a correct answer"
    ],
    "wrong": [
      "answer b",
      "answer c",
      "answer d"
    ],
    "explanation": "explain 1"
  },
];

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}


class QuestionHead extends React.Component {

  render () {
    const style = {

    };
    return (
      <div className=" well ">
        <p className="lead"> <strong> {this.props.question} </strong> </p>
      </div>
    );
  }
}


class QuestionChoices extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const choices = this.props.choices;
    const choiceList = choices.map((choice) => {
      return (
        <div>
          <button type="button" className="btn btn-default btn-block">{choice}</button>
        </div>
      );
    }
    );

    return (
      <div className=" well ">
        {choiceList}
      </div>
    );
  }
}


class QuestionActions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className=" well ">
        <button type="button" className="btn btn-default btn-block"> Submit </button>
      </div>
    );
  }
}


class QuestionExplanation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const explanation = this.props.explanation;
    return (
      <div className=" well ">
        <p> {explanation} </p>
      </div>
    );
  }
}


class Question extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.data
    let choices = data.correct.concat(data.wrong);
    this.state = {
      choices: shuffle(choices)
    };
  }

  render() {
    const style = {
      backgroundColor: 'green'  // todo remove this
    };
    const data = this.props.data;
    const choices = this.state.choices;

    return (
      <div className="container" style={style}>
        <QuestionHead question={data.question} />

        <QuestionChoices choices={choices} />

        <QuestionActions />

        <QuestionExplanation explanation={data.explanation} />
      </div>
    );
  }
}


class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const questions = this.props.questions;
    const questionList = questions.map( (question) =>
      <Question data={question} />
    );
    return (
      <div>
      {questionList}
      </div>
    );
  }
}

// class Test extends React.Component {
//   render() {
//     return (
//       <div className="App">

//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>

//         <p> this is a question </p>

//       </div>
//     );
//   }
// }
// todo clean up

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <Quiz questions={list} />,
  // <Question data={list[0]} />,  // todo clean up
  // <Test/>,
  document.getElementById('root')
);
