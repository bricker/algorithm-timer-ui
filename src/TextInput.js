import React from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onChange && this.props.onChange();
  }

  render() {
    return (
      <input type="text" onChange={ this.handleChange } value={ this.state.value }/>
    );
  }
};

export default TextInput;
