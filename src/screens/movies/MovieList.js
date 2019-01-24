import React , { Component } from 'react';
import Header from '../Header/Header';
import { ScrollView, View, Dimensions } from 'react-native';
import MovieDetail from './MovieDetail';

const { height } = Dimensions.get('window');

export default class MovieList extends Component {
        state = { movies: [], screenHeight: 0 };

        componentWillMount() {
            fetch('http://fypbackend.mooo.com/movies')
            .then((res) => res.json())
            .then((response)=>{
                this.setState({movies: response});
            });
        }
        renderMovies(navigate) {
            return this.state.movies.map(movie =>
                <MovieDetail key={movie.title} movie={movie} navigate={navigate}/>
                );
        }
        
        onContentSizeChange = (contentWidth, contentHeight) => {
            this.setState({screenHeight: contentHeight});
        };

        render(){
            const scrollEnabled =this.state.screenHeight > height;

            const { navigate } = this.props.navigation;
            return (
                <View style={{flex:1}}>
                    <Header headerText={'Movies'}/>
                     <ScrollView scrollEnabled={scrollEnabled}
                     onContentSizeChange={this.onContentSizeChange}>
                         {this.renderMovies(navigate)}
                     </ScrollView>
                </View>
                         
            );
        }
}



