import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Header from "./screens/Header/";
import Header1 from "./screens/Header/1";
import Header2 from "./screens/Header/2";
import Header3 from "./screens/Header/3";
import Header4 from "./screens/Header/4";
import Header5 from "./screens/Header/5";
import Header6 from "./screens/Header/6";
import Header7 from "./screens/Header/7";
import Header8 from "./screens/Header/8";
import HeaderSpan from "./screens/Header/header-span";
import HeaderNoShadow from "./screens/Header/header-no-shadow";
import BasicFooter from "./screens/footer/basicFooter";
import IconFooter from "./screens/footer/iconFooter";
import IconText from "./screens/footer/iconText";
import BadgeFooter from "./screens/footer/badgeFooter";
import Default from "./screens/button/default";
import Outline from "./screens/button/outline";
import Rounded from "./screens/button/rounded";
import Block from "./screens/button/block";
import Full from "./screens/button/full";
import Custom from "./screens/button/custom";
import Transparent from "./screens/button/transparent";
import IconBtn from "./screens/button/iconBtn";
import Disabled from "./screens/button/disabled";
import BasicCard from "./screens/card/basic";
import NHCardItemBordered from "./screens/card/carditem-bordered";
import NHCardItemButton from "./screens/card/carditem-button";
import NHCardImage from "./screens/card/card-image";
import NHCardShowcase from "./screens/card/card-showcase";
import NHCardList from "./screens/card/card-list";
import NHCardHeaderAndFooter from "./screens/card/card-header-and-footer";
import NHCardTransparent from "./screens/card/card-transparent";
import BasicFab from "./screens/fab/basic";
import MultipleFab from "./screens/fab/multiple";
import FixedLabel from "./screens/form/fixedLabel";
import InlineLabel from "./screens/form/inlineLabel";
import FloatingLabel from "./screens/form/floatingLabel";
import PlaceholderLabel from "./screens/form/placeholder";
import StackedLabel from "./screens/form/stacked";
import RegularInput from "./screens/form/regular";
import UnderlineInput from "./screens/form/underline";
import RoundedInput from "./screens/form/rounded";
import IconInput from "./screens/form/iconInput";
import SuccessInput from "./screens/form/success";
import ErrorInput from "./screens/form/error";
import DisabledInput from "./screens/form/disabledInput";
import Icons from "./screens/icon/icon";
import BasicIcon from "./screens/icon/basic";
import StateIcon from "./screens/icon/state";
import PlatformSpecificIcon from "./screens/icon/platform-specific";
import IconFamily from "./screens/icon/icon-family";
import RowNB from "./screens/layout/row";
import ColumnNB from "./screens/layout/column";
import NestedGrid from "./screens/layout/nested";
import CustomRow from "./screens/layout/customRow";
import CustomCol from "./screens/layout/customCol";
import BasicListSwipe from "./screens/listSwipe/basic-list-swipe";
import SwipeRowCustomStyle from "./screens/listSwipe/swipe-row-style";
import MultiListSwipe from "./screens/listSwipe/multi-list-swipe";
import NHBasicList from "./screens/list/basic-list";
import NHListItemSelected from "./screens/list/listitem-selected";
import NHListDivider from "./screens/list/list-divider";
import NHListSeparator from "./screens/list/list-separator";
import NHListHeader from "./screens/list/list-headers";
import NHListIcon from "./screens/list/list-icon";
import NHListAvatar from "./screens/list/list-avatar";
import NHListThumbnail from "./screens/list/list-thumbnail";
import RegularPicker from "./screens/picker/regularPicker";
import PickerWithIcon from "./screens/picker/picker-with-icon";
import PlaceholderPicker from "./screens/picker/placeholderPicker";
import PlaceholderPickerNote from "./screens/picker/placeholderPickernote";
import BackButtonPicker from "./screens/picker/backButtonPicker";
import PickerTextItemText from "./screens/picker/picker-text-itemtext";
import HeaderPicker from "./screens/picker/headerPicker";
import HeaderStylePicker from "./screens/picker/headerStylePicker";
import CustomHeaderPicker from "./screens/picker/customHeaderPicker";
import BasicTab from "./screens/tab/basicTab";
import ConfigTab from "./screens/tab/configTab";
import ScrollableTab from "./screens/tab/scrollableTab";
import BasicSegment from "./screens/segment/SegmentHeader";
import BasicToast from "./screens/toast/basic-toast";
import ToastDuration from "./screens/toast/toast-duration";
import ToastPosition from "./screens/toast/toast-position";
import ToastType from "./screens/toast/toast-type";
import ToastText from "./screens/toast/toast-text";
import ToastButton from "./screens/toast/toast-button";
import RegularActionSheet from "./screens/actionsheet/regular";
import IconActionSheet from "./screens/actionsheet/icon";
import AdvSegment from "./screens/segment/segmentTab";
import SimpleDeck from "./screens/deckswiper/simple";
import AdvancedDeck from "./screens/deckswiper/advanced";

import Login from "./screens/login/login";
import Logout from "./screens/login/logout";
import Signup from "./screens/login/signup";
import Home from "./screens/home/";
import Anatomy from "./screens/anatomy/";
import Footer from "./screens/footer/";
import NHBadge from "./screens/badge/";
import NHButton from "./screens/button/";
import NHCard from "./screens/card/";
import NHCheckbox from "./screens/checkbox/";
import NHDeckSwiper from "./screens/deckswiper/";
import NHFab from "./screens/fab/";
import NHForm from "./screens/form/";
import TextArea from "./screens/form/textArea";
import NHIcon from "./screens/icon/";
import ListSwipe from "./screens/listSwipe/";
import NHLayout from "./screens/layout/";
import NHList from "./screens/list/";
import NHRadio from "./screens/radio/";
import NHSearchbar from "./screens/searchbar/";
import NHSpinner from "./screens/spinner/";
import NHPicker from "./screens/picker/";
import NHTab from "./screens/tab/";
import NHThumbnail from "./screens/thumbnail/";
import NHTypography from "./screens/typography/";
import SideBar from "./screens/sidebar";
import Segment from "./screens/segment";
import NHToast from "./screens/toast/";
import Actionsheet from "./screens/actionsheet";
import MovieList from "./screens/movies/MovieList";
import MovieHistoryList from "./screens/movies/MovieHistoryList";
import MovieInfo from "./screens/movies/MovieInfo";
import MovieDetail from "./screens/movies/MovieDetail";
import MovieRecommendation from "./screens/movies/MovieRecommendation";

const Drawer = DrawerNavigator(
  {
    Login: { screen: Login, navigationOptions: { drawerLockMode: 'locked-closed' } },
    Logout: { screen: Logout, navigationOptions: { drawerLockMode: 'locked-closed' } },
    Signup: { screen: Signup, navigationOptions: { drawerLockMode: 'locked-closed' } },
    MovieList: { screen: MovieList },
    MovieHistoryList: { screen: MovieHistoryList},
  },
  {
    initialRouteName: "Login",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    MovieInfo: { screen: MovieInfo },
    MovieRecommendation: { screen: MovieRecommendation }

  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
