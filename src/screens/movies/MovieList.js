import React, { Component } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {
    Header,
    Left,
    Button,
    Body,
    Title,
    Icon,
    Right,
    Text
} from "native-base";
import { SearchBar } from 'react-native-elements';
import MovieDetail from './MovieDetail';
import Utility from '../../Utility'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import styles from '../radio/styles';
import Emoji from 'react-native-emoji';
import * as Animatable from 'react-native-animatable';


const genres = ['All', 'Action', 'Animation', 'Children', 'Comedy', 'Fantasy', 'Sci-Fi', 'Horror', 'Fantasy', 'Romance']
export default class MovieList extends Component {
    state = {
        buttonLoading: true,
        loading: false,
        refreshing: false,
        data: [],
        genres: "",
        page: 0,
        refreshing: false,
        movies: [],
        screenHeight: 0,
        isLoadingMore: false,
        isLastData: false,
        search: '',
        lastGenre: '',
    };

    componentWillMount() {
        this.makeRemoteRequest();
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.setState({ buttonLoading: true });
                Utility.getRating().then((res) => {
                    if (res.length > 0) {
                        Utility.makeRecommendations().then(() => {
                            this.setState({ buttonLoading: false });
                        });
                    }
                });
            }
        );
    }

    makeRemoteRequest = () => {
        const { genres, page, search, lastGenre } = this.state;
        if (genres != lastGenre) {
            console.log("new genre" + "getting " + genres + " page " + page + " search " + search);
            this.setState({
                lastGenre: genres
            });
            Utility.insertGenreHistory(genres);
        }
        console.log("getting " + genres + " page " + page + " search " + search);
        Utility.getMovieList(genres, page, search).then((response) => {
            this.setState({
                isLastData: response.length > 0 ? false : true,
                data: page === 0 ? response : [...this.state.data, ...response],
                loading: false,
                refreshing: false
            });
        });
    }

    _renderMovies = ({ item, index }) => {
        return <MovieDetail key={index} movie={item} navigate={this.props.navigation} />;
    }

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    }

    handleRefresh = () => {
        console.log("handleRefresh");
        this.setState({
            page: 0,
            refreshing: true,
            data: [],
        }, () => {
            this.makeRemoteRequest();
        });
    }

    updateSearch = search => {
        this.setState({
            search
        }, () => {
            console.log(search);
            this.handleRefresh();
        });
    };

    handleLoadMore = () => {
        console.log("handleLoadMore");
        if (!this.state.isLastData) {
            this.setState({
                isLoadingMore: true,
                page: this.state.page + 1,
                refreshing: true,
            }, () => {
                this.makeRemoteRequest();
            });
        }
    }

    _renderGenres() {
        return genres.map((genres, i) => <Text key={i} tabLabel={genres} />);
    }

    /*tabType*/
    _headerTabView() {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
                onChangeTab={(obj) => {
                    var tmpGener = "";
                    obj.i === 0 ? tmpGener = "" : tmpGener = genres[obj.i];
                    this.setState({ genres: tmpGener }, () => { this.handleRefresh() });
                }}
            >
                {this._renderGenres()}
            </ScrollableTabView>
        )
    }
    renderRecommendationbutton = () => {
        if (this.state.buttonLoading) {
            return (
                <Animatable.View animation="fadeOutDown" duration={500} style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={this._renderRecommendation}>
                        <Emoji name="sunglasses" style={styles.emoji} />
                        <Text style={styles.text}>For You!</Text>
                    </TouchableOpacity>
                </Animatable.View>
            );
        } else {
            return (
                <Animatable.View animation="fadeInUp" style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={this._renderRecommendation}>
                        <Emoji name="sunglasses" style={styles.emoji} />
                        <Text style={styles.text}>For You!</Text>
                    </TouchableOpacity>
                </Animatable.View>
            );
        }
    }

    _renderRecommendation = () => {

        this.props.navigation.navigate("MovieRecommendation");

    };


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => { Keyboard.dismiss(); this.props.navigation.navigate("DrawerOpen"); }}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Movies</Title>
                    </Body>

                    <Right />
                </Header>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    showLoading={true}
                    lightTheme={true}
                    value={this.state.search}
                />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        onPress={Keyboard.dismiss}
                        tabLabel='All'
                        data={this.state.data}
                        renderItem={this._renderMovies.bind(this)}
                        numColumns={2}
                        keyExtractor={item => item._id}
                        ListHeaderComponent={this._headerTabView()}
                        ListFooterComponent={this.renderFooter}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0}
                    />
                </TouchableWithoutFeedback>
                {this.renderRecommendationbutton()}

            </View >
        );
    }
}

