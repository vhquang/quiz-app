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
      "second correct answer",
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

function arrayXor(array, element) {
  let found = false, res = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      found = true;
      continue;
    }
    res.push(array[i]);
  }
  if (!found) res.push(element);
  return res;
}

function isEqualSet(a, b) {
  if (a.size !== b.size) return false;
  for (let x of a) {
    if (!b.has(x)) return false;
  }
  return true;
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
    this.onAnswerClick = this.onAnswerClick.bind(this);
  }

  onAnswerClick(e) {
    const input = e.target;
    this.props.onSelect(input.value);
  }

  render() {
    const choices = this.props.choices;
    const selection = this.props.selection;
    const done = this.props.done;
    // todo disable button after done

    const choiceList = choices.map((choice) => {
      let buttonType = selection.includes(choice) ? "btn-success" : "btn-default";
      return (
        <div key={choice.toString()}>
          <input type="button"
                 className={"btn btn-block " + buttonType}
                 value={choice}
                 onClick={this.onAnswerClick} />
        </div>
      );
    });

    return (
      <div className=" well ">
        {choiceList}
      </div>
    );
  }
}


class QuestionActions extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const submitFunc = this.props.onSubmit;
    return (
      <div className=" well ">
        <button type="button" className="btn btn-default btn-block"
                onClick={submitFunc}> Submit </button>
      </div>
    );
  }
}


class QuestionExplanation extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

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
      choices: shuffle(choices),
      selection: [],
      done: false
    };

    this.updateSelection = this.updateSelection.bind(this);
    this.processAnswers = this.processAnswers.bind(this);
  }

  updateSelection(response) {
    this.setState( (prevState, props) => {
      const correctAnswers = props.data.correct;
      if (correctAnswers.length > 1) {
        return {selection: arrayXor(this.state.selection, response)};
      } else {
        return {selection: [response]};
      }
    } );
  }

  processAnswers() {
    const selectionSet = new Set(this.state.selection);
    const answerSet = new Set(this.props.data.correct);
    const questionCorrect = isEqualSet(selectionSet, answerSet);
    this.setState({
      done: true
    });
    alert(questionCorrect);
  }

  render() {
    const style = {
      backgroundColor: 'green'  // todo remove this
    };
    const data = this.props.data;
    const choices = this.state.choices;
    const selection = this.state.selection;

    return (
      <div className="container" style={style}>
        <QuestionHead question={data.question} />

        <QuestionChoices choices={choices}
                         selection={selection}
                         done={this.state.done}
                         onSelect={this.updateSelection} />

        <QuestionActions onSubmit={this.processAnswers} />

        <QuestionExplanation explanation={data.explanation} />
      </div>
    );
  }
}


class Quiz extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const questions = this.props.questions;
    const questionList = questions.map( (question, index) =>
      <Question key={index} data={question} />
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

ReactDOM.render(
  <Quiz questions={list} />,
  document.getElementById('root')
);
