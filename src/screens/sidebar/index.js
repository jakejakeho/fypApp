import React, { Component } from "react";
import { Image, ImageBackground, View } from "react-native";
import DrawerLayout from 'react-native-drawer-layout';
import { NavigationEvents } from 'react-navigation';
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
  },
  {
    name: "Anatomy",
    route: "Anatomy",
    icon: "phone-portrait",
    bg: "#C5F442"
  },
  {
    name: "Actionsheet",
    route: "Actionsheet",
    icon: "easel",
    bg: "#C5F442"
  },
  {
    name: "Header",
    route: "Header",
    icon: "phone-portrait",
    bg: "#477EEA",
    types: "10"
  },
  {
    name: "Footer",
    route: "Footer",
    icon: "phone-portrait",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Badge",
    route: "NHBadge",
    icon: "notifications",
    bg: "#4DCAE0"
  },
  {
    name: "Button",
    route: "NHButton",
    icon: "radio-button-off",
    bg: "#1EBC7C",
    types: "9"
  },
  {
    name: "Card",
    route: "NHCard",
    icon: "keypad",
    bg: "#B89EF5",
    types: "8"
  },
  {
    name: "Check Box",
    route: "NHCheckbox",
    icon: "checkmark-circle",
    bg: "#EB6B23"
  },
  {
    name: "Deck Swiper",
    route: "NHDeckSwiper",
    icon: "swap",
    bg: "#3591FA",
    types: "2"
  },
  {
    name: "Fab",
    route: "NHFab",
    icon: "help-buoy",
    bg: "#EF6092",
    types: "2"
  },
  {
    name: "Form & Inputs",
    route: "NHForm",
    icon: "call",
    bg: "#EFB406",
    types: "12"
  },
  {
    name: "Icon",
    route: "NHIcon",
    icon: "information-circle",
    bg: "#bfe9ea",
    types: "4"
  },
  {
    name: "Layout",
    route: "NHLayout",
    icon: "grid",
    bg: "#9F897C",
    types: "5"
  },
  {
    name: "List",
    route: "NHList",
    icon: "lock",
    bg: "#5DCEE2",
    types: "8"
  },
  {
    name: "ListSwipe",
    route: "ListSwipe",
    icon: "swap",
    bg: "#C5F442",
    types: "3"
  },
  {
    name: "Picker",
    route: "NHPicker",
    icon: "arrow-dropdown",
    bg: "#F50C75"
  },
  {
    name: "Radio",
    route: "NHRadio",
    icon: "radio-button-on",
    bg: "#6FEA90"
  },
  {
    name: "SearchBar",
    route: "NHSearchbar",
    icon: "search",
    bg: "#29783B"
  },
  {
    name: "Segment",
    route: "Segment",
    icon: "menu",
    bg: "#0A2C6B",
    types: "2"
  },
  {
    name: "Spinner",
    route: "NHSpinner",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Tabs",
    route: "NHTab",
    icon: "home",
    bg: "#AB6AED",
    types: "3"
  },
  {
    name: "Thumbnail",
    route: "NHThumbnail",
    icon: "image",
    bg: "#cc0000",
    types: "2"
  },
  {
    name: "Toast",
    route: "NHToast",
    icon: "albums",
    bg: "#C5F442",
    types: "6"
  },
  {
    name: "Typography",
    route: "NHTypography",
    icon: "paper",
    bg: "#48525D"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      profile: null,
      name: null,
      email: null,
    };
  }

  componentWillReceiveProps() {
    this.profileUpdate()
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

              {this.state.profile && (
                <Image source={{ uri: this.state.profile }} style={styles.drawerImage} />)}
              {!this.state.profile && (
                <Image source={profileImage} style={styles.drawerImage} />)}
              {this.state.name && (
                <Text style={styles.drawerUser} >{this.state.name}</Text>)}
              {this.state.email && (
                <Text style={styles.drawerEmail} >{this.state.email}</Text>)}
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
