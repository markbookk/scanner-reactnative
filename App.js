'use strict';

import React, { Component } from 'react'
import { Text, View, Linking, TextInput, StyleSheet, Dimensions } from 'react-native';
import Header from './src/components/header.js';
import Card from './src/components/Card.js';
import CardSection from './src/components/CardSection.js';
import Button from './src/components/Button.js';

import { BarCodeScanner, Permissions } from 'expo';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-popup-dialog';

//Disables the annoying yellow box
console.disableYellowBox = true;

const scaleAnimation = new ScaleAnimation();

export default class App extends React.Component {

  state = {
    hasCameraPermission: null,
    isSignIn: null,
    height: 300,
    width: 300,
    isScanning: false,
    dialogShow: false,
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

  drawBarcode() {
    if (this.state.isScanning) {
      return (
        <View>
          <BarCodeScanner
           onBarCodeRead={this._handleBarCodeRead}
           style={{
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

  showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  }

  drawPopUp() {

        <PopupDialog
          ref={(popupDialog) => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="Popup Dialog - Scale Animation" />}
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="button-1"
            />,
          ]}
        >
          <View style={styles.dialogContentView}>
            <Button
              onPress={this.showFadeAnimationDialog}
            >
            Show Dialog - Default Animation
            </Button>
          </View>
        </PopupDialog>
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
                  console.log(this.state.isSignIn);
                  this.state.isScanning = true;
                  this.forceUpdate();
                  }
                }>
                  Sign in
                </Button>

                <Button onPress={() => {
                  this.setSignIn(false);
                  console.log(this.state.isSignIn);
                  this.state.isScanning = true;
                  this.forceUpdate();
                  }
                }>
                  Sign out
                </Button>
              </CardSection>

              <CardSection>
                <Button onPress={() => {
                  this.state.isScanning = false;
                  this.forceUpdate();
                  this.showScaleAnimationDialog;
                  this.drawPopUp();
                  }
                }>
                  Manual Entry
                </Button>
              </CardSection>
            </Card>
          </View>
          { this.drawBarcode() }
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


  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    // backgroundColor: '#000000',
  },
});
