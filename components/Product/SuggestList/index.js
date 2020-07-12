/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import data from './data';
import ProductDetails from '../ProductDetails/index';
import Firebase from '../../Firebase';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function SuggestList() {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  var productData = [];
  Firebase.database()
    .ref('product')
    .orderByChild('bought')
    .once('value', snapshot => {
      snapshot.forEach(childSnap => {
        productData.push(childSnap.val());
      });
      setData(productData);
    });

  return (
    <View style={style.container}>
      <Text style={style.listHeader}>Gợi ý cho bạn</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item}) => (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  img: item.img,
                  catalog: item.catalog,
                  supplier: item.supplier,
                  size: item.size,
                  translator: item.translator,
                  typeofcover: item.typeofcover,
                  pagesnumber: item.pagesnumber,
                  publisher: item.publisher,
                })
              }>
              <Image style={style.bookCover} source={{uri: item.img}} />
            </TouchableOpacity>
            {item.name.length > 10 ? (
              <Text style={style.bookInfo}>
                Tên: {item.name.slice(0, 7)}...
              </Text>
            ) : (
              <Text style={style.bookInfo}>Tên: {item.name}</Text>
            )}
            <Text style={style.bookInfo}>Giá: {item.price}.000đ</Text>
          </View>
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 15,
  },
  bookInfo: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  bookCover: {
    margin: 10,
    padding: 10,
    width: 100,
    height: 150,
  },
  listHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    color: (88, 88, 88),
    fontFamily: 'monospace',
  },
});
