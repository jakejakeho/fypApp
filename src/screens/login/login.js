import React, { Component } from "react";

import styles from "./style";
import test from "../../../assets/logo.png"
import { Keyboard, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Text } from 'native-base';
import { Button } from 'react-native-elements';
import Utility from '../../Utility'
const appId = "1047121222092614"
import { DrawerActions } from "react-navigation";
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Awesome FYP</Text>
              <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(username) => this.setState({ username })} value={this.state.username} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(password) => this.setState({ password })} value={this.state.password} secureTextEntry={true} />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Login"
              />
              <Button
                buttonStyle={styles.signUpNavigateButton}
                onPress={() => this.props.navigation.navigate("Signup")}
                title="Sign Up"
                color="#3897f1"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  componentDidMount() {

    Utility.getToken().then((res) => {
      if (res != 'error' && res != null) {
        console.log('token = ' + res);
        this.props.navigation.navigate('DrawerOpen');
        this.props.navigation.navigate("MovieList");
      } else {
        console.log('error getting token');
      }
    });
  }

  componentWillUnmount() {
  }

  onLoginPress() {
    Utility.login(this.state.username, this.state.password).then((res) => {
      if (res != 'error') {
        console.log('ok');
        this.props.navigation.navigate('DrawerOpen');
        this.props.navigation.navigate("MovieList");
      } else {
        alert("Incorrect Username/ password!");
        console.log('error');
      }
    });
  }

}
