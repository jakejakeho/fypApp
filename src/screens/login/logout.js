import React, { Component } from "react";

import styles from "./style";
import test from"../../../assets/logo.png"
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import Utility from '../../Utility'
const appId = "1047121222092614"
import { DrawerActions } from "react-navigation";
export default class LogoutScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      </KeyboardAvoidingView>
    );
  }
  componentDidMount() {

    Utility.removeToken().then((res) => {
      if (res != 'error' && res != null) {
        console.log('Logout = ' + res);
        this.props.navigation.navigate('Login');
      } else {
        console.log('no token');
      }
    });
  }

  componentWillUnmount() {
  }

}
