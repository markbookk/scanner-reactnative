// Import a library to help create a component.
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Create a component - JS function that returns JSX code
// App component
const Button = ({ onPress, children }) =>  {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};


const styles = {
  buttonStyle: {
    flex: 1, //Fill as much contest as it possible containerStyle
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
}

// Render it to the device
export {Button};
