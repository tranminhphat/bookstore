import * as React from 'react';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import component
import Styles from './style';
import {View} from 'react-native-animatable';
import Firebase from '../../Firebase';
import LinearGradient from 'react-native-linear-gradient';

export default function ProductLikes({route}) {
  const [data, setData] = React.useState([]);
  const navigation = useNavigation();
  var productData = [];
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      Firebase.database()
        .ref('likeBook/' + user.uid)
        .once('value', data => {
          data.forEach(function(childData) {
            productData.push(childData.val());
          }),
            setData(productData);
        });
    } else {
    }
  });

  return (
    <ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>My favorite</Text>
      </LinearGradient>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
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
              });
            }}>
            <View style={Styles.ViewBookLikes}>
              <View style={Styles.ViewImg}>
                <Image style={Styles.imgBook} source={{uri: item.img}} />
              </View>
              <View style={Styles.ViewText}>
                <Text style={Styles.nameBook}>{item.nameBook}</Text>
                <Text style={Styles.priceBook}>{item.price}.000đ</Text>
                <Text style={Styles.nameBook}>{item.catalog}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}
