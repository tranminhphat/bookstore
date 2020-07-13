/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Component} from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
//import component
import Styles from './style';
import Firebase from '../Firebase';

function DangKy(hoten, sdt, email, matKhau, ngaySinh) {
  Firebase.auth()
    .createUserWithEmailAndPassword(email, matKhau)
    .then(() => {
      let x = Firebase.auth().currentUser.uid;
      Firebase.database()
        .ref('Users/' + x)
        .set({
          email: email,
          hoten: hoten,
          ngaySinh: ngaySinh,
          sdt: sdt,
          roleId: 1,
          kichHoat: 1,
        })
        .then(() => {
          alert('Đăng ký tài khoản thành công!');
        })
        .catch(error => {
          alert('Đăng ký thất bại!');
        });
    })
    .catch(() => {});
}

export default function registerScreen({route}) {
  const [hoten, setHoten] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [sdt, setSdt] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [ngsinh, setNgsinh] = React.useState('');
  return (
    <View>
      <TextInput
        placeholder="Họ tên"
        style={Styles.Input}
        placeholderTextColor="#AAA"
        onChangeText={val => setHoten(val)}
        value={hoten}
      />
      <TextInput
        placeholder="Số điện thoại"
        style={[Styles.Input, Styles.InputBottom]}
        placeholderTextColor="#AAA"
        keyboardType="numeric"
        onChangeText={val => setSdt(val)}
        value={sdt}
      />
      <TextInput
        placeholder="Email"
        style={[Styles.Input, Styles.InputBottom]}
        placeholderTextColor="#AAA"
        onChangeText={val => setEmail(val)}
        value={email}
      />
      <TextInput
        placeholder="Mật khẩu"
        style={[Styles.Input, Styles.InputBottom]}
        secureTextEntry={true}
        placeholderTextColor="#AAA"
        onChangeText={val => setPassword(val)}
        value={password}
      />
      <TextInput
        placeholder="Ngày sinh"
        style={[Styles.Input, Styles.InputBottom]}
        placeholderTextColor="#AAA"
        onChangeText={val => setNgsinh(val)}
        value={ngsinh}
      />
      <TouchableOpacity
        style={Styles.ButtomLogin}
        onPress={() => DangKy(hoten, sdt, email, password, ngsinh)}>
        <Text style={Styles.TextButton}>ĐĂNG KÝ</Text>
      </TouchableOpacity>
    </View>
  );
}
