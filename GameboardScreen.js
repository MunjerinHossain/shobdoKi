import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Alert, AsyncStorage } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import DraggableFlatList from 'react-native-draggable-flatlist'
import Phonetic from './Avro'
import keyboard1 from './LetterLogic'
import getDictionary from './BanglaWordLists'
import { Button } from 'react-native-paper'


export default class GameboardScreen extends Component {
  state = {
    usedletter: [], userInput: [], capsOn: false, bangla: [], asyncDictionary: [],
    hint: "", word: "", level: "", usedWord: [], valid: false, dictionaryCheck: false, indexSlice: [], maxLength: 0,
    total: 0, singleWordPoint: 0
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: null
    }
  }

  componentDidMount() {
    this.checkAsyncStorage()
    this.getPoint()

  }



  //generates random index
  randomNumber() {

    //random generating along with index Update
    var min = 0
    var max = this.state.maxLength
    console.log("gfh")
    return Math.floor(Math.random() * (max - min)) + min;
  }


  // if dictionary check value is true, it means async is not empty
  checkAsyncStorage = async () => {
    let value = await AsyncStorage.getItem('dictionary')
    //async function returns a promise object not the value of async storage getItem()
    //console.log("val" + JSON.stringify(value))
    let dictionary = []
    if (value != null) {
      console.log("value")
      dictionary = JSON.parse(value)

    }
    else {
      dictionary = getDictionary()
      console.log("blank")

    }
    this.setState({ asyncDictionary: dictionary, maxLength: dictionary.length - 1 }, () => {
      this.generateWord(dictionary)
    })

  }


  showNext = () => {
    
    //splicing
    if(this.state.valid)
    {
      
      let indexSlice = this.state.indexSlice
    let dictionary = this.state.asyncDictionary
    dictionary.splice(indexSlice, 1)

    console.log("Spliced" + indexSlice)
    this.setState({ maxLength: dictionary.length }, () => {
      this.generateWord(dictionary)
    })}

    // this.state.valid ? 'true' : 'false'
    // this.setState({})

  }

  //if storage is empty, dictionary will be generated from getDictionary()
  //if storage is not empty, dictionary will be generated from async getItem
  generateWord = dictionaryOriginal => {
    //console.log("dfdf",JSON.stringify(dictionaryOriginal))
    let dictionary = dictionaryOriginal
    let index = this.randomNumber();
    console.log("index" + index)
    let hint = dictionary[index].hint
    let word = dictionary[index].word
    let level = dictionary[index].level
    this.setState({
      hint: hint, word: word, level: level, valid: false, asyncDictionary: dictionary, indexSlice: index,
      bangla: "", userInput: []
    },
      () => { this.storeToken(this.state.asyncDictionary) })

  }

  validateWord = () => {

    let match1 = this.state.bangla
    let match2 = this.state.word

    if (match1 === match2) {
      this.pointWord()
      this.setState({ valid: true })

    }
    else{
      Alert.alert(
        'Wrong! Try again',
        
      );
    }

  }

  pointWord = () => {
    //point systems

    let point = 0
    point = this.state.level == "Easy" ? 3 : point
    point = this.state.level == "Medium" ? 5 : point
    point = this.state.level == "Difficult" ? 10 : point

    // if(pointLevel === all){
    let score = (this.state.level.length) + point
    let total = this.state.total + score
    this.setState({ total: total, singleWordPoint: score }, () => { 
      Alert.alert(
        'Your score: \n' + (this.state.singleWordPoint),
        
      );
      this.storePoint(total) })
    //async store total score

    console.log("point" + score)
    //}

  }

  //stores data
  storeToken = async (dictionary) => {
    try {
      await AsyncStorage.setItem('dictionary', JSON.stringify(dictionary));
      console.log('store' + JSON.stringify(dictionary))
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  //gets data
  getToken = async () => {
    try {

      let data = await AsyncStorage.getItem('dictionary')
      if (data != null) {
        console.log('get' + JSON.parse(JSON.stringify(data)))
        let result = JSON.parse(data)
        this.setState({ asyncDictionary: result })
        
        //getting a promise in async 
     
      }


    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  storePoint = async (total) => {

    try {
      await AsyncStorage.setItem('score', JSON.stringify(total));
      console.log('storeScore' + JSON.stringify(total))
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  getPoint = async () => {
    try {

      let storePoint = await AsyncStorage.getItem('score')
      if (storePoint != null) {
        console.log('getScore' + JSON.parse(JSON.stringify(storePoint)))
        let save = Number(storePoint)
        this.setState({ total: save })

      }

    } catch (error) {
      console.log("Something went wrong", error);
    }
  }


  letterClicked = (item, index) => {
    let disabledletter = this.state.usedletter
    disabledletter.push(index)

    let compositionbox = this.state.userInput
    if (this.state.capsOn == true) {
      compositionbox.push({ letter: item.name.toLocaleUpperCase(), boardIndex: index })

    }
    else {
      compositionbox.push({ letter: item.name, boardIndex: index })
    }

    let banglaWord = this.convertEngToBan(compositionbox)
    //let valid = this.validateWord(banglaWord)

    this.setState({ usedletter: disabledletter, userInput: compositionbox, bangla: banglaWord })


  }

  caps_ = () => {

    this.setState({ capsOn: !this.state.capsOn })

  }

  backspace = (index) => {

    //same words cannot returning

    let compositionbox = this.state.userInput
    let disabledIndex = this.state.usedletter.indexOf(this.state.userInput[index].boardIndex)
    compositionbox.splice(index, 1)
    let disabledletter = this.state.usedletter
    disabledletter.splice(disabledIndex, 1)
    let banglaWord = this.convertEngToBan(compositionbox)
    // let valid = this.validateWord(banglaWord)
    this.setState({ usedletter: disabledletter, userInput: compositionbox, bangla: banglaWord})
  }

  convertEngToBan = (userInput) => {
    let Word = userInput.reduce((a, b) => a + (b.letter), "");
    return Phonetic.parse(Word)

  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: isActive ? 'blue' : 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={() => { (this.backspace(index)) }}
        delayLongPress={100}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <Text style={{
          fontWeight: 'bold',
          fontColor: 'black',
          fontSize: 25,
          letterSpacing: 20

        }}>{item.letter}</Text>
      </TouchableOpacity>
    )
  }




  render() {


    const letters = [
      { name: 'a' }, { name: 'b' },
      { name: 'c' }, { name: 'd' },
      { name: 'e' }, { name: 'f' },
      { name: 'g' }, { name: 'h' },
      { name: 'i' }, { name: 'j' },
      { name: 'k' }, { name: 'l' },
      { name: 'm' }, { name: 'n' },
      { name: 'o' }, { name: 'p' },
      { name: 'q' }, { name: 'r' },
      { name: 's' }, { name: 't' },
      { name: 'u' }, { name: 'v' },
      { name: 'w' }, { name: 'x' },
      { name: '' }, { name: 'y' }, { name: 'z' }, { name: '' },

    ];



    return (
      <>
        <View style={styles.Viewquit}>
          <TouchableOpacity activeOpacity={0.5}
            onPress={() => {
              Alert.alert(
                'Quit',
                'Do You want to quit the game?',
                [
                  {
                    text: 'YES', onPress: () => {
                      this.props.navigation.getParam('update')()
                      this.props.navigation.navigate('Home')
                    }
                  },//console.warn('YES Pressed')
                  { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },

                ]
              );
              //
            }
            }
          >
            <Text style={styles.quit}>Quit</Text>
            
          </TouchableOpacity>
        </View>

 {  this.state.valid &&     <View style={styles.ViewNext}> 
          <TouchableOpacity
             onPress={() => {
              this.showNext()
            }}>

            <View>
              <Text style={styles.nextButton}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>}



        <View  style={{marginTop: 45}}>
          <Text style={styles.text}>{this.state.bangla}</Text>
        </View>

        <View>
          <Text style={styles.hint}>{this.state.hint}</Text>

        </View>

        <View style={[styles.container]}>

          {/* <Text> {this.state.valid ? 'true' : 'false'} </Text> */}

          <View>
            <Text style={styles.level}>{this.state.level}</Text>
          </View>

        </View>


     { !this.state.valid &&   <View style={styles.container}>
          <View style={styles.alertButton}>
           
            <TouchableOpacity onPress={() => this.validateWord()} >
           
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

          </View>

        </View>}

      
        <View style={{ height: 60 }}>
          <DraggableFlatList
            data={this.state.userInput}
            renderItem={this.renderItem}
            horizontal={true}
            keyExtractor={(item, index) => `draggable-item-${item.boardIndex}`}
            scrollPercent={5}
            onMoveEnd={({ data }) => {
              let banglaWord = this.convertEngToBan(data)
              this.setState({ userInput: data, bangla: banglaWord })
            }}
          />
        </View>

        <FlatGrid
          itemDimension={75}
          items={letters}
          style={styles.gridView}
          renderItem={({ item, index }) => (

            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <TouchableOpacity onPress={() => { this.letterClicked(item, index) }}>
                <Text style={item.name ? styles.itemName : styles.emptyName}>{(this.state.capsOn ? item.name.toLocaleUpperCase() : item.name)}
                </Text></TouchableOpacity>
            </View>
          )}
        />

        <View style={[styles.containerCap]}>
          <TouchableOpacity
            style={styles.capsButton}
            onPress={() => this.caps_()}
          >
            <Text style={styles.capsLock}> CAPSLOCK </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  letters: {
    flexDirection: "row",
  },

  containerCap: {


    backgroundColor: '#FDEDEC',
  },

  capsButton: {
    left: 255,
    color: "white",
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: "#008000",
    width: 100,
    padding: 5,
    //margin: 10,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 15,
  },

  capsLock: {
    color: "#EAFAF1",
    fontWeight: 'bold',
    fontSize: 15,

  },

  submitButtonText: {

    color: "white",
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: "#1B4F72",
    width: 82,
    padding: 7,
    marginTop: 12,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    //margin: 10
  },

  Viewquit: {
    top: 11,
    left: 5,
    width: 100,
    alignItems: 'center',
    
  },

  ViewNext: {
    top: -25,
    left: 250,
    width: 95,
    marginBottom: -30,
    alignItems: 'center',
  },

  quit: {
   
    color: "white",
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: "#EDBB99",
    width: 85,
    padding: 6,
    //margin: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 8,

    //margin: 10
  },

  nextButton: {
    
    color: "white",
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: "#5DADE2",
    width: 94,
    padding: 6,
    //margin: 10,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,

    //margin: 10
  },

  container: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  // containerCap: {


  //   backgroundColor: '#FDEDEC',
  // },
  // container2: {
  //   alignSelf: 'flex-start',
  //   padding: 5,
  //   backgroundColor: '#FDEDEC',
  // },

  text: {
    justifyContent: 'center', left: 90,
    alignItems: 'center', height: 40, width: "50%",
    borderColor: '#61380B', borderWidth: 2, marginTop: 10,
    textAlign: 'center', padding: 5, backgroundColor: '#F7F8E0',
  },

  hint: {
    justifyContent: 'center',
    alignItems: 'center', height: 50, width: "100%",
    borderColor: '#61380B', borderWidth: 1, marginTop: 20, marginBottom: 5,
    textAlign: 'center', padding: 5, backgroundColor: '#FBF2EF',
  },

  level: {
    justifyContent: 'center',
    alignItems: 'center', height: 30, width: 100,
    borderColor: '#61380B', borderWidth: 1, marginTop: 2,
    textAlign: 'center', padding: 5, backgroundColor: '#FBF2EF',
  },

  gridView: {
    marginTop: 0,
    backgroundColor: '#F2F2F2',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 1,
    height: 34,
    width: 80,


  },
  // itemContainer1: {
  //   justifyContent: 'flex-end',
  //   borderRadius: 1,
  //   height: 60,

  // },
  itemName: {
    fontSize: 20,

    color: 'black',
    fontWeight: '600',
    borderColor: '#0174DF',
    borderWidth: 1,
    maxHeight: 150,
    maxWidth: 72,
    padding: 2,
    textAlign: 'center',

  },
  // itemCode: {
  //   fontWeight: '600',
  //   fontSize: 12,
  //   color: '#F9E79F',
  //   backgroundColor: '#FDEDEC',
  // },

  emptyName: {

  },

});