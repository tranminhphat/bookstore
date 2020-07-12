/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import styles from './style';
import Firebase from '../../Firebase';
import LinearGradient from 'react-native-linear-gradient';
// import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

function cancelOrder(orderId) {
  var ref = Firebase.database().ref('order/' + orderId);
  ref.once('value', data => {
    if (data.child('status').toJSON() === 0) {
      ref.remove();
    } else {
      alert('Đơn hàng đã được xác nhận!!');
    }
  });
}

export default function OrderTracking() {
  const [orderData, setOrderData] = React.useState([]);
  var temp = [];
  var status = ['Chờ xác nhận', 'Đang giao hàng'];
  const navigation = useNavigation();
  //Get details order
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let userId = user.uid;
      Firebase.database()
        .ref('order')
        .once('value', data => {
          data.forEach(childData => {
            if (userId == childData.child('userId').toJSON()) {
              temp.push(childData.val());
            }
          });
          setOrderData(temp);
        });
    }
  });

  return (
    <ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={styles.headerText}>My order</Text>
      </LinearGradient>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={orderData}
        renderItem={({item}) => (
          <View style={styles.orderContainer}>
            <Text style={styles.orderInfo}>
              Mã đơn hàng: <Text style={styles.infoChild}>{item.orderId}</Text>
            </Text>
            <Text style={styles.orderInfo}>
              Phí ship:{' '}
              <Text style={styles.infoChild}>{item.shipFee}.000đ</Text>
            </Text>
            <Text style={styles.orderInfo}>
              Tổng tiền: <Text style={styles.infoChild}>{item.total}.000đ</Text>
            </Text>
            <Text style={styles.orderInfo}>
              Trạng thái:{' '}
              <Text style={item.status ? styles.infoChild : styles.infoChild1}>
                {status[item.status]}
              </Text>
            </Text>
            <View style={styles.detailButton}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('detailsOrder', {
                    orderId: item.orderId,
                    shippingFee: item.shipFee,
                  })
                }>
                <Text style={styles.detailButtonText}>Chi tiết đơn hàng</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cancelButton}>
              <TouchableOpacity onPress={() => cancelOrder(item.orderId)}>
                <Text style={styles.cancelButtonText}>Hủy đơn hàng</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}
