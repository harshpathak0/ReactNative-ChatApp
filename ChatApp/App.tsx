import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigator from './StackNavigator'
import { UserContext } from './UserContext'

export default function App() {
  return (
    <>
      <UserContext>
        <StackNavigator />
      </UserContext>

    </>
  )
}

const styles = StyleSheet.create({})