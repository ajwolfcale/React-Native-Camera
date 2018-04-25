import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import Expo from 'expo';

export default class App extends Component {
  state = {
    chosenImage: null,
  };

  _launchCameraRollAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(
      Expo.Permissions.CAMERA_ROLL
    );
    if (status !== 'granted') {
      console.error('Camera roll permission not granted');
      return;
    }

    let img = await Expo.ImagePicker.launchImageLibraryAsync();
    // logs the uri of the chosen image
    // console.log(img);
    this.setState({ chosenImage: img });
  };

  _launchCameraAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA);
    if (status !== 'granted') {
      console.error('Camera permission not granted');
      return;
    }

    let img = await Expo.ImagePicker.launchCameraAsync({ allowsEditing: true });
    this.setState({ takenImage: img });

  // -----------use this to flip the take image horizontally and/or vertically...
  //   let flippedImage = await Expo.ImageManipulator.manipulate(img.uri, [
  //     {flip: {vertical: false, horizontal: false}}]);
  //   this.setState({ takenImage: flippedImage });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Photos
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('./aaron.jpg')}
            style={{ height: 200, width: 200 }}
          />
          <Image
            source={require('./coffee.jpg')}
            style={{ height: 200, width: 200 }}
          />
        </View>

        <Button
          title="Launch Camera Roll"
          onPress={() => {
            this._launchCameraRollAsync();
          }}
        />
        <Button
          title="Launch Camera"
          onPress={() => {
            this._launchCameraAsync();
          }}
        />

        {(this.state.chosenImage &&
          <Image
            source={{ uri: this.state.chosenImage.uri }}
            style={{
              height: 200,
              width: 200,
            }}
          />) ||
          null}

        {(this.state.takenImage &&
          <Image
            source={{ uri: this.state.takenImage.uri }}
            style={{
              height: 200,
              width: 200,
            }}
          />) ||
          null}
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Expo.Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});