import React from 'react';

const Button = (props) => {
  const { onPress, children } = props;

  return (
    <button onClick={ onPress }>
      { children }
    </button>
  );
};

export default Button;
