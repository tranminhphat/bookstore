/* eslint-disable react-hooks/rules-of-hooks */
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './style';
import Firebase from '../../Firebase';

function CreateBook(
  catalog,
  name,
  image,
  pagesNumber,
  price,
  publisher,
  size,
  translator,
  supplier,
  typeOfCover,
) {
  let arrId = [];
  Firebase.database()
    .ref('product')
    .once('value', data => {
      data.forEach(function(children) {
        // children.id;
        arrId.push(children.val().id);
      });
    })
    .then(() => {
      let id = Math.max.apply(Math, arrId) + 1;
      let x = '0' + id;
      let pricee = Number(price);
      Firebase.database()
        .ref('product/' + x)
        .set({
          bought: 0,
          catalog: catalog,
          id: id,
          img: image,
          name: name,
          pagesnumber: pagesNumber,
          price: pricee,
          publisher: publisher,
          size: size,
          supplier: supplier,
          translator: translator,
          typeofcover: typeOfCover,
        })
        .then(() => {
          alert('Thêm sản phẩm thành công');
        });
    });
}

export default function createProduct({navigation}) {
  const [catalog, setCatalog] = React.useState('');
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState('');
  const [pagesNumber, setPagesNumber] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [publisher, setPublisher] = React.useState('');
  const [size, setSize] = React.useState('');
  const [translator, setTranslator] = React.useState('');
  const [supplier, setSupplier] = React.useState('');
  const [typeOfCover, setTypeOfCover] = React.useState('');
  return (
    <ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>Create Product</Text>
      </LinearGradient>
      <View style={Styles.scrollView}>
        <View>
          <Text style={Styles.textLabel}>Tên sách</Text>
          <TextInput
            placeholder="Nhập tên sách"
            style={Styles.inputField}
            placeholderTextColor="#AAA"
            onChangeText={val => setName(val)}
            value={name}
          />
        </View>
        <View>
          <Text style={Styles.textLabel}>Thể loại</Text>
          <TextInput
            placeholder="Nhập thể loại"
            style={Styles.inputField}
            placeholderTextColor="#AAA"
            onChangeText={val => setCatalog(val)}
            value={catalog}
          />
        </View>
        <View>
          <Text style={Styles.textLabel}>Hình ảnh</Text>
          <TextInput
            placeholder="Nhập hình ảnh"
            style={Styles.inputField}
            placeholderTextColor="#AAA"
            onChangeText={val => setImage(val)}
            value={image}
          />
        </View>
        <View style={Styles.twoColumn}>
          <View style={Styles.column}>
            <Text style={Styles.textLabel}>Giá tiền</Text>
            <TextInput
              placeholder="Nhập giá tiền"
              style={Styles.inputField}
              placeholderTextColor="#AAA"
              onChangeText={val => setPrice(val)}
              value={price}
            />
          </View>
          <View style={Styles.column}>
            <Text style={Styles.textLabel}>Số trang</Text>
            <TextInput
              placeholder="Nhập số trang"
              style={Styles.inputField}
              placeholderTextColor="#AAA"
              onChangeText={val => setPagesNumber(val)}
              value={pagesNumber}
            />
          </View>
        </View>

        <View>
          <Text style={Styles.textLabel}>Nhà xuất bản</Text>
          <TextInput
            placeholder="Nhập nhà xuất bản"
            style={Styles.inputField}
            placeholderTextColor="#AAA"
            onChangeText={val => setPublisher(val)}
            value={publisher}
          />
        </View>
        <View>
          <Text style={Styles.textLabel}>Kích thước</Text>
          <TextInput
            placeholder="Nhập kích thước"
            style={Styles.inputField}
            placeholderTextColor="#AAA"
            onChangeText={val => setSize(val)}
            value={size}
          />
        </View>
        <View>
          <Text style={Styles.textLabel}>Nhà cung cấp</Text>
          <TextInput
            placeholder="Nhập nhà cung cấp"
            style={Styles.inputField}
            placeholderTextColor="#AAA"
            onChangeText={val => setSupplier(val)}
            value={supplier}
          />
        </View>
        <View>
          <Text style={Styles.textLabel}>Nhóm dịch</Text>
          <TextInput
            placeholder="Nhập nhóm dịch"
            style={Styles.inputField}
            placeholderTextColor="#AAA"
            onChangeText={val => setTranslator(val)}
            value={translator}
          />
        </View>
        <View>
          <Text style={Styles.textLabel}>Loại bìa</Text>
          <TextInput
            placeholder="Nhập loại bìa"
            style={Styles.inputField}
            placeholderTextColor="#AAA"
            onChangeText={val => setTypeOfCover(val)}
            value={typeOfCover}
          />
        </View>
        <TouchableOpacity
          style={Styles.btnAdd}
          onPress={() =>
            CreateBook(
              catalog,
              name,
              image,
              pagesNumber,
              price,
              publisher,
              size,
              translator,
              supplier,
              typeOfCover,
            )
          }>
          <Text style={Styles.textBtn}>Thêm sách</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
