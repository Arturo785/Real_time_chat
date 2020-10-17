import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import letterColors from '../utils//LetterColors';


export default function Message(props) {

    const {message, userName} = props

    const myOwnMessage = userName === message.userName // a boolean

    const [bgColorLetter, setBgColorLetter] = useState(null);

    useEffect(() => {
        const char = message.userName[0].toUpperCase();
        const indexLetter = char.charCodeAt() - 65;  // gets it from an array in utils
        setBgColorLetter(letterColors[indexLetter]);
      }, []);


    const conditionalStyle = {
        container: {
          justifyContent: myOwnMessage ? 'flex-end' : 'flex-start',
        },
        viewMessage: {
          backgroundColor: myOwnMessage ? '#f0f0f1' : '#4b86f0',
        },
        message: {
          color: myOwnMessage ? '#000' : '#fff',
          textAlign: myOwnMessage ? 'right' : 'left',
        },
      };


    return (
        <View style={[styles.container, conditionalStyle.container]}>
            { !myOwnMessage && (
            <View style={[styles.letterView, {backgroundColor : `rgb(${bgColorLetter})`}]}> 
                <Text style={styles.letter}>
                    {message.userName[0]}
                </Text>
            </View>
            )

            }
            <View style={[styles.viewMessage, conditionalStyle.viewMessage]}>
                <Text style={[styles.messageStyle, conditionalStyle.message]}> {message.text} </Text>
                <Text style={[styles.timeMessage, myOwnMessage ? styles.timeLeft : styles.timeRight]}> {message.time} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        margin : 5,
        alignItems : "center",
    },
    viewMessage : {
        borderRadius : 10,
        minHeight : 35,
        minWidth : "40%",
        maxWidth : "80%"
    },
    messageStyle : {
        padding : 5,
        paddingBottom : 25,
    },
    timeMessage : {
        fontSize : 10,
        position : "absolute",
        bottom : 5
    },
    timeRight : {
        right : 8,
        color : "#fff",
    },
    timeLeft : {
        left : 8,
        color : "grey",
    },
    letterView: {
        height: 35,
        width: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: '#f00',
    },
    letter: {
        fontSize: 18,
        color: '#fff',
        textTransform: 'uppercase',
    },
})
