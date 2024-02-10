import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Home")
                } else {
                    //Token not found , show the login screen itself 
                }
            } catch (error) {
                console.log("Error", error)
            }
        };
        checkLoginStatus();
    })

    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }
        axios.post("http://10.0.2.2:8000/login", user)
            .then((res) => {
                console.log(res)
                const token = res.data.token;
                AsyncStorage.setItem("authToken", token);
                navigation.replace("Home")
            })
            .catch((error) => {
                Alert.alert("Login Error", "Invalid email or password");
                console.log("Login error", error)
            })
    }
    return (
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView>
                <View style={styles.mainTxt}>
                    <Text style={styles.Txt1}>Sign In</Text>
                    <Text style={styles.Txt2}>Sign In to Your Account</Text>
                </View>

                <View style={styles.inputContainer} >
                    <View>
                        <Text style={styles.inputTxt}>Email</Text>
                        <TextInput
                            placeholder='Enter Your Email'
                            style={styles.Input}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer2} >
                    <View>
                        <Text style={styles.inputTxt}>Password</Text>
                        <TextInput
                            placeholder='Enter Your Password'
                            style={styles.Input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    <Pressable style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonTxt}>Login</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signUpBtn}>Don't have an account? Sign Up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: 'center',
    },
    mainTxt: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Txt1: {
        color: "#4A55A2",
        fontSize: 20,
        fontWeight: "600"
    },
    Txt2: {
        marginTop: 16,
        fontSize: 19,
        fontWeight: "bold",
        color: "#000000"
    },
    inputContainer: {
        marginTop: 50
    },
    inputContainer2: {
        marginTop: 20
    },
    inputTxt: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    Input: {
        color: "#000000",
        fontSize: 15,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        // marginVertical: 5,
        width: 300
    },
    button: {
        width: 200,
        backgroundColor: "#4A55A2",
        padding: 15,
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 6
    },
    buttonTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center'
    },
    signUpBtn: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 30,
        fontSize: 17
    }

})