import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';


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


export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.button}>
                    <Text>Manage Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text>Manage Favorites</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text>Word Validator</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text>Sounds</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text>Status Bar</Text>
                </TouchableOpacity>
            
            </View>
        );
    }

}