import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import Button from './Button.js';
import TextInput from './TextInput.js';
import Select from './Select.js';
import './App.css';

function mergeSortWrapper(arr) {
  /* eslint-disable-next-line no-unused-vars */
  function mergeSort(array) {
    if (array.length === 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(
      mergeSort(left),
      mergeSort(right),
    )
  }

  function merge(left, right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
      if (left[indexLeft] < right[indexRight]) {
        result.push(left[indexLeft]);
        indexLeft++;
      } else {
        result.push(right[indexRight]);
        indexRight++;
      }
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
  }

  return mergeSort(arr);
}

const exampleCode = mergeSortWrapper.toString();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonText: 'Run!',
    };

    this.dataType = 'Array<Integer>';
    this.dataSize = 10 ** 5;
  }

  onDataTypeChange = (event) => {
    this.dataType = event.target.value;
  }

  onDataSizeChange = (event) => {
    this.dataSize = event.target.value;
  }

  onButtonPress = () => {
    const editorValue = this.refs.ace.editor.getValue();
    this.setState({ buttonText: 'Running...' });

    fetch('http://localhost:3001/run', {
      method: 'POST',
      body: JSON.stringify({
        language: 'javascript',
        code: editorValue,
        dataSize: this.dataSize || 100,
        dataType: this.dataType || 'Array<Integer>',
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json)
      this.setState({
        buttonText: 'Finished!',
        response: json,
      });
    })
    .catch(e => console.error('error: ', e));
  }

  render() {
    const { buttonText } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">Algorithm Timer</h1>
        </header>

          <p>
            Type an algorithm to test and press "Run!"
          </p>

          <AceEditor
            mode="javascript"
            theme="monokai"
            name="editor"
            editorProps={{$blockScrolling: true}}
            value={ exampleCode }
            width="100%"
            ref="ace"
          />

          <hr />

          <div className="container">
            <div className="left">
              Data Size
              <TextInput
                onChange={ this.onDataSizeChange }
                value="100000"
              />

              Language
              <Select
                onChange={ this.onDataTypeChange }
              />

              <Button onPress={ this.onButtonPress }>
                { buttonText }
              </Button>
            </div>

            <div className="right">
              <pre>
                { JSON.stringify(this.state.response) }
              </pre>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
