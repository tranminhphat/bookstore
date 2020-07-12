/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import data from './data';
import Firebase from '../../Firebase';
import {useNavigation} from '@react-navigation/native';

export default function ProductList() {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

  var productData = [];

  Firebase.database()
    .ref('product')
    .once('value', data => {
      data.forEach(function(childData) {
        productData.push(childData.val());
      }),
        setData(productData);
    });
  return (
    <View style={style.container}>
      <Text style={style.listHeader}>Tất cả sản phẩm</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Catalog');
        }}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={style.ViewMore}>Xem thêm</Text>
        <Icon
          name="trending-flat"
          color="#2B78FE"
          size={18}
          style={{marginRight: 15}}
        />
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        // data={[data[0], data[1], data[2], data[3], data[4], data[5], data[6]]}
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
    // padding: 10,
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
  ViewMore: {
    left: 280,
    flexGrow: 1,
    alignItems: 'flex-end',
    color: '#2B78FE',
  },
});
