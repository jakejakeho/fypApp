const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  profileView: {
    left: deviceWidth / 14,
    top: deviceHeight / 16,
    height: null,
    width: null,
  },
  drawerImage: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
  },
  drawerUser: {
    marginTop: 20,
    color: 'white',
  },
  drawerEmail: {
    marginTop: 5,
    color: 'white',
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
};
