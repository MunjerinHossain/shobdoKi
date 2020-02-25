import React from 'react';
import { TouchableOpacity,View, Text, StyleSheet, Image, Button} from 'react-native';

/*
    To do List: 
    1.Make New Game Page
    2.Create Room
    3.Auto Match
    4.Play with bots 
    5.Design above options
*/

//New Game Page
const styles = StyleSheet.create({
  
//   defaultNavigationOptions: {
//     headerStyle: {
//         backgroundColor: "#008000",
//     },
//     headerTintColor: "#fff",
//     headerTitleStyle: {
//         fontWeight: 'bold,',
//     },
// },

  container: { 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    },

  button:{height: 50, 
    backgroundColor: 'gray', 
    margin: 10, 
    padding: 10
  },
  
})

export default class NewGameOptionsScreen extends React.Component {
    //Header
  // static navigationOptions = {
  //   title: 'New Game',
  // };

  _newgame = () => {
    //function to make simple alert
    this.props.navigation.navigate('NewGame')
    
  };

  render() {
    return (
      //New Game View 
      <View style={styles.container}>
        
        <TouchableOpacity 
        style={styles.button}
        onPress={this._newgame}
          >
          <Text>Play with friends</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
         onPress={this._newgame}>
          <Text>New Game</Text>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
        onPress={this._newgame}>
          <Text>Play with bot</Text>
        </TouchableOpacity>
      </View>
    );
  }
}




