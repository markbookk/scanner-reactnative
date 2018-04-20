//This is a template so you can easily copy paste and advance in your code


// Import a library to help create a component.
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from "./src/components/common";


// Create a component - JS function that returns JSX code
// App component
class Template extends Component {

  render() {
    return (
      <View>
        < Header headerText="Authentication" />
        <Text>An app!</Text>
      </View>
    );
  }
}


// Render it to the device
export default Template;
