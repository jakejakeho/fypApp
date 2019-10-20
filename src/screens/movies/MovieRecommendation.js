import React, { Component, propTypes } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import {
    Header,
    Left,
    Button,
    Body,
    Title,
    Icon,
    Right,
} from "native-base";
import Card from '../card/Card';
import CardSection from '../card/CardSection';
import MovieDetail from './MovieDetail';
import Utility from '../../Utility';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo';

const { height } = Dimensions.get('window');

export default class MovieRecommendation extends Component {
    state = { 
        movies: [], 
        screenHeight: 0 
    };

    async componentWillMount() {
        let movie = [];
        let movieIds = await Utility.getRecommendationList();
        for (let Item of movieIds){
            let movieItem = await Utility.getMovieById(Item.movieId);
            movie.push(movieItem);
        }
        this.setState({
            movies : movie
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

    render(){
        const scrollEnabled = this.state.screenHeight > height;

        const { navigate } = this.props.navigation;

        return (
        <View style={{flex:1}}>
            <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ fontWeight: 'bold' }}>
                            Your Choices
                        </Text>
                    </Body>
                    <Right />
                </Header>
                <ScrollView scrollEnabled={scrollEnabled}
                    contentContainerStyle={styles.scrollViewStyle}
                    onContentSizeChange={this.onContentSizeChange}>
                    {this.renderMovies(navigate)}
                </ScrollView>
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-5413489190155141/2611617363" // Test ID, Replace with your-admob-unit-id
                    testDeviceID="EMULATOR"
                    onDidFailToReceiveAdWithError={this.bannerError} />
        </View>
        );
    }
};

const styles = {
    scrollViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5
    }
}