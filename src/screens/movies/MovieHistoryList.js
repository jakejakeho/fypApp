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
const { height } = Dimensions.get('window');

export default class MovieHistoryList extends Component {
    state = { movies: [], screenHeight: 0 };

    componentWillMount() {
        Utility.getMovieHistoryList().then((response) => {
            this.setState({ movies: response });
        });
    }
    renderMovies(navigate) {
        return this.state.movies.map(movie =>
            <MovieDetail key={movie.title} movie={movie} navigate={this.props.navigation} />
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
                        <Title>History</Title>
                    </Body>
                    <Right />
                </Header>
                <ScrollView scrollEnabled={scrollEnabled}
                contentContainerStyle={styles.scrollViewStyle}
                    onContentSizeChange={this.onContentSizeChange}>
                    {this.renderMovies(navigate)}
                </ScrollView>
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



