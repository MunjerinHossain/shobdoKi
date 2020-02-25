import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Easing,
  } from 'react-native'
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#424242'
    }
  })

  export default class SplashAnimation extends React.Component{
    constructor () {
        super()
        this.spinValue = new Animated.Value(0)
      }

      static navigationOptions=({navigation, navigationOptions}) => {
        return {
          header: null
       }
     } 
      componentDidMount () {
        this.spin()
        setTimeout(()=>{
            this.props.navigation.navigate('Home')
        },2000)
      }
      spin () {
        this.spinValue.setValue(0)
        Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear
          }
        ).start(() => this.spin())
      }
      render () {
        const spin = this.spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
        return (
          <View style={styles.container}>
            <Animated.Image
              style={{
                width: 300,
                height: 300,
                backgroundColor:'#424242',
                transform: [{rotate: spin}] }}
                source={require('./Assets/Images/splash_icon.png')}
            />
          </View>
        )
      }
  }