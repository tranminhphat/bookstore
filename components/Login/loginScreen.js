/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
//import thư viện
import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import component
import Styles from './style';
import Firebase from '../Firebase';
import {useNavigation} from '@react-navigation/native';
// import data from './data';

function check(email, password, z) {
  let Uid = '';
  Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(async function() {
      // z.navigate('AccountPage');
      // Uid = await getUid();
      Firebase.auth().onAuthStateChanged(
        await function(user) {
          if (user) {
            Uid = user.uid;
          }
        },
      );
    })
    .then(() => {
      Firebase.database()
        .ref('Users/' + Uid)
        .once('value', async function(data) {
          if (data.val().kichHoat == 0) {
            Firebase.auth()
              .signOut()
              .then(
                await function() {
                  z.navigate('Login');
                  alert('Tài khoản bị khóa');
                },
              );
          } else {
            z.navigate('AccountPage');
          }
        });
      // alert("ok");
    })
    .catch(err => {
      alert(err);
    });
}

export default function loginScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const navigation = useNavigation();
  return (
    <View>
      <View>
        <TextInput
          placeholder="Nhập email"
          style={[Styles.Input]}
          placeholderTextColor="#AAA"
          onChangeText={val => setEmail(val)}
          value={email}
        />
        <TextInput
          placeholder="Mật khẩu"
          style={[Styles.Input, Styles.InputBottom]}
          secureTextEntry={true}
          placeholderTextColor="#AAA"
          onChangeText={value => setPassword(value)}
          value={password}
        />
        <TouchableOpacity
          style={Styles.ButtomLogin}
          onPress={() => check(email, password, navigation)}>
          <Text style={Styles.TextButton}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
