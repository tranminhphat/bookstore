import * as React from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../../Firebase';
import Styles from './style';

function run() {
  var info = [];
  Firebase.database()
    .ref('Users')
    .once('value', data => {
      data.forEach(function(childData) {
        info.push(childData.val());
      });
    });
  return info;
}
function activeAccount(email, hoten, kichHoat, ngaySinh, roleId, sdt) {
  let keyUid;
  let kichhoat;
  Firebase.database()
    .ref('Users')
    .once('value', data => {
      data.forEach(function(childData) {
        if (childData.val().email == email) keyUid = childData.key;
        if (kichHoat == 1) {
          kichhoat = 0;
        } else {
          kichhoat = 1;
        }
      });
    })
    .then(function() {
      Firebase.database()
        .ref('Users/' + keyUid)
        .set({
          email: email,
          hoten: hoten,
          kichHoat: kichhoat,
          ngaySinh: ngaySinh,
          roleId: roleId,
          sdt: sdt,
        })
        .then(() => {
          if (kichhoat == 0) {
            alert('Đã vô hiệu hóa tài khoản');
          } else {
            alert('Đã kích hoạt tài khoản');
          }
        });
    });
}
export default function AccountList({route, navigation}) {
  const [data, setData] = React.useState(run());

  return (
    <ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>List Accounts</Text>
      </LinearGradient>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        // data={[data[0], data[1], data[2], data[3], data[4], data[5], data[6]]}
        data={data}
        renderItem={({item}) => (
          <View style={Styles.itemAccount}>
            <View style={Styles.thongtin}>
              <Text>Họ tên: {item.hoten}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Ngày sinh: {item.ngaySinh}</Text>
              <Text>Số điện thoại: {item.sdt}</Text>
              <Text>
                Quyền tài khoản:{' '}
                {item.roleId == 1 ? (
                  <Text>Người dùng</Text>
                ) : (
                  <Text>Admin</Text>
                )}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                activeAccount(
                  item.email,
                  item.hoten,
                  item.kichHoat,
                  item.ngaySinh,
                  item.roleId,
                  item.sdt,
                )
              }
              style={Styles.effect}>
              {item.kichHoat == 1 ? (
                <Text style={Styles.Active}>Kích hoạt</Text>
              ) : (
                <Text style={Styles.Disable}>Khóa</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}
