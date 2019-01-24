import React , { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Card from '../card/Card';
import CardSection from '../card/CardSection';
import Button from '../button/Button';

const MovieDetail = ({ movie, navigate }) =>{
  

    const { containerStyle, headerContentStyle, titleTextStyle,genresTextStyle, posterStyle } = styles;
    const { _id, title, genres, poster_path, overview } = movie;
    
    return (

        <Card>
            <CardSection>
                <View style={containerStyle}>
                    <View style={headerContentStyle}>
                        <Text style={titleTextStyle}>{title}</Text>
                        <Text style={genresTextStyle}>{genres}</Text>
                    </View>
                </View>
            </CardSection>
            
            <CardSection>
                <Image style={posterStyle} source={{ uri: poster_path }}/>
            </CardSection>

            <CardSection>
                <Button onPress={() => navigate('MovieInfo', {overview, poster_path})}>
                    More Info
                </Button>
            </CardSection>
        </Card>
    );
};
const styles ={
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    titleTextStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    genresTextStyle:{
        fontSize: 12
    },
    posterStyle:{
        flex: 1,
        height: 250,
        width: null,
        borderRadius: 10,
    }
};
export default MovieDetail;