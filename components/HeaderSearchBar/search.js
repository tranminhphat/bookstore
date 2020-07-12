/* eslint-disable react-hooks/rules-of-hooks */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import Firebase from '../Firebase';
import {createFilter, setSearchUpdate} from 'react-native-search-filter';
import {useNavigation} from '@react-navigation/native';

export default function search({route}) {
  const navigation = useNavigation();
  const KEYS_TO_FILTERS = ['name'];
  const [searchUpdated, setSearchUpdate] = React.useState('');
  let arrBook = [];
  const [listBook, setlistBook] = React.useState([]);
  Firebase.database()
    .ref('product')
    .once('value', data => {
      data.forEach(function(childData) {
        arrBook.push(childData.val());
      }),
        setlistBook(arrBook);
    });

  const filterBook = listBook.filter(
    createFilter(searchUpdated, KEYS_TO_FILTERS),
  );
  return (
    <View style={(styles.container, styles.ViewSearch)}>
      <TextInput
        placeholder="Search"
        style={styles.textInputSearch}
        onChangeText={val => setSearchUpdate(val)}
      />
      <ScrollView>
        {filterBook.map(book => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  id: book.id,
                  name: book.name,
                  price: book.price,
                  img: book.img,
                  catalog: book.catalog,
                  supplier: book.supplier,
                  size: book.size,
                  translator: book.translator,
                  typeofcover: book.typeofcover,
                  pagesnumber: book.pagesnumber,
                  publisher: book.publisher,
                })
              }
              key={book.id}
              style={styles.item}>
              <View>
                <Text>{book.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
