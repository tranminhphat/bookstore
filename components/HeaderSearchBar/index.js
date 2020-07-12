/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import styles from './style';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {createFilter, setSearchUpdate} from 'react-native-search-filter';

export default function HeaderSearchBar() {
  const navigation = useNavigation();

  // console.log(filterBook);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>JSAddicted</Text>
      <View>
        <TextInput
          placeholder="Search"
          style={styles.searchBar}
          onChangeText={val => setSearchUpdate(val)}
        />
        <Icon
          name="search"
          size={28}
          color="black"
          style={styles.icon}
          onPress={() => navigation.navigate('Search')}
        />
      </View>
    </View>
  );
}
