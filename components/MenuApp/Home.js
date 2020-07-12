/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
//import thư viện
import React, {Component} from 'react';
import {View, ScrollView, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import component
import ProductList from '../Product/ProductList/index.js';
import BestSellerList from '../Product/BestSellerList/index.js';
import SuggestList from '../Product/SuggestList/index.js';
import ProductDetails from '../Product/ProductDetails/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from './style';
import HeaderSearchBar from '../HeaderSearchBar/index.js';
import Cart from './Cart';
import Payment from '../Payment/index';
import Search from '../HeaderSearchBar/search';
import Catalog from '../MenuApp/Catalog';
//Trang chủ

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      height: 0,
    };
  }

  render() {
    return (
      <ScrollView
        scrollEventThrottle={0}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
        ])}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={Styles.linearGradient}
          colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
          <View style={Styles.bar}>
            <HeaderSearchBar onPress={() => alert('ok')} />
          </View>
        </LinearGradient>

        <ProductList />
        {/* 
          <View
            style={{
              borderBottomColor: '#88888875',
              borderBottomWidth: 10,
              padding: 5,
            }}
          /> */}
        <BestSellerList />
        {/* <View
            style={{
              borderBottomColor: '#88888875',
              borderBottomWidth: 10,
              padding: 5,
            }}
          /> */}
        <SuggestList />
      </ScrollView>
    );
  }
}
const Stack = createStackNavigator();
export default class Home extends Component {
  render() {
    return (
      <>
        <NavigationContainer independent={true}>
          {/* <HomePage/> */}
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Catalog" component={Catalog} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
