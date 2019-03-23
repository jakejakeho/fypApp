import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {
    Container,
    Header,
    Left,
    Button,
    Body,
    Title,
    Icon,
    Right,
    Content,
    ActionSheet,
    Text
} from "native-base";
import MovieDetail from './MovieDetail';
import Utility from '../../Utility'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'


const geners = ['All', 'Action', 'Animation', 'Children', 'Comedy', 'tiyu', 'junshi', 'keji', 'caijing', 'shishang']
export default class MovieList extends Component {
    state = {
        loading: false,
        refreshing: false,
        data: [],
        generes: "Adventure",
        page: 1,
        refreshing: false,
        movies: [],
        screenHeight: 0,
    };



    componentWillMount() {
        this.makeRemoteRequest();

    }
    makeRemoteRequest = () => {
        const { generes, page } = this.state;
        Utility.getMovieList(generes, page).then((response) => {
            this.setState({
                data: page === 1 ? response : [...this.state.data, ...response],
                loading: false,
                refreshing: false
            });
        });
    };
    _renderMovies = ({ item, index }) => {
        return <MovieDetail key={item.title} movie={item} navigate={this.props.navigation} />;
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
    };

    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true,
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

    _renderGeneres() {
        return geners.map(geners => <Text tabLabel = {geners}/>);
    }

    /*tabType*/
    _headerTabView() {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
                tabBarUnderlineStyle={{}}
                onChangeTab={(obj) => {
                    this.setState({
                        data: [],
                        generes: geners[obj.i],
                    });
                    this.handleRefresh();
                }}
            >
                {this._renderGeneres()}
            </ScrollableTabView>
        )

    }
    render() {

        const { navigate } = this.props.navigation;
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
                    keyExtractor={item => item.title}
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


