// Import a library to help create a component.
import React from 'react';
import { View } from 'react-native';

// Create a component - JS function that returns JSX code
// App component
const Card = (props) =>  {
  return (
    <View style={style.containerStyle}>
      {props.children} // This is everything that you pass as a paremeter
    </View>
  );
};


const style = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2, //Rounded edges
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10

  }
}

// Render it to the device
export {Card};
