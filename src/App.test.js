import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Quiz, QuizSummary } from './Quiz';
import { Question, QuestionExplanation } from './Question';
import { data as dummyList } from './fixture';

var assert = require('assert');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.render(<Quiz questions={dummyList} />, div);
  ReactDOM.render(<QuizSummary questionsWrong={ [dummyList[0]] } />, div);
  ReactDOM.render(<Question data={ dummyList[0] } />, div);
});

it('submit single choice answer', () => {
  const div = document.createElement('div');
  var question = ReactDOM.render(<Question data={ dummyList[1] } />, div);
  question.updateSelection("this is a correct answer");
  question.processAnswers();
  expect(question.state.isCorrect).toBe(true);
});

it('submit multiple choice answer', () => {
  const div = document.createElement('div');
  var question = ReactDOM.render(
    <Question data={ dummyList[0] } addWrong={function(){}} />, div);
  question.updateSelection("this is a correct answer");
  question.updateSelection("second correct answer");
  question.processAnswers();
  expect(question.state.isCorrect).toBe(true);
});

it('QuizSummary show wrong answer', () => {
  const div = document.createElement('div');
  var summary = ReactDOM.render(<QuizSummary questionsWrong={ [dummyList[0]] } />, div);
  // TODO need to do element testing
});

// test for submit answer with number vs string

// test for read json file, yaml file
