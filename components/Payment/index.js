/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import Styles from '../MenuApp/style';
import Firebase from '../Firebase';
import {FlatList} from 'react-native-gesture-handler';
import data from '../Login/data';

var ShippingFee = [];
Firebase.database()
  .ref('shopping-fee')
  .once('value')
  .then(data => {
    data.forEach(function(childData) {
      ShippingFee.push(childData.val());
    });
  });

let arrInf = [];
function checkUser() {
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let id = user.uid;
      Firebase.database()
        .ref('Users/' + id)
        .once('value')
        .then(function(data) {
          arrInf.push(data.val().hoten);
          arrInf.push(data.val().sdt);
          arrInf.push(id);
        });
    } else {
      arrInf[0] = '';
      arrInf[1] = '';
      arrInf[2] = '';
      // No user is signed in.
    }
  });

  return arrInf;
}

function DatHang(userId, productData, totalPrice, shipFee) {
  let x = 1;
  let y = 1;
  var details = {};
  Firebase.database()
    .ref('order')
    .once('value', data => {
      data.forEach(function(childData) {
        x++;
      });
    })
    .then(function() {
      Firebase.database()
        .ref('order/' + x)
        .set({
          orderId: x,
          userId: userId,
          shipFee: shipFee,
          total: totalPrice + shipFee,
          status: 0,
          date: new Date().getMonth() + 1,
        });

      Firebase.database()
        .ref('detailsOrder')
        .once('value', data => {
          data.forEach(function(childData) {
            y++;
          });
        })
        .then(function() {
          for (let i = 0; i < productData.length; i++) {
            details[i] = {
              detailsId: i,
              orderId: x,
              productName: productData[i].nameBook,
              productPrice: productData[i].price,
              productImage: productData[i].image,
              catalog: productData[i].catalog,
              supplier: productData[i].supplier,
              translator: productData[i].translator,
              publisher: productData[i].publisher,
            };
          }
        })
        .then(function() {
          Firebase.database()
            .ref('detailsOrder/' + y)
            .set(details);
        });
    });
  alert('Đã đặt hàng');
}

export default function Payment({route, navigation}) {
  const LineBreak = () => {
    return (
      <View
        style={{
          borderBottomColor: '#88888875',
          borderBottomWidth: 10,
          marginTop: 60,
        }}
      />
    );
  };

  // luu gia tri trong picker khi selected
  const [selectedValue, setSelectedValue] = React.useState(10);
  // luu gia tri list ship fee tren firebase
  const [listShipFee, setlistShipFee] = React.useState([]);
  var ShippingFee = [];
  Firebase.database()
    .ref('shopping-fee')
    .once('value', data => {
      data.forEach(function(childData) {
        ShippingFee.push(childData.val());
      }),
        setlistShipFee(ShippingFee);
    });
  const arrInf = checkUser();
  const userID = arrInf[2];
  const [hoten, setHoten] = React.useState(arrInf[0]);
  const [sdt, setSdt] = React.useState(arrInf[1]);
  const data = route.params?.data;
  const numOfBook = data.length;
  var totalPrice = 0;
  for (let i = 0; i < data.length; i++) {
    totalPrice += data[i].price;
  }
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>Đơn đặt hàng</Text>
      </LinearGradient>
      <Text style={styles.heading}>Thông tin sản phẩm</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={route.params.data}
        renderItem={({item}) => (
          <>
            <View style={styles.productContainer}>
              <Image style={styles.bookCover} source={{uri: item.image}} />
              <View style={styles.productInformation}>
                <Text style={styles.productText}>
                  Tên sản phẩm: {item.nameBook}
                </Text>
                <Text style={styles.productText}>
                  Giá: {item.price}.000đ x 1
                </Text>
              </View>
            </View>
            <LineBreak />
          </>
        )}
      />
      <View style={styles.receiverContainer}>
        <Text style={styles.heading}>Thông tin người nhận</Text>
        <Text style={{fontWeight: 'bold', fontFamily: 'monospace', margin: 15}}>
          Họ tên người nhận:
        </Text>
        <TextInput
          placeholder="Trần Văn A"
          style={styles.input}
          placeholderTextColor="#AAA"
          onChangeText={val => setHoten(val)}
          value={hoten}
        />
        <Text style={{fontWeight: 'bold', fontFamily: 'monospace', margin: 15}}>
          Số điện thoại:
        </Text>
        <TextInput
          placeholder="0912345678"
          style={styles.input}
          placeholderTextColor="#AAA"
          onChangeText={val => setSdt(val)}
          value={sdt}
        />
        <Text style={{fontWeight: 'bold', fontFamily: 'monospace', margin: 15}}>
          Số nhà:
        </Text>
        <TextInput
          placeholder="1/2/3"
          style={styles.input}
          placeholderTextColor="#AAA"
          onChangeText={val => setSdt(val)}
          value={0}
        />
        <Text style={{fontWeight: 'bold', fontFamily: 'monospace', margin: 15}}>
          Đường:
        </Text>
        <TextInput
          placeholder="Võ Thị Sáu"
          style={styles.input}
          placeholderTextColor="#AAA"
          onChangeText={val => setSdt(val)}
          value={0}
        />
        <Text style={{fontWeight: 'bold', fontFamily: 'monospace', margin: 15}}>
          Phường:
        </Text>
        <TextInput
          placeholder="10"
          style={styles.input}
          placeholderTextColor="#AAA"
          onChangeText={val => setSdt(val)}
          value={0}
        />
        <Picker
          selectedValue={selectedValue}
          // selectedValue={10}
          style={{height: 50, width: 150, margin: 15, padding: 15}}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          mode={'dropdown'}>
          {listShipFee.map(shipfee => (
            <Picker.Item label={shipfee.name} value={shipfee.fee} />
          ))}
        </Picker>
      </View>
      <LineBreak />
      <View style={styles.pageFooter}>
        <Text style={{fontFamily: 'monospace'}}>
          Số lượng sản phẩm: {numOfBook}
        </Text>
        <Text style={{fontFamily: 'monospace'}}>
          Phí ship: {selectedValue}.000đ
        </Text>
        <Text style={{fontFamily: 'monospace'}}>
          Thành tiền: {totalPrice + selectedValue}.000đ
        </Text>
        <Button
          title="Đặt hàng"
          style={styles.orderButton}
          color="#000"
          onPress={() => DatHang(userID, data, totalPrice, selectedValue)}
        />
      </View>
    </ScrollView>
  );
}
