/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Firebase from '../../Firebase';
import Styles from './style';
import LinearGradient from 'react-native-linear-gradient';

function deleteProduct(id) {
  let x = '0' + id;
  Firebase.database()
    .ref('product/' + x)
    .remove()
    .then(() => {
      alert('Xóa sản phẩm thành công');
    });
}
export default function index() {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  var arrBook = [];

  Firebase.database()
    .ref('product')
    .once('value', data => {
      data.forEach(function(childData) {
        arrBook.push(childData.val());
      }),
        setData(arrBook);
    });
  return (
    <ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>List Products</Text>
      </LinearGradient>
      <TouchableOpacity
        onPress={() => navigation.navigate('createProduct')}
        style={Styles.addProduct}>
        <Text>Thêm sản phẩm</Text>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={data}
        style={Styles.listProduct}
        renderItem={({item}) => (
          <View>
            <View style={Styles.ViewBookLikes}>
              <View style={Styles.ViewImg}>
                <Image style={Styles.imgBook} source={{uri: item.img}} />
              </View>
              <View style={Styles.ViewText}>
                <Text style={Styles.nameBook}>{item.name}</Text>
                <Text style={Styles.priceBook}>{item.price}.000đ</Text>
                <TouchableOpacity
                  style={Styles.update}
                  onPress={() =>
                    navigation.navigate('UpdateProduct', {
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
                  <Text>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.delete}
                  onPress={() => deleteProduct(item.id)}>
                  <Text>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}
