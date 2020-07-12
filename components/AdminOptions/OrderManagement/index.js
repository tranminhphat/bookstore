import * as React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
//import component
import unconfirmedOrder from './unconfirmedOrder.js';
import confirmedOrder from './confirmedOrder.js';

export default function orderManagement() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Unconfirmed Order"
          component={unconfirmedOrder}
          options={{
            tabBarLabel: 'Unconfirmed Order',
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              //   iconName=focused ? 'shop' : 'ios-add';
              iconName = 'create';
              return <Icon name={iconName} color={color} size={size} />;
            },
            title: 'Unconfirmed Order',
            headerMode: 'float',
            headerStyle: {
              backgroundColor: '#1ba9ff',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Tab.Screen
          name="Confirmed Order"
          component={confirmedOrder}
          options={{
            tabBarLabel: 'Confirmed Order',
            tabBarIcon: ({color, size}) => (
              <Icon name="check" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
