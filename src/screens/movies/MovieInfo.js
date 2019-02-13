import React, { Component } from 'react';
import { View, Text, ScrollView, Image, WebView } from 'react-native';
import { Constants } from 'expo';
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
} from "native-base";
import Card from '../card/Card';
import CardSection from '../card/CardSection';
import Utility from '../../Utility';
import { Rating } from 'react-native-ratings';



class MovieInfo extends Component {
    static navigationOptions = {
        title: 'MovieInfo'
    };
    constructor(props) {
        super(props);
        this.state = {
            history: {
                movieId: null,
                startDate: null,
                endDate: null
            },
            rating: {
                movieId: null,
                rating: null,
                date: null,
            },
        };
    }
    // Image.getSize()
    componentDidMount() {
        this.state.history.movieId = this.props.navigation.state.params.movieId;
        this.state.rating.movieId = this.props.navigation.state.params.movieId;
        this.state.history.startDate = new Date().getTime() / 1000;
        this.state.rating.date = new Date().getTime() / 1000;
    }
    componentWillUnmount() {
        this.state.history.endDate = new Date().getTime() / 1000;
        Utility.insertHistory(this.state.history).then((res) => {
            if (res != 'error' && res != null) {
                console.log('success = ' + res);
            } else {
                console.log('insert History failed');
            }
        });


    }
    renderMovieInfo(params) {
        const { container, posterStyle, containerStyle, container2Style, labelStyle, overviewStyle, ratingStyle } = styles;
        
        return (
            
            <Card>
                <WebView
                        style={{ flex: 1,
                            aspectRatio: 1}}
                        javaScriptEnabled={true}
                        source={{
                            uri: 'https://www.youtube.com/embed/' +  params.trailerId + '?rel=0&autoplay=1&showinfo=0&controls=1',
                        }}
                    />
                <View style={containerStyle}>
                    <Image style={posterStyle} source={{ uri: params.poster_path }} />
                </View>

                <CardSection>
                    <View style={container2Style}>
                        <Text style={labelStyle}>Overview</Text>
                        <Text style={overviewStyle}>
                            {params.overview}
                        </Text>
                    </View>
                </CardSection>


                <View style={ratingStyle}>
                    <Rating type='rocket'
                        onFinishRating={this.ratingCompleted.bind(this)}
                        showRating
                        ratingCount={5}
                        imageSize={40}
                        style={{ paddingVertical: 10 }}
                    />
                </View>
                
                    
                
            </Card>
        );
    }

    ratingCompleted(rating) {
        console.log(`rating is : ${rating}`);
        //can save fetch it user history by fetching rating
        this.state.rating.rating = rating;
        Utility.insertRating(this.state.rating).then((res) => {
            if (res != 'error' && res != null) {
                console.log('success = ' + res);
            } else {
                console.log('insert rating failed');
            }
        });
    };

    render() {
        var { params } = this.props.navigation.state;

        return (

            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ fontWeight: 'bold' }}>
                            {params.title}
                        </Text>
                    </Body>
                    <Right></Right>
                </Header>
                <ScrollView>
                    {this.renderMovieInfo(params)}
                </ScrollView>
            </View>

        );
    }
}
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    containerStyle: {
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20
    },
    posterStyle: {
        flex: 1,
        aspectRatio: 1.25,
        resizeMode: 'contain'
    },
    container2Style: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    overviewStyle: {
        flex: 2,
        fontSize: 14,
        paddingLeft: 18,
        paddingRight: 5
    },
    ratingStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 5,
        borderRadius: 10
    }
};

export default MovieInfo;
