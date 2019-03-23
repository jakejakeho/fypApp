import React, { Component, propTypes } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Card from '../card/Card';
import CardSection from '../card/CardSection';
import Button from '../button/Button';

const { width, height } = Dimensions.get('window');
const cols = 2, rows = 2;

class MovieDetail extends Component {
    render() {
        const { _id, movieId, title, genres, poster_path, overview, trailerId } = this.props.movie;

        const { imageContainerStyle, titleTextStyle, genresTextStyle, posterStyle } = styles;
        return (

            <TouchableOpacity style={styles.container} onPress={() => this.props.navigate.navigate('MovieInfo', { movieId, title, overview, poster_path, trailerId })}>
                <View style={imageContainerStyle}>
                    <Image source={{ uri: poster_path }} style={posterStyle} />
                </View>
                <Text style={titleTextStyle} numberOfLines={1}>{title}</Text>
                <Text style={genresTextStyle} numberOfLines={1}>
                    {genres}
                </Text>
            </TouchableOpacity>
        );
    }
};
const styles = {
    container: {
        marginLeft: 10,
        marginBottom: 10,
        height: (height - 20 - 20) / rows - 10,
        width: (width - 10) / cols - 10,
    },
    imageContainerStyle: {
        flex: 1
    },
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    titleTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    genresTextStyle: {
        fontSize: 12,
        color: 'grey'
    },
    posterStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 20
    }
};
export default MovieDetail;