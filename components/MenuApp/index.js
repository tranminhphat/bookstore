/* eslint-disable no-unused-vars */
//import library
import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
//import component
import Home from './Home';
import Cart from './Cart';
import Account from './Account';
import Catalog from './Catalog';

//Component của menu dưới (Gồm 3 trang: Trang chủ, giỏ hàng và Tài khoản)
export default function MenuApp() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              //   iconName=focused ? 'shop' : 'ios-add';
              iconName = 'home';
              return <Icon name={iconName} color={color} size={size} />;
            },
            title: 'Home',
            headerMode: 'float',
            headerStyle: {
              backgroundColor: '#1ba9ff',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Tab.Screen
          name="Catalog"
          component={Catalog}
          options={{
            tabBarLabel: 'Catalog',
            tabBarIcon: ({color, size}) => (
              <Icon name="list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({color, size}) => (
              <Icon name="shop" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="My account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color, size}) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
