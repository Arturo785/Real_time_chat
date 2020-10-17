import React, {useState} from 'react'
import { StyleSheet, Image, SafeAreaView, StatusBar, View} from 'react-native'
import {Item, Input, Button, Text,}  from "native-base"
import logoApp  from "../utils/assets/chatLogo.png"

export default function Login(props) {

    const {setUserName} = props

    const [name, setName] = useState("")


    const onSubmit  = () =>{
        setUserName(name)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View>
                <Image source={logoApp} resizeMode="contain" style={styles.logo}/>
            </View>

            <Item>
                <Input 
                    placeholder="Name of user"
                    style={{color : "#fff",}}
                    placeholderTextColor="grey"
                    value={name}
                    onChange={(e) => setName(e.nativeEvent.text)}
                />
            </Item>

            <Button style={styles.btnLogin} onPress={onSubmit}>
                <Text>Enter</Text>
            </Button>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo : {
        width : "100%",
        height : 200,
        marginBottom : 30,
    },
    container : {
        marginHorizontal : 50,
        marginVertical : 100
    },
    btnLogin : {
        marginTop : 40,
        justifyContent : "center",
        backgroundColor : "#0098d3",
        width : "100%"
    }
})
