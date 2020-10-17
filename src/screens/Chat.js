import React, {useEffect, useState, useRef} from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Input from "../components/Input"
import Message from "../components/Message"
import firebase from "../utils/firebase/firebase"
import "firebase/database"
import moment from "moment"
import {Header, Body, Title}  from "native-base"
import { map } from 'lodash'


export default function Chat(props) {

    const {userName} = props

    const [messages, setMessages] = useState([])

    const chatScrollRef = useRef();


    useEffect(() => {
        const chat = firebase.database().ref("general") // that is the name of our set in fireStore
        chat.on("value", (snapShot) =>{
            //console.log(snapShot.val())
            setMessages(snapShot.val()) // retrieves all the messages {user,message,hour}
        })
    }, [])

    useEffect(() => {
        chatScrollRef.current.scrollTo({ y: 100000}) // just a big number to scroll to the bottom
    }, [messages]) // every time a message is received

    const sendMessage = (message) =>{
        const date = moment().format("hh:mm a")

        firebase.database().ref("general")
        .push(
            {userName : userName,
            text : message,
            time : date }
            );
    }

    return (
        <>
        <Header style={styles.header} iosBarStyle="light-content" >
            <Body>
                <Title style={{color : "#fff"}}>
                    Chat APP
                </Title>
            </Body>
        </Header>
            <View style={styles.content}>
                <ScrollView style={styles.chatView} ref={chatScrollRef}>
                    {map(messages, (data, index) =>(
                        <Message key={index} message={data} userName={userName} />
                    ))}
                </ScrollView>
                <Input sendMessage={sendMessage} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    content : {
        flex : 1,
        justifyContent : "space-between",
    },
    header : {
        backgroundColor : "#16202b"
    },
    chatView : {
        backgroundColor : "#1b2734"
    }
})
