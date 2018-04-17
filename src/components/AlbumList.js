// Import a library to help create a component.
import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail.js'

// Create a component - JS function that returns JSX code
// App component
//Class state has access to 'state'
class AlbumList extends Component {
  state = { albums: [] }; //When component first renders, the state is blank

  componentWillMount() { //Runs when AlbumList is about to be put on the screen
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    .then(response => this.setState({ albums: response.data }));
  }

  renderAlbums() {
    return this.state.albums.map(album =>
      <AlbumDetail key={album.title} album={album}/>
    ); //map() is an array helper
  }

  render() {
    console.log(this.state);

    return (
      <ScrollView>
      {this.renderAlbums()}
      </ScrollView>
    );
  }
}


// Render it to the device
export default AlbumList;
