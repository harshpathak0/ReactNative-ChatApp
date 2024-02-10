import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };

    axios.post("http://10.0.2.2:8000/register", user)
      .then((response) => {
        // console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        navigation.navigate("Login");
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("Registration failed", error);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.mainTxt}>
          <Text style={styles.Txt1}>Register</Text>
          <Text style={styles.Txt2}>Register to your account</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="Enter Your Name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter Your Email"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Enter Your Password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Image</Text>
          <TextInput
            value={image}
            onChangeText={(text) => setImage(text)}
            style={styles.input}
            placeholder="Enter Your Image"
          />
        </View>

        <Pressable style={styles.Button} onPress={handleRegister}>
          <Text style={styles.ButtonTxt}>Register</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signInBtn}>Already have an account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: 'center',
  },
  mainTxt: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Txt1: {
    color: "#4A55A2",
    fontSize: 23,
    fontWeight: "600"
  },
  Txt2: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: "bold",
    color: "#000000"
  },
  inputText: {
    fontSize: 18,
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    fontSize: 18,
    width: 300,
  },
  inputContainer: {
    marginTop: 40
  },
  inputContainer2: {
    marginTop: 20
  },
  Button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 6,
    backgroundColor: '#4A55A2',
    padding: 10,
    width: 150,
    marginTop: 25
  },
  ButtonTxt: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  signInBtn:{
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    fontSize: 17
  }
})
