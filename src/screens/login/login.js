import React, { Component } from "react";

import styles from "./style";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import Utility from '../../Utility'
const appId = "1047121222092614"

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
              <Text style={styles.logoText}>Instamobile</Text>
              <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(username) => this.setState({ username })} value={this.state.username} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(password) => this.setState({ password })} value={this.state.password} secureTextEntry={true} />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Login"
              />
              <Button
                buttonStyle={styles.fbLoginButton}
                onPress={() => this.onFbLoginPress()}
                title="Login with Facebook"
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
        this.props.navigation.navigate("DrawerOpen");
        this.props.navigation.navigate("MovieList");
      } else {
        console.log('no token');
      }
    });
  }

  componentWillUnmount() {
  }

  onLoginPress() {
    Utility.login(this.state.username, this.state.password).then((res) => {
      if (res != 'error') {
        console.log('ok');
        this.props.navigation.navigate("DrawerOpen");
        this.props.navigation.navigate("MovieList");
      } else {
        console.log('error');
      }
    });
  }

  async onFbLoginPress() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }
}
