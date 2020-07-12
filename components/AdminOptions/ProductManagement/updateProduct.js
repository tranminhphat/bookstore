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

import Styles from './styleUpdate';
import Firebase from '../../Firebase';

function UpdateBook(
  id,
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
  let x = '0' + id;
  let pricee = Number(price);
  Firebase.database()
    .ref('product/' + x)
    .update({
      catalog: catalog,
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
      alert('Cập nhật sản phẩm thành công');
    });
}

export default function UpdateProduct({route, navigation}) {
  const [id, setId] = React.useState(route.params?.id);
  const [catalog, setCatalog] = React.useState(route.params?.catalog);
  const [name, setName] = React.useState(route.params?.name);
  const [image, setImage] = React.useState(route.params?.img);
  const [pagesNumber, setPagesNumber] = React.useState(
    route.params?.pagesnumber,
  );
  let pricee = String(route.params?.price);
  const [price, setPrice] = React.useState(pricee);
  const [publisher, setPublisher] = React.useState(route.params?.publisher);
  const [size, setSize] = React.useState(route.params?.size);
  const [translator, setTranslator] = React.useState(route.params?.translator);
  const [supplier, setSupplier] = React.useState(route.params?.supplier);
  const [typeOfCover, setTypeOfCover] = React.useState(
    route.params?.typeofcover,
  );
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={Styles.headerContainer}>
          <Icon
            name="keyboard-backspace"
            size={35}
            color="white"
            style={Styles.goBackIcon}
          />

          <Text style={Styles.headerText}>Update Product</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={Styles.scrollView}>
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
            UpdateBook(
              id,
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
          <Text style={Styles.textBtn}>Cập nhật sách</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
