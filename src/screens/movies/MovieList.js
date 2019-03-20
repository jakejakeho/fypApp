import React, { Component } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
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
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
const { height } = Dimensions.get('window');

export default class MovieList extends Component {
    state = { movies: [], screenHeight: 0, };

    componentWillMount() {
        Utility.getMovieList().then((response) => {
            this.setState({ movies: response });
        });
    }
    renderMovies(navigate) {
        return this.state.movies.map(movie =>
            <MovieDetail key={movie.title} movie={movie} navigate={navigate} />
        );
    }


    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };

    render() {
        const scrollEnabled = this.state.screenHeight > height;

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
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar />}
                    onChangeTab={(info) => {
                        console.log(info.i)
                        if (info.i == 0) {
                            Utility.getMovieHistoryList().then((response) => {
                                this.setState({ movies: response });
                            });
                        } else {
                            Utility.getMovieList().then((response) => {
                                this.setState({ movies: response });
                            });
                        }

                    }}>
                    <ScrollView tabLabel='one' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                    <ScrollView tabLabel='two' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                    <ScrollView tabLabel='three' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                    <ScrollView tabLabel='four' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                    <ScrollView tabLabel='five' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                    <ScrollView tabLabel='sixth' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                    <ScrollView tabLabel='seventh' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                    <ScrollView tabLabel='eighth' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                    <ScrollView tabLabel='nineth' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                    <ScrollView tabLabel='tenth' scrollEnabled={scrollEnabled}
                        contentContainerStyle={styles.scrollViewStyle}
                        onContentSizeChange={this.onContentSizeChange}>
                        {this.renderMovies(navigate)}
                    </ScrollView>
                </ScrollableTabView>


            </View>

        );
    }
}
const styles = {
    scrollViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5
    }
}



