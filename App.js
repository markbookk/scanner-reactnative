'use strict';

import React, { Component } from 'react'
import { Text, View, Linking, TextInput, StyleSheet, Dimensions } from 'react-native';
import Header from './src/components/header.js';
import Card from './src/components/Card.js';
import CardSection from './src/components/CardSection.js';
import Button from './src/components/Button.js';

import { BarCodeScanner, Permissions } from 'expo';

//Disables the annoying yellow box
console.disableYellowBox = true;



export default class App extends React.Component {


  state = {
    hasCameraPermission: null,
    isSignIn: null,
    height: 0,
    width: 0,

  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };


  _handleBarCodeRead = ({ type, data }) => {
      alert(` ${data} `);
  }

  setSignIn(condition) {
    this.state.isSignIn = condition;
  }

  render() {

    //Get permission for camera
    if (this.state.hasCameraPermission === null) {
      return <Text style={styles.viewStyle }>Requesting for camera permission.</Text>;
    } else if (this.state.hasCameraPermission === false) {
        return <Text style={styles.viewStyle }>No access to camera!</Text>;
      } else {


      return (
        <View>
          <View>
            <Header headerText={'Scanner'} />
          </View>

          <View>
            <Card>
              <CardSection>
                <Button onPress={() => {
                  this.setSignIn(true);
                  this.state.height = 300;
                  this.state.width = 300;
                  console.log(this.state.isSignIn);
                  this.forceUpdate();
                  }
                }>
                  Sign in
                </Button>

                <Button onPress={() => {
                  this.setSignIn(false);
                  this.state.height = 300;
                  this.state.width = 300;
                  console.log(this.state.isSignIn);
                  this.forceUpdate();
                  }
                }>
                  Sign out
                </Button>
              </CardSection>

              <CardSection>
                <Button onPress={() => {
                  this.state.height = 0;
                  this.state.width = 0;
                  console.log(this.state.height);
                  console.log(this.state.width);
                  this.forceUpdate();
                  }
                }>
                  Manual Entry
                </Button>
              </CardSection>
            </Card>
          </View>

          <BarCodeScanner
           onBarCodeRead={this._handleBarCodeRead}
           style={{
             // height: Dimensions.get('window').height,
             // width: Dimensions.get('window').width,
             top: 30,
             left: 40,
             height: this.state.width,
             width: this.state.width,
           }}
         />

        </View>


      );
    }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
    viewStyle: {
      height: 100,
      paddingTop: 80,
    },
});
