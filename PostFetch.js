import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert} from 'react-native';


export default class PostFetch extends Component {

    state={
        gameList:[]
    }
//Post Function
handlePress = async () => {
  //  alert(this.props.navigation.getParam('gameCode'))
    fetch('https://banglascrabble.herokuapp.com/api/games', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameName: this.props.navigation.getParam('gameName'),
          gameType: this.props.navigation.getParam('value')
        }),
      })
     .then((response) => response.json())
     .then((responseJson) => {
        Alert.alert(JSON.stringify(responseJson));;
    })
    .catch((error) => {
      console.error(error);
    });
    //alert(this.props.navigation.getParam('gameCode'))
}

//Get Function
getData() {
    return fetch('https://banglascrabble.herokuapp.com/api/games')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({gameList: responseJson},()=>{

              alert(this.state.gameList.length)
            })

        return responseJson.gameCode;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render(){
  return(
   <View style={{paddingTop: 50, paddingLeft: 50 }}>
   <Text> Some other text </Text>
    <Text> Some other text </Text>
    <TouchableOpacity onPress={this.handlePress.bind(this)}>
     <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click to Push </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={this.getData.bind(this)}>
     <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click to Get </Text>
    </TouchableOpacity>
</View> 
  );
}
}