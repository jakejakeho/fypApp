import React, { Component } from "react";

import styles from "./style";
import {
    Header,
    Title,
    Icon,
    Left,
    Right,
    Body,
    Button,
    Container,
    Content,
    Item,
    Picker,
    DatePicker

} from "native-base";
// import { Button } from 'react-native-elements';
import { Permissions } from 'expo';
import { ImagePicker } from 'expo';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import Utility from '../../Utility'
const profileImage = require("../../../assets/icon.jpg");
const appId = "1047121222092614"


const genres = ['Action', 'Animation', 'Children', 'Comedy', 'Fantasy', 'Sci-Fi', 'Horror', 'Fantasy', 'Romance']
const gender = ['M', 'F']
export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            image: null,
            favouriteGenre: '',
            gender: '',
            DOB:'',
        };
    }

    onValueChangeGenre(value) {
        this.setState({
            favouriteGenre: value
        });
    }
    onValueChangeGender(value) {
        this.setState({
            gender: value
        });
    }
    setDate(value){
        offset = value.getTimezoneOffset();
        value = value.getTime() / 1000 - offset * 60;
        this.setState({
            DOB:value
        });
    }
    render() {
        let { image } = this.state;
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Sign Up</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Content padder scrollEnabled={false} style={{ backgroundColor: "#FFF", padding: 20 }}>
                            <Left></Left>
                            <Body>
                                {image && (
                                    <Image source={{ uri: image }} style={styles.drawerImage} />)}
                                {!image && (
                                    <Image source={profileImage} style={styles.drawerImage} />)}
                            </Body>
                            <Right></Right>
                            {!image && <Button block primary style={styles.mb15} onPress={this._pickImage}>
                                <Text>Pick an image from camera roll</Text>
                            </Button>}
                            <TextInput autoCapitalize='none' placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(username) => this.setState({ username })} value={this.state.username} />
                            <TextInput autoCapitalize='none' placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(password) => this.setState({ password })} value={this.state.password} secureTextEntry={true} />
                            <TextInput autoCapitalize='characters' placeholder="Name" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                            <TextInput autoCapitalize='none' placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Select your favourite Genere"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    onValueChange={this.onValueChangeGenre.bind(this)}
                                    selectedValue={this.state.favouriteGenre}>
                                    {genres.map((item, index) => {
                                        return (<Picker.Item label={item} value={index} key={index} />)
                                    })}
                                </Picker>
                            </Item>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Select your Gender"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    onValueChange={this.onValueChangeGender.bind(this)}
                                    selectedValue={this.state.gender}>
                                    {gender.map((item, index) => {
                                        return (<Picker.Item label={item} value={index} key={index} />)
                                    })}
                                </Picker>
                            </Item>
                            <DatePicker
                                defaultDate={new Date()}
                                maximumDate={new Date()}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate.bind(this)}
                                disabled={false}
                            />
                            <Button block primary style={styles.mb15} onPress={this.onSignUp.bind(this)}>
                                <Text>Sign Up</Text>
                            </Button>
                        </Content>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView >
        );
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Hey! You might want to enable CAMERA_ROLL for my app, they are good.');
        }
    }

    componentWillUnmount() {
    }

    onSignUp() {
        Utility.register(this.state.username, this.state.password, this.state.name, this.state.email, image, genres[this.state.favouriteGenre], gender[this.state.gender], this.state.DOB).then((res) => {
            if (res != 'error') {
                console.log('ok');
                alert("Register Succeed!");
            } else {
                console.log('error');
            }
        });
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

}
