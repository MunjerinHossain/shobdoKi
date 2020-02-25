import * as React from 'react';
import { Button, View, Text, Style, StyleSheet, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { faMehRollingEyes } from '@fortawesome/free-solid-svg-icons';

export default class NewGameScreen extends React.Component {

  state = { total: 0 }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: null
    }
  }
  componentDidMount() {

    this.getPoint()

  }


  getPoint = async () => {
    try {

      let storePoint = await AsyncStorage.getItem('score')
      console.log("storePoint" + storePoint)
      if (storePoint != null) {
        console.log('getScore' + JSON.parse(JSON.stringify(storePoint)))

        this.setState({ total: storePoint })

      }

    } catch (error) {
      console.log("Something went wrong", error);
    }
  }


  render() {
    return (
      <>

        <View style={styles.container}>

          <View style={styles.logoTop}>
          <FontAwesomeIcon
            icon={faMehRollingEyes} style={{ color: "#424949", margin: 5 }} size={50} />
            </View>

          <View>
            <Text style={styles.name}>শব্দ কি?  </Text>
          </View>
          <View>
            <Text style={styles.home}>Total Points:</Text>
          </View>

          <View>
            <Text style={styles.scoreViewer}>
              {this.state.total}

            </Text>

          </View>

          <View>
            <TouchableOpacity
              style={styles.start}
              onPress={() => this.props.navigation.navigate('Gameboard', { update: this.getPoint })}>
              <Text style={styles.startText}> Play </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.settings}>
            <TouchableOpacity>
              <FontAwesomeIcon
                icon={faUsersCog} style={{ color: "#424949", margin: 5 }} size={40} />
            </TouchableOpacity>
          </View>


        </View>


      </>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFF0'
  },

  logoTop:{
    top: -145,
    left: -60,

  },

  name: {
    backgroundColor: '#FFFFF0',
    top: -195,
    left: 25,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#415053',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },

  settings: {
    position: 'absolute',
    bottom: 0,
    left: 295,
  },

  home: {
    top: -40,
    fontWeight: 'bold',
    fontSize: 40,
  },

  start: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#EC7063',
    padding: 10,
    width: 80,
    textAlign: 'center',
  },
  startText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },

  scoreViewer: {
    justifyContent: 'center',
    alignItems: 'center', width: 150,
    backgroundColor: '#FFEBCD', fontSize: 20, fontWeight: 'bold',
    borderColor: 'black', borderWidth: 1, marginTop: 0, marginBottom: 50,

    textAlign: 'center', padding: 10,
  },

});
