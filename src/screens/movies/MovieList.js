import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
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
import MovieDetail from './MovieDetail';
import Utility from '../../Utility'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'


const genres = ['All', 'Action', 'Animation', 'Children', 'Comedy', 'Fantasy', 'Sci-Fi', 'Horror', 'Fantasy', 'Romance']
export default class MovieList extends Component {
    state = {
        loading: false,
        refreshing: false,
        data: [],
        genres: "",
        page: 1,
        refreshing: false,
        movies: [],
        screenHeight: 0,
    };

    componentWillMount() {
        this.makeRemoteRequest();

    }

    makeRemoteRequest = () => {
        const { genres, page } = this.state;
        console.log("getting " + genres + " page " + page);
        Utility.getMovieList(genres, page).then((response) => {
            this.setState({
                data: page === 1 ? response : [...this.state.data, ...response],
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
        this.setState({
            page: 1,
            refreshing: true,
            data: [],
        }, () => {
            this.makeRemoteRequest();
        });
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1,
            refreshing: true,
        }, () => {
            this.makeRemoteRequest();
        });
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Movies</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    tabLabel='All'
                    data={this.state.data}
                    renderItem={this._renderMovies}
                    numColumns={2}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={this._headerTabView()}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                />
            </View >
        );
    }
}

