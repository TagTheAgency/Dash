import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, Button, TouchableHighlight, CheckBox, Switch} from 'react-native';
import Orientation from 'react-native-orientation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        images: [
          require('./resources/1.png'),
          require('./resources/2.png'),
          require('./resources/3.png'),
          require('./resources/4.png'),
          require('./resources/5.png'),
          require('./resources/6.png'),
          require('./resources/7.png'),
          require('./resources/8.png'),
          require('./resources/9.png'),
          require('./resources/10.png'),
          require('./resources/11.png'),
          require('./resources/12.png'),
          require('./resources/13.png'),
          require('./resources/14.png'),
          require('./resources/15.png'),
          require('./resources/16.png'),
          require('./resources/17.png'),
          require('./resources/18.png'),
          require('./resources/19.png'),
          require('./resources/20.png'),
          require('./resources/21.png'),
          require('./resources/22.png'),
          require('./resources/23.png'),
          require('./resources/24.png'),
          require('./resources/25.png'),
        ],
        inspiration: require('./resources/1.png'),
        instructions: false,
        initialInstructions: false
      };

      this.getRandomImage = this.getRandomImage.bind(this);
      this.onSwipeLeft = this.onSwipeLeft.bind(this);
      this.onSwipeRight = this.onSwipeRight.bind(this);
      this.dismissInstructions = this.dismissInstructions.bind(this);
      this.showInstructions = this.showInstructions.bind(this);
      this.setShowInitialInstructions = this.setShowInitialInstructions.bind(this);
    }

  componentDidMount() {
      //TODO need to eject before can use orientation!!
      Orientation.lockToLandscape();
      this.getRandomImage();

      AsyncStorage
        .getItem('instructions')
        .then((value) => console.log('got a value for instructions of ', instructions))
        .catch((error) => {
          console.log("didn't find anything for instructions in async storage");
          this.setState({ 'instructions': true })
        });

  }

  dismissInstructions() {
    this.setState({instructions: false});
  }

  showInstructions() {
    console.log('long pressed');
    this.setState({instructions: true});
  }

  setShowInitialInstructions() {
    console.log("Setting initialInstructions")
    this.setState({initialInstructions:!this.state.initialInstructions});
    AsyncStorage.setItem('instructions', JSON.stringify(this.state.initialInstructions));
  }

  onSwipeLeft() {
    this.getRandomImage();
  }

  onSwipeRight() {
    this.getRandomImage();
  }

  getRandomImage() {
    const length = this.state.images.length;
    var randomnumber = Math.floor(Math.random() * (length - 1));
    this.setState({inspiration:this.state.images[randomnumber]});
  }



  render() {

    const instructions = this.state.instructions ?
      (<View style={styles.overlay}>
        <Text style={styles.overlayText}>Swipe left or right to be inspired.</Text>
        <Button
          onPress={this.dismissInstructions}
          title="Inspire Me"
          accessibilityLabel="Inspire Me"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            color: "white",
            flex: 1
          }}
        />
      <View style={{ flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.6)' }}>
        <Switch
          value={this.state.initialInstructions}
          onValueChange={this.setShowInitialInstructions}
          style={{width: 20, height: 20}}
        />
        <Text style={{marginTop: 5}}> Show this screen when first opening app</Text>
        </View>
      </View>) :
      null;

    return (

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <GestureRecognizer
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            onSwipeUp={this.showInstructions}
            config={config}
            >
            <Image style={styles.image} source={this.state.inspiration} resizeMode="contain" />
            </GestureRecognizer>
      </View>
          {instructions}
      </View>
    );
  }
}

const config = {
  velocityThreshold: 0.2,
  directionalOffsetThreshold: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: 'white'
  }
});
