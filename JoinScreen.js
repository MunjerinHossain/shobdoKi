import React from 'react';
import { FlatList,View,TouchableOpacity,StyleSheet,TextInput , Text } from 'react-native';



const styles = StyleSheet.create({
    list: {
      width:360,
      flex: 3,
      paddingTop: 22,
      flexDirection:'column',
      alignItems:'stretch',
      borderColor:'red'
  
     },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      //borderRadius: 4,
      borderWidth: 0.5,
      borderColor: 'black',
    
    },
    container: {
      flex: 1,
     // justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
      paddingTop: 22,
      
      
    },
    input: {
      margin: 15,
      height: 40,
      width:300,
      borderColor: "black",
      borderWidth: 1
    },
    submitButton: {
      backgroundColor: "aqua",
      width:160,
      padding: 20,
      //margin: 10,
      alignItems: "center",
      height: 20,
      margin: 10
      
    },
    submitButtonText: {
      color: "black",
      fontWeight: 'bold',
      alignItems: "center"
    }
  });
  

export default class JoinScreen extends React.Component {

    _gameOn = () => {
      //function to make simple alert
      alert('Message received, Waiting for Game UI');
    };
  
    render() {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter the code here"
            placeholderTextColor="black"
            autoCapitalize="none"
            // onChangeText={(username)=>this.setState({username})}
            // value={this.state.username}
          />
          
  
  
          <TouchableOpacity
            style={styles.submitButton}
            //onPress={() => this.login(this.state.email, this.state.password)}
  
            onPress={this._gameOn}
          >
            <Text style={styles.submitButtonText}> Join Private Game </Text>
          </TouchableOpacity>
          <View style={{marginTop:20}}>
          <Text style={styles.submitButtonText}> On Going Games </Text>
          </View>
          <View style={styles.list}>
          <FlatList
            data={[
              {key: 'room1'},
              {key: 'room2'},
              {key: 'room3'},
              {key: 'room4'},
              {key: 'room5'},
              {key: 'room6'},
              {key: 'room7'},
              {key: 'room8'},
              {key: 'room9'},
              {key: 'room10'},
            ]}
            renderItem={({item}) =><TouchableOpacity  onPress={() => {alert("this will navigate to the game screen of this room")  }}>
              <Text style={styles.item}>{item.key }</Text></TouchableOpacity>}
          />
        </View>
        </View>
  
  
      );
    }
  }
  