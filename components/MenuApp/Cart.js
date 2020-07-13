/* eslint-disable no-alert */
/* eslint-disable no-new-object */
//import components
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import data from '../Login/data';
import dataProductList from '../Product/ProductList/data';
import Styles from './style';
import Firebase from '../Firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../Product/ProductDetails/style';
import {ScrollView} from 'react-native-gesture-handler';
import Payment from '../Payment/index';

function CartPage() {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

  var productData = [];
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      Firebase.database()
        .ref('Cart/' + user.uid)
        .once('value', data => {
          data.forEach(function(childData) {
            productData.push(childData.val());
          }),
            setData(productData);
        });
    }
  });
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>My Cart</Text>
      </LinearGradient>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={data}
        renderItem={({item}) => (
          <View style={Styles.ViewBookLikes}>
            <View style={Styles.ViewImg}>
              <Image style={Styles.imgBook} source={{uri: item.image}} />
            </View>
            <View style={Styles.ViewText}>
              <Text style={Styles.nameBook}> Tên sách: {item.nameBook}</Text>
              <Text style={Styles.priceBook}> Giá: {item.price}.000đ</Text>
            </View>
            <View style={{marginTop: 5, left: 70}}>
              <TouchableOpacity
              // onclick={() => {
              //   Firebase.database()
              //     .ref('Cart/' + userId + '/' + item.idBook)
              //     .remove();
              // }}
              >
                <Icon name="clear" size={35} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.btnCart}>
        <Button
          style={styles.btnCart}
          title="Thanh toán"
          color="#000"
          onPress={() =>
            navigation.navigate('Payment', {
              data: data,
            })
          }
        />
      </View>
    </>
  );
}

//Trang giỏ hàng
const Stack = createStackNavigator();
export default class Cart extends Component {
  render() {
    return (
      <>
        <NavigationContainer independent={true}>
          {/* <HomePage/> */}
          <Stack.Navigator
            initialRouteName="Cart"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Cart" component={CartPage} />
            <Stack.Screen name="Payment" component={Payment} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
