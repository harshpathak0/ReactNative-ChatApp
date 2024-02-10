import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/FontAwesome";
import { UserContext, UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

const HomeScreen = () => {
  const navigation = useNavigation()
  const { userId, setUserId } = UserContext(UserType)
  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        <Text>Swift Chat</Text>
      },
      headerRight: () => {
        <View>
          {/* <Icon name="" size={38} color="#000000"/> */}
        </View>
      }
    })
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios.get(`http://localhost:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving user", error);
        });
    };

    fetchUsers();
  }, []);

  console.log("users", users);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})