import React from 'react';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    }
  }

  handleChange = (event) => {
    this.setState({ selected: event.target.value });
    this.props.onChange && this.props.onChange();
  }

  render() {
    return (
      <select onChange={ this.handleChange } value={ this.state.value }>
        {/* TODO: Move this into its own Component */}
        <option value="javascript">Javascript</option>
      </select>
    );
  }
};

export default Select;
