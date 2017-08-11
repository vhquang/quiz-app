import React from 'react';

import { Question, QuestionExplanation } from './Question';


class QuizSummary extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const questions = this.props.questionsWrong;
    const explanations = questions.map((item, index) => {
      return (
        <div key={index}>
        <p> {item.question} </p>
        <QuestionExplanation explanation={item.explanation}
                             isCorrect={false}
                             correctAnswers={item.correct} />
        </div>
      );
    });
    return (
      <div className="container well panel">
        <h1> Summary </h1>
        {explanations}
      </div>
    );
  }
}


class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      wrongAnswers: [],
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.addWrong = this.addWrong.bind(this);
  }

  addWrong() {
    this.setState( (prevState) => {
      return {
        wrongAnswers: prevState.wrongAnswers.concat([prevState.questionIndex])
      };
    });
  }

  nextQuestion() {
    this.setState( (prevState) => {
      return {
        questionIndex: prevState.questionIndex + 1
      };
    });
  }

  render() {
    const questions = this.props.questions;
    const questionIndex = this.state.questionIndex;
    const wrongAnswers = new Set(this.state.wrongAnswers);
    const questionList = questions.map( (question, index) =>
      <Question key={index} data={question} goNext={this.nextQuestion} addWrong={this.addWrong} />
    );
    return (
      <div>
        { questionIndex < questions.length ? (
          questionList.filter((i, idx) => idx === questionIndex)
        ) : (
          <QuizSummary questionsWrong={questions.filter((i, idx) => wrongAnswers.has(idx))} />
        )}
      </div>
    );
  }
}

export default Quiz;