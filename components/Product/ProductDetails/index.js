/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-new-object */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import Styles from '../../MenuApp/style';
import Firebase from '../../Firebase';
import {AirbnbRating} from 'react-native-ratings';
import {FlatList} from 'react-native-gesture-handler';

const LineBreak = () => {
  return (
    <>
      <View
        style={{
          borderBottomColor: '#BBB',
          borderBottomWidth: 6,
          padding: 5,
          width: '90%',
          marginLeft: 20,
          marginBottom: 20,
          marginTop: 20,
        }}
      />
    </>
  );
};

function clickFavoriteBook(
  idBook,
  nameBook,
  image,
  price,
  catalog,
  pagesnumber,
  publisher,
  size,
  supplier,
  translator,
  typeofcover,
) {
  let userId;
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userId = user.uid;
      Firebase.database()
        .ref('likeBook/' + userId)
        .once('value', data => {
          data.forEach(function(childData) {});
        })
        .then(() => {
          let i = 0;
          Firebase.database()
            .ref('likeBook/' + userId)
            .once('value', data => {
              data.forEach(function(childData) {
                if (childData.val().idBook === idBook) {
                  i = 1;
                }
              });
            })
            .then(() => {
              if (i === 0) {
                Firebase.database()
                  .ref('likeBook/' + userId + '/' + idBook)
                  .set({
                    idBook: idBook,
                    nameBook: nameBook,
                    img: image,
                    price: price,
                    catalog: catalog,
                    pagesnumber: pagesnumber,
                    publisher: publisher,
                    size: size,
                    supplier: supplier,
                    translator: translator,
                    typeofcover: typeofcover,
                  })
                  .then(() => {
                    alert('Đã thêm vào danh sách yêu thích');
                  });
              } else {
                Firebase.database()
                  .ref('likeBook/' + userId + '/' + idBook)
                  .remove()
                  .then(() => {
                    alert('Đã hủy yêu thích');
                  });
              }
            });
        });
    } else {
      // No user is signed in.
      alert('Bạn chưa đăng nhập');
    }
  });
}

function addToCart(
  idBook,
  nameBook,
  image,
  price,
  catalog,
  supplier,
  translator,
  publisher,
) {
  let userId;
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userId = user.uid;
      Firebase.database()
        .ref('Cart/' + userId)
        .once('value', data => {
          data.forEach(function(childData) {});
        })
        .then(() => {
          let i = 0;
          Firebase.database()
            .ref('Cart/' + userId)
            .once('value', data => {
              data.forEach(function(childData) {
                if (childData.val().idBook === idBook) {
                  i = 1;
                }
              });
            })
            .then(() => {
              if (i === 0) {
                Firebase.database()
                  .ref('Cart/' + userId + '/' + idBook)
                  .set({
                    idBook: idBook,
                    nameBook: nameBook,
                    image: image,
                    price: price,
                    catalog: catalog,
                    supplier: supplier,
                    translator: translator,
                    publisher: publisher,
                  });
                alert('Đã thêm vào giỏ hàng');
              }
            });
        });
    } else {
      // No user is signed in.
      alert('Bạn chưa đăng nhập');
    }
  });
}

function sendComment(idBook, comment) {
  var userId;
  var x = 1;
  var date = new Date().toLocaleString();
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userId = user.uid;
      Firebase.database()
        .ref('Comment')
        .once('value', data => {
          data.forEach(function(childData) {
            x++;
          });
        })
        .then(() => {
          Firebase.database()
            .ref('Comment/' + x)
            .set({
              idBook: idBook,
              idUser: userId,
              comment: comment,
              date: date,
            });
        });
      alert('Đã gửi');
    } else {
      // No user is signed in.
      alert('Bạn chưa đăng nhập');
    }
  });
}

export default function ProductDetails({route, navigation}) {
  const [favoriteButton, setState] = React.useState(0);
  const [ratingData, setRatingData] = React.useState(new Object());
  const [comment, setComment] = React.useState('');
  const [commentData, setCommentData] = React.useState([]);
  const ratingCompleted = rating => {
    var ratingNumber = [
      0,
      'oneStars',
      'twoStars',
      'threeStars',
      'fourStars',
      'fiveStars',
    ];
    var ratingName = ratingNumber[rating];
    Firebase.database()
      .ref('productRatings/' + route.params?.id + '/' + ratingName)
      .transaction(function(ratingName) {
        if (ratingName) {
          ratingName++;
        }
        return ratingName;
      });
  };
  var temp = [];

  //Get comments data
  Firebase.database()
    .ref('Comment')
    .once('value', data => {
      data.forEach(childData => {
        var idBook = childData.child('idBook').toJSON();
        if (idBook === route.params?.id) {
          temp.push(childData.val());
        }
      });
      setCommentData(temp);
    });

  //Get products rating data
  Firebase.database()
    .ref('productRatings/' + route.params?.id)
    .once('value', data => {
      setRatingData(data.val());
    });

  return (
    <>
      <View style={styles.headerContainer}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={Styles.linearGradienth2}
          colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="keyboard-backspace"
              size={35}
              color="black"
              style={styles.goBackIcon}
            />
          </TouchableOpacity>
          <View style={{marginTop: 15, left: 300}}>
            <TouchableOpacity
              onPress={() => {
                clickFavoriteBook(
                  route.params?.id,
                  route.params?.name,
                  route.params?.img,
                  route.params?.price,
                  route.params?.catalog,
                  route.params?.pagesnumber,
                  route.params?.publisher,
                  route.params?.size,
                  route.params?.supplier,
                  route.params?.translator,
                  route.params?.typeofcover,
                ),
                  favoriteButton ? setState(0) : setState(1);
              }}>
              <Icon
                name="favorite"
                size={35}
                color="#000"
                style={
                  favoriteButton ? styles.favoriteIcon1 : styles.favoriteIcon0
                }
              />
            </TouchableOpacity>
            <View />
          </View>
          <View style={{bottom: 85, left: 260}}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Icon name="local-grocery-store" size={35} color="black" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <ScrollView style={styles.container}>
        <View>
          <Image style={styles.bookCover} source={{uri: route.params?.img}} />
          <Text style={styles.bookInformation}>Name: {route.params?.name}</Text>
          <Text style={styles.bookInformation}>
            Price: {route.params?.price}.000đ
          </Text>
          <View style={styles.btnBuy}>
            <Button
              style={styles.btnBuy}
              title="Chọn mua"
              color="#000"
              onPress={() =>
                navigation.navigate('Payment', {
                  data: [
                    {
                      id: route.params?.id,
                      nameBook: route.params?.name,
                      price: route.params?.price,
                      image: route.params?.img,
                      catalog: route.params?.catalog,
                      supplier: route.params?.supplier,
                      size: route.params?.size,
                      translator: route.params?.translator,
                      typeofcover: route.params?.typeofcover,
                      pagesnumber: route.params?.pagesnumber,
                      publisher: route.params?.publisher,
                    },
                  ],
                })
              }
            />
          </View>
          <View style={styles.btnBuy}>
            <Button
              style={styles.btnBuy}
              title="Thêm vào giỏ hàng"
              color="#fce38a"
              onPress={() =>
                addToCart(
                  route.params?.id,
                  route.params?.name,
                  route.params?.img,
                  route.params?.price,
                  route.params?.catalog,
                  route.params?.supplier,
                  route.params?.translator,
                  route.params?.publisher,
                )
              }
            />
          </View>
        </View>
        <LineBreak />
        <View style={styles.benefit}>
          <Text style={styles.benefitInfo}>Bồi thường 111% nếu hàng giả</Text>
          <Text style={styles.benefitInfo}>
            Kiểm tra hàng hóa khi nhận hàng
          </Text>
          <Text style={styles.benefitInfo}>
            Đổi trả trong vòng 30 ngày nếu sản phẩm bị lỗi
          </Text>
        </View>
        <LineBreak />
        <View>
          <Text style={styles.header}>Mô tả sản phẩm</Text>
          <View style={styles.productInfoContainer}>
            <Text style={styles.productInfoHeader}>Danh mục:</Text>
            <Text style={styles.productInfo}>{route.params?.catalog}</Text>
          </View>
          <View style={styles.productInfoContainer}>
            <Text style={styles.productInfoHeader}>Cung cấp bởi:</Text>
            <Text style={styles.productInfo}>{route.params?.supplier}</Text>
          </View>
          <View style={styles.productInfoContainer}>
            <Text style={styles.productInfoHeader}>Kích thước:</Text>
            <Text style={styles.productInfo}>{route.params?.size}</Text>
          </View>
          <View style={styles.productInfoContainer}>
            <Text style={styles.productInfoHeader}>Dịch giả:</Text>
            <Text style={styles.productInfo}>{route.params?.translator}</Text>
          </View>
          <View style={styles.productInfoContainer}>
            <Text style={styles.productInfoHeader}>Loại bìa:</Text>
            <Text style={styles.productInfo}>{route.params?.typeofcover}</Text>
          </View>
          <View style={styles.productInfoContainer}>
            <Text style={styles.productInfoHeader}>Số trang:</Text>
            <Text style={styles.productInfo}>{route.params?.pagesnumber}</Text>
          </View>
          <View style={styles.productInfoContainer}>
            <Text style={styles.productInfoHeader}>Nhà xuất bản:</Text>
            <Text style={styles.productInfo}>{route.params?.publisher}</Text>
          </View>
        </View>
        <LineBreak />
        <View style={styles.ratingComponent}>
          <Text style={styles.header}>Đánh giá sản phẩm:</Text>
          <Text style={styles.productInfoHeader}>
            5 sao: {ratingData.fiveStars} lượt
          </Text>
          <Text style={styles.productInfoHeader}>
            4 sao: {ratingData.fourStars} lượt
          </Text>
          <Text style={styles.productInfoHeader}>
            3 sao: {ratingData.threeStars} lượt
          </Text>
          <Text style={styles.productInfoHeader}>
            2 sao: {ratingData.twoStars} lượt
          </Text>
          <Text style={styles.productInfoHeader}>
            1 sao: {ratingData.oneStars} lượt
          </Text>
          <AirbnbRating
            defaultRating={0}
            showRating
            onFinishRating={ratingCompleted}
          />
        </View>
        <LineBreak />
        <View style={styles.commentContainer}>
          <Text style={styles.header}>Bình luận về sản phẩm:</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={commentData}
            renderItem={({item}) => (
              <View style={styles.commentSection}>
                <Text style={styles.commentDate}>
                  <Text style={{fontWeight: 'bold', fontFamily: 'monospace'}}>
                    Date:{' '}
                  </Text>
                  {item.date}
                </Text>
                <Text style={styles.commentIdUser}>
                  <Text style={{fontWeight: 'bold', fontFamily: 'monospace'}}>
                    User ID:{' '}
                  </Text>
                  {item.idUser}
                </Text>
                <Text style={styles.commentContent}>
                  <Text style={{fontWeight: 'bold', fontFamily: 'monospace'}}>
                    Comment:{' '}
                  </Text>
                  {item.comment}
                </Text>
              </View>
            )}
          />
          <TextInput
            placeholder="Nhập bình luận của bạn"
            style={[styles.commentText]}
            placeholderTextColor="#AAA"
            onChangeText={val => setComment(val)}
            value={comment}
          />
          <View style={styles.commentButton}>
            <Button
              style={styles.commentButton}
              title="Gửi"
              color="#03A9F4"
              onPress={() => sendComment(route.params?.id, comment)}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
