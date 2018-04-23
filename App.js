/*
TODO:
- centralize barcode window
- restart 'name' variable once you press Submit button
- add sound
- add delay to barcode
*/



'use strict';

import React, { Component } from 'react'
import { Text, View, Linking, TextInput, StyleSheet, Dimensions, Picker } from 'react-native';
import { Header, Card, CardSection, Button, Input } from './src/components/common';

import { BarCodeScanner, Permissions } from 'expo';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-popup-dialog';
import { Dropdown } from 'react-native-material-dropdown';

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
    signOption: null,
    scanCode: null,
    latitude: null,
    longitude: null,
    error: null,
  }

  componentDidMount() {
    this._requestCameraPermission();
    //GPS
    navigator.geolocation.getCurrentPosition(
     (position) => {
       this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         error: null,
       });
     },
     (error) => this.setState({ error: error.message }),
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 20000 },
);
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = ({ type, data }) => {
      this.state.scanCode = data;
      this.sendPostAPI();
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

  sendPostAPI() {
    var date = new Date();
    var varISO = date.toISOString();
    var isSignIn = null;
    if (this.state.signOption == "Sign In") {
      isSignIn = true;
    }else if (this.state.signOption == "Sign Out") {
      isSignIn = false;
    }
    // console.log("==========");
    // console.log(isSignIn)
    // console.log(this.state.latitude);
    // console.log(this.state.longitude);
    console.log(this.state.scanCode);
    // console.log("==========");
    if (!(this.state.scanCode == null))
    if (!(isSignIn == null)) {
      fetch('http://192.168.0.10:3000/api/scanner', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeScanned: new Date(),
          isCheckIn: isSignIn,
          project: 'Test',
          scanCode: this.state.scanCode,
          Latitude: this.state.latitude,
          Longitude: this.state.longitude,
          isManual: false,
        })
      }).catch((error)=>{
        console.log("Api call error");
        alert(error.message);
      });
      // this.state.scanCode = "";
      // console.log("restarted!: " + this.state.scanCode);
    }
  }

  render() {

    let data = [{
      value: 'Sign In',
    }, {
      value: 'Sign Out',
    }];

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
                  // console.log(this.state.isSignIn);
                  this.state.signOption = "Sign In";
                  this.state.isScanning = true;
                  this.forceUpdate();
                  }
                }>
                  Sign in
                </Button>

                <Button onPress={() => {
                  this.setSignIn(false);
                  // console.log(this.state.isSignIn);
                  this.state.signOption = "Sign Out";
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
                  this.popupDialog.show();
                  }
                }>
                  Manual Entry
                </Button>
              </CardSection>
            </Card>
          </View>

          <PopupDialog
              ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            >
              <View>

              <Card>
                <CardSection>
                  <Input
                  inputRef={this.textInput}
                  placeholder="Nombre Apellido"
                  label="Name"
                  value={this.state.scanCode}
                  onChangeText={scanCode => this.setState({ scanCode })}
                  />
                </CardSection>

                <View style={{ width: 96, marginLeft: 125 }}>
                  <Dropdown
                          label='Sign In/Out'
                          data={data}
                          onChangeText={signOption => this.setState({ signOption })}
                  />
                  // { console.log(this.state.signOption)}
                </View>

                <Text style={styles.errorTextStyle}>
                  {this.state.error}
                </Text>

                <CardSection>
                  <Button onPress={() => {
                    this.sendPostAPI();
                    }
                  }>
                    Submit
                  </Button>
                </CardSection>
              </Card>

              </View>
            </PopupDialog>

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
