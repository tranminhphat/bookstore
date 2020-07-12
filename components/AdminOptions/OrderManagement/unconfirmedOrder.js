/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Firebase from '../../Firebase';
import styles from './style';
import Styles from '../../MenuApp/style';

export default function unconfirmedOrder() {
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = React.useState(false);
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
  var unconfirmedOrderList = [];
  var ref = Firebase.database().ref('order');
  ref
    .orderByChild('status')
    .equalTo(0)
    .on('value', function(snapshot) {
      snapshot.forEach(childSnap => {
        unconfirmedOrderList.push(childSnap.val());
      });
    });
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>Unconfirmed Order</Text>
      </LinearGradient>
      <View style={styles.body}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          // data={[data[0], data[1], data[2], data[3], data[4], data[5], data[6]]}
          data={unconfirmedOrderList}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          }
          renderItem={({item}) => (
            <ScrollView>
              <View style={styles.unconfirmedContainer}>
                <Text style={styles.orderInfo}>
                  Mã đơn hàng:{' '}
                  <Text style={styles.infoContent}>{item.orderId}</Text>
                </Text>
                <Text style={styles.orderInfo}>
                  Trạng thái:{' '}
                  <Text style={styles.infoContent1}>Chưa xác nhận</Text>
                </Text>
                <Text style={styles.orderInfo}>
                  Total:{' '}
                  <Text style={styles.infoContent}>{item.total}.000đ</Text>
                </Text>
                <Text style={styles.orderInfo}>
                  Id người đặt:{' '}
                  <Text style={styles.infoContent}>{item.userId}</Text>
                </Text>
                <Button
                  title="Xác nhận đơn hàng"
                  color="#000"
                  style={styles.confirmButton}
                  onPress={() => {
                    var ref = Firebase.database().ref('order/' + item.orderId);
                    ref.update({status: 1});
                    alert('Đơn hàng ' + item.orderId + ' đã được xác nhận');
                    setRefreshing(false);
                  }}
                />
              </View>
              <LineBreak />
            </ScrollView>
          )}
        />
      </View>
    </>
  );
}
