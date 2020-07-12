/* eslint-disable no-unused-vars */
//import thư viện
import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from 'react-native';
//import component
import loginScreen from './loginScreen';
import registerScreen from './registerScreen';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './style';
const Tab = createMaterialTopTabNavigator();
export default function Login() {
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>Welcome</Text>
      </LinearGradient>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {fontSize: 17, fontWeight: 'bold'},
          style: {backgroundColor: '#eeeeee'},
        }}>
        <Tab.Screen name="Đăng nhập" component={loginScreen} />
        <Tab.Screen name="Đăng ký" component={registerScreen} />
      </Tab.Navigator>
    </>
  );
}
