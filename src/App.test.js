import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Quiz, QuizSummary} from './Quiz';
import { Question, QuestionExplanation } from './Question';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// test single selection, multi selection
it('submit single choice answer', () => {

});

// add test submission

// add test for summary

// test for submit answer with number vs string

// test for read json file, yaml file
