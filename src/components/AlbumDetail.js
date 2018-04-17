// Import a library to help create a component.
import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card.js'
import CardSection from './CardSection.js'
import Button from './Button.js'

// Create a component - JS function that returns JSX code
// App component
const AlbumDetail = ({ album }) =>  {
  const { title, artist, thumbnail_image, image, url } = album;
  const { thumbnailStyle, headerContentStyle, thumnailContainerStyle, headerTextStyle, imageStyle } = styles;
  return (
    <Card>
      <CardSection>
        <View style={thumnailContainerStyle}>
          <Image
          style={thumbnailStyle}
          source={{ uri: thumbnail_image }}
          />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image
        style={imageStyle}
        source={{ uri: image }}
        />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(url)}>
          Buy Now!
        </ Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
}

// Render it to the device
export default AlbumDetail;
