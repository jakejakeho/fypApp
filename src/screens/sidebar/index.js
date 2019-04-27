import React, { Component } from "react";
import { Image, ImageBackground, View } from "react-native";
import { Avatar } from 'react-native-elements';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
} from "native-base";
import styles from "./style";
import Utility from '../../Utility'
const drawerCover = require("../../../assets/drawer-cover.png");
const profileImage = require("../../../assets/icon.jpg");
const datas = [
  {
    name: "Movies",
    route: "MovieList",
    icon: "phone-portrait",
    bg: "#C5F442"
  },
  {
    name: "History",
    route: "MovieHistoryList",
    icon: "phone-portrait",
    bg: "#C5F442"
  },
  {
    name: "Logout",
    route: "Logout",
    icon: "phone-portrait",
    bg: "#C5F442"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      profile: "https://fypbackend.mooo.com/" + "file/usericon/09f005179b070c5edba53daaeeb7b7dde790.jpg",
      name: '',
      email: '',
    };
  }

  componentWillReceiveProps() {
    this.profileUpdate();
  }

  profileUpdate() {
    Utility.getUserDetail().then((res) => {
      if (res != 'error' && res != null) {
        console.log("profile Update");
        this.setState((oldState) => {
          oldState.profile = "https://fypbackend.mooo.com/" + res.userImage;
          oldState.name = res.name;
          oldState.email = res.email;
          return oldState;
        });
      } else {
        console.log('profile update failed');
      }
    });
  }
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <ImageBackground source={drawerCover} style={styles.drawerCover}>
            <View style={styles.profileView}>
                <Avatar rounded source={{ uri: this.state.profile }} style={styles.drawerImage} />
                <Text style={styles.drawerUser} >{this.state.name}</Text>
                <Text style={styles.drawerEmail} >{this.state.email}</Text>
            </View>

          </ImageBackground>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
