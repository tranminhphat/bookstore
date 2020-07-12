/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../Firebase';
// import component
import Styles from './style';
import ProductDetails from '../Product/ProductDetails';

function Catalog1() {
  const navigation = useNavigation();
  var CatalogData = [];

  Firebase.database()
    .ref('Catalog')
    .once('value', data => {
      data.forEach(function(childData) {
        CatalogData.push(childData.val());
      });
    });
  const [data, setData] = React.useState(CatalogData);
  const [x, setx] = React.useState([]); //danh sach sach tong hop
  const [y, sety] = React.useState([]); //danh sach sach khoa hoc
  const [all, setAll] = React.useState([]); //danh sach tat ca sach
  const SachTongHop = function SachTongHop() {
    let ListBook = [];
    let ListBookOfCatalog = [];
    Firebase.database()
      .ref('product')
      .once('value', data => {
        data.forEach(function(childData) {
          ListBook.push(childData.val());
        });
      })
      .then(() => {
        ListBookOfCatalog = ListBook.filter(x => {
          return x.catalog === 'Sách tổng hợp';
        });
        setx(ListBookOfCatalog);
      });
    return (
      <View style={Styles.childCatalogContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          data={x}
          numColumns={2}
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
              <View style={Styles.ViewBook}>
                <View style={Styles.ViewImg}>
                  <Image style={Styles.imgBook} source={{uri: item.img}} />
                </View>
                <View style={Styles.ViewText}>
                  <Text style={Styles.nameBook}>{item.name}</Text>
                  <Text style={Styles.priceBook}>{item.price}.000đ</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const SachKhoaHoc = function SachKhoaHoc() {
    let ListBook = [];
    let ListBookOfCatalog = [];
    Firebase.database()
      .ref('product')
      .once('value', data => {
        data.forEach(function(childData) {
          ListBook.push(childData.val());
        });
      })
      .then(() => {
        ListBookOfCatalog = ListBook.filter(x => {
          return x.catalog === 'Sách khoa học';
        });
        sety(ListBookOfCatalog);
      });
    return (
      <View style={Styles.childCatalogContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          data={y}
          numColumns={2}
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
              <View style={Styles.ViewBook}>
                <View style={Styles.ViewImg}>
                  <Image style={Styles.imgBook} source={{uri: item.img}} />
                </View>
                <View style={Styles.ViewText}>
                  <Text style={Styles.nameBook}>{item.name}</Text>
                  <Text style={Styles.priceBook}>{item.price}.000đ</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  const SachAll = function SachAll() {
    let ListBook = [];
    let ListBookOfCatalog = [];
    Firebase.database()
      .ref('product')
      .once('value', data => {
        data.forEach(function(childData) {
          ListBook.push(childData.val());
        });
      })
      .then(() => {
        setAll(ListBook);
      });
    return (
      <View style={Styles.childCatalogContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          data={all}
          numColumns={2}
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
              <View style={Styles.ViewBook}>
                <View style={Styles.ViewImg}>
                  <Image style={Styles.imgBook} source={{uri: item.img}} />
                </View>
                <View style={Styles.ViewText}>
                  <Text style={Styles.nameBook}>{item.name}</Text>
                  <Text style={Styles.priceBook}>{item.price}.000đ</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const [catalog1, setCatalog1] = React.useState(0);
  const [catalog2, setCatalog2] = React.useState(0);
  const [CatalogAll, setCatalogAll] = React.useState(1);
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>Catalog</Text>
      </LinearGradient>
      <View style={Styles.viewContentCatalog}>
        <View style={{borderWidth: 1, borderColor: '#DDD'}}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    if (item.NameCatalog === 'Tất cả') {
                      setCatalogAll(1);
                    }
                    if (item.NameCatalog === 'Sách tổng hợp') {
                      setCatalog1(1);
                      setCatalog2(0);
                      setCatalogAll(0);
                    }
                    if (item.NameCatalog === 'Sách khoa học') {
                      setCatalog1(0);
                      setCatalog2(1);
                      setCatalogAll(0);
                    }
                  }}
                  style={Styles.catalogButton}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={Styles.catalogButton}
                    colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
                    <Text style={{fontSize: 14, textAlign: 'center'}}>
                      {item.NameCatalog}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
            style={Styles.viewCatalog}
          />
        </View>
        <View style={Styles.viewContentBook}>
          {CatalogAll === 1 ? (
            SachAll()
          ) : catalog1 === 1 ? (
            SachTongHop()
          ) : catalog2 === 1 ? (
            SachKhoaHoc()
          ) : (
            <Text />
          )}
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();
export default function Catalog() {
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Catalog1"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Catalog1" component={Catalog1} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
