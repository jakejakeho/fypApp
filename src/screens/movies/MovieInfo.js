import React, { Component } from 'react';
import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import Header from '../Header/Header';
import Card from '../card/Card';
import CardSection from '../card/CardSection';



class MovieInfo extends Component {
    static navigationOptions = {
        title: 'MovieInfo'
    };
    
    // Image.getSize()
    

    renderMovieInfo(params){
        const { posterStyle, containerStyle, container2Style, labelStyle, overviewStyle } = styles;
        return (
            <Card>
            <View style={containerStyle}>
                <Image style={posterStyle} source={{ uri: params.poster_path }}/>
            </View>

            <CardSection>
                <View style={container2Style}>
                    <Text style={labelStyle}>Overview</Text>
                    <Text style={overviewStyle}>
                    {params.overview}
                    </Text>   
                </View>
            </CardSection>

        
            </Card>
        );
    }

    render() {
        var {params} = this.props.navigation.state;

        return ( 
            <View style={{flex:1}}>
                 <Header headerText={'Movie Info'}/>
                 <ScrollView>
                {this.renderMovieInfo(params)}
                </ScrollView>
            </View>

        );
    }
}
const styles = {
    containerStyle: {
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    posterStyle:{
        flex: 1,
        width: null,
        height: 550 //will be modife
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
    overviewStyle:{
        flex: 2,
        fontSize: 14,
        paddingLeft: 18,
        paddingRight: 5
    }
};

export default MovieInfo;