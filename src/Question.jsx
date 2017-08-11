import React from 'react';

import { shuffle, arrayXor, isEqualSet } from './utils';


class QuestionHead extends React.Component {
  render () {
    return (
      <div className="well panel">
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

    const choiceList = choices.map((choice) => {
      let isPressed = selection.includes(choice) ? "btn-pressed" : "";
      return (
        <li key={choice.toString()} className="answer-list">
          <input type="button"
                 className={"btn btn-primary-outline btn-block " + isPressed}
                 value={choice}
                 disabled={done}
                 onClick={this.onAnswerClick} />
        </li>
      );
    });

    return (
      <div className="well panel">
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
    const done = this.props.done;
    const buttonStyle = "btn btn-lg btn-block ";
    return (
      <div className="well panel action">
      {!done ? (
        <button type="button" className={buttonStyle + "btn-default"}
                disabled={done}
                onClick={submitFunc}> Submit </button>
      ) : (
        <button type="button" className={buttonStyle + "btn-default"}
                onClick={this.props.goNext}> Next </button>
      )}
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
    const isCorrect = this.props.isCorrect;
    const answers = this.props.correctAnswers;
    return (
      <div className="well panel">

        {isCorrect ? (
          <p className="correct"><strong> Correct! </strong></p>
        ) : (
          <p className="wrong"><strong> Incorrect! </strong></p>
        )}

        <p> {explanation} </p>

        <p> The correct answer is: <strong> {answers.join(", ")} </strong></p>

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
      isCorrect: null,
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
    const selectionSet = new Set( this.state.selection.map(x => x.toString()) );
    const answerSet = new Set( this.props.data.correct.map(x => x.toString()) );
    const isCorrect = isEqualSet(selectionSet, answerSet);
    this.setState({
      done: true,
      isCorrect: isCorrect
    });
    if (!isCorrect) {
      this.props.addWrong();
    }
  }

  render() {
    const data = this.props.data;
    const choices = this.state.choices;
    const selection = this.state.selection;
    const done = this.state.done;

    return (
      <div className="container">
        <QuestionHead question={data.question} />

        <QuestionChoices choices={choices}
                         selection={selection}
                         done={done}
                         onSelect={this.updateSelection} />

        <QuestionActions onSubmit={this.processAnswers}
                         goNext={this.props.goNext}
                         done={done} />

        {done &&
          <QuestionExplanation explanation={data.explanation}
                               isCorrect={this.state.isCorrect}
                               correctAnswers={data.correct} />
        }
      </div>
    );
  }
}

export { Question, QuestionExplanation };