import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Alert, AsyncStorage } from "react-native";
import { Container, Button, H3, Text } from "native-base";
import Expo from "expo";
import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");
const fbappID = "350048155565502";
var fbtoken = {
  "token": null,
  "expires": null,
};
var tokenValid = false;
class Home extends Component {
  async storeToken(token) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem("fbtoken", JSON.stringify(token));
    } catch (error) {
      console.log(error.message);
    }
  }
  async retrieveTroken() {
    try {
      const retrievedItem = await AsyncStorage.getItem("fbtoken");
      fbtoken = JSON.parse(retrievedItem);
    } catch (error) {
      console.log(error.message);
    }
    // calculate whether the token is expired
    var milliseconds = (new Date).getTime() / 1000;
    var difference = (fbtoken.expires - milliseconds);
    tokenValid = !(difference < 0 || fbtoken === null || fbtoken.token === null || fbtoken.token === null);
    if (tokenValid) {
      this.navigateToMain();
    }
  }

  async navigateToMain() {
    const response = await fetch(`https://graph.facebook.com/me?access_token=${fbtoken.token}`);
    Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    this.props.navigation.navigate("BasicFooter");
  }
  async logInFB() {
    // check if there is valid fbtoken if not then login 
    if (!tokenValid) {
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync(fbappID, {
          permissions: ["public_profile"],
        });
        if (type === "success") {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
          // save token in asyncStoarge
          this.props.storeToken({
            "token": token,
            "expires": expires,
          });
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    } else {
      this.props.navigateToMain();
    }
  }

  render() {
    this.retrieveTroken();
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground source={launchscreenLogo} style={styles.logo} />
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.text}>App to showcase</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}>NativeBase components</H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={this.logInFB.bind(this)}
            >
              <Text>Lets Go!</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
