/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../../Firebase';
import styles from './style';
import Styles from '../../MenuApp/style';
export default function confirmedOrder() {
  const navigation = useNavigation();
  const LineBreak = () => {
    return (
      <>
        <View
          style={{
            borderBottomColor: '#BBB',
            borderBottomWidth: 6,
            padding: 5,
            width: '90%',
            marginLeft: 20,
            marginBottom: 20,
            marginTop: 20,
          }}
        />
      </>
    );
  };
  var confirmedOrderList = [];
  var ref = Firebase.database().ref('order');
  ref
    .orderByChild('status')
    .equalTo(1)
    .on('value', function(snapshot) {
      snapshot.forEach(childSnap => {
        confirmedOrderList.push(childSnap.val());
      });
    });
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>Confirmed Order</Text>
      </LinearGradient>
      <View style={styles.body}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          // data={[data[0], data[1], data[2], data[3], data[4], data[5], data[6]]}
          data={confirmedOrderList}
          renderItem={({item}) => (
            <ScrollView>
              <View style={styles.unconfirmedContainer}>
                <Text style={styles.orderInfo}>
                  Mã đơn hàng:{' '}
                  <Text style={styles.infoContent}>{item.orderId}</Text>
                </Text>
                <Text style={styles.orderInfo}>
                  Trạng thái:{' '}
                  <Text style={styles.infoContent}>Đã xác nhận</Text>
                </Text>
                <Text style={styles.orderInfo}>
                  Total:{' '}
                  <Text style={styles.infoContent}>{item.total}.000đ</Text>
                </Text>
                <Text style={styles.orderInfo}>
                  Id người đặt:{' '}
                  <Text style={styles.infoContent}>{item.userId}</Text>
                </Text>
              </View>
              <LineBreak />
            </ScrollView>
          )}
        />
      </View>
    </>
  );
}
