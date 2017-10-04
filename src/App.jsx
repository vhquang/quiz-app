import React from 'react';
import './index.css';

import { Quiz } from './Quiz';
// import { shuffle } from './utils';

const dataSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "A list of questions for quiz",
  "type": "array",
  "minItems": 1,
  "items": {
    "$ref": "#/definitions/questionObject"
  },
  "uniqueItems": true,
  "definitions": {
    "questionObject": {
      "type": "object",
      "properties": {
        "question": {
          "type": "string"
        },
        "explanation": {
          "type": "string"
        },
        "correct": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/choiceType"
          },
          "minItems": 1,
          "uniqueItems": true
        },
        "wrong": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/choiceType"
          },
          "minItems": 1,
          "uniqueItems": true
        }
      },
      "required": [ "correct", "wrong" ]
    },
    "choiceType": {
      "anyOf": [
        {"type": "string"},
        {"type": "number"},
        {"type": "boolean"}
      ]
    }
  }
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dataErrorMsg: null
    };
    const Ajv = require('ajv');
    const ajv = new Ajv({allErrors: true});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
    this.ajv = ajv;
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  validateData(content) {
    let data = null, error = "";
    let yaml = require('js-yaml');
    try {
      data = JSON.parse(content);
    } catch (e) {
      error = error + e.toString();
    }

    if (!data) {
      // todo try/catch
      data = yaml.safeLoad(content);
    }

    if (!data) {
      this.setState( {dataErrorMsg: "Cannot parse the file content. " + error} );
      return;
    }

    if (this.ajv.validate(dataSchema, data)) {
      this.setState( {data: data} );
    } else {
      this.setState( {dataErrorMsg: this.ajv.errorsText()} );
    }
  }

  handleFileSelect(evt) {
    this.setState({
      data: null,
      dataErrorMsg: null
    });
    let files = evt.target.files;
    if (!files.length) {
      alert('No file select');
      return;
    }
    let file = files[0];
    let that = this;
    let reader = new FileReader();
    reader.onload = function(e) {
      that.validateData(e.target.result);
    };
    reader.readAsText(file);
  }

  render() {
    const data = this.state.data;
    const uploadFile = (
      <label className="btn btn-lg btn-primary">
          Load file
          <input type="file" onChange={this.handleFileSelect}
                 style={{display: "none"}} />
      </label>
    );
    const uploadPanel = (
      <div className="well panel action">
        {uploadFile}
      </div>
    );
    const dataErrorMsg = this.state.dataErrorMsg;
    const errorPanel = (
      <div className="container well panel" style={{"textAlign": "center"}}>
        <p>{dataErrorMsg}</p>
      </div>
    );

    return (
      <div>
      { !data && uploadPanel }
      { dataErrorMsg && errorPanel }
      { data && <Quiz questions={data} /> }
      </div>
    );
  }
}

export default App;
