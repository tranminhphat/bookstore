/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './detailsOrderStyle';
import Firebase from '../../Firebase';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function detailsOrder({route}) {
  const [detailsData, setDetailsData] = React.useState([]);
  var temp = [];
  const navigation = useNavigation();
  Firebase.database()
    .ref('detailsOrder/' + route.params?.orderId)
    .once('value', data => {
      data.forEach(childData => {
        temp.push(childData.val());
      });
      setDetailsData(temp);
    });
  return (
    <ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={styles.headerText}>My details order</Text>
      </LinearGradient>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={detailsData}
        renderItem={({item}) => (
          <View style={styles.detailsContainer}>
            <Image
              source={{uri: item.productImage}}
              style={styles.imageStyle}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.detailsHeader}>
                Tên sản phẩm:{' '}
                <Text style={styles.detailsInfo}>{item.productName}</Text>
              </Text>
              <Text style={styles.detailsHeader}>
                Giá sản phẩm:{' '}
                <Text style={styles.detailsInfo}>
                  {item.productPrice}.000đ x 1
                </Text>
              </Text>
              <Text style={styles.detailsHeader}>
                Danh mục: <Text style={styles.detailsInfo}>{item.catalog}</Text>
              </Text>
              <Text style={styles.detailsHeader}>
                Nhà cung cấp:{' '}
                <Text style={styles.detailsInfo}>{item.supplier}</Text>
              </Text>
              <Text style={styles.detailsHeader}>
                Dịch giả:{' '}
                <Text style={styles.detailsInfo}>{item.translator}</Text>
              </Text>
              <Text style={styles.detailsHeader}>
                Nhà xuất bản:{' '}
                <Text style={styles.detailsInfo}>{item.publisher}</Text>
              </Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}
