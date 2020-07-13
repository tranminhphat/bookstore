/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
//Trang tài khoản khách hàng
//import thư viện
import * as React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
//import component
import Styles from './style';
import Login from '../Login/index';
import ProductLikes from '../UserOptions/ProductLikes/index';
import OrderTracking from '../UserOptions/OrderTracking/index';
import detailsOrder from '../UserOptions/OrderTracking/detailsOrder';
import Firebase from '../Firebase';
import ProductDetails from '../Product/ProductDetails';
import orderManagement from '../AdminOptions/OrderManagement/index';
import createProduct from '../AdminOptions/CreateProduct/index';
import AccountList from '../AdminOptions/AccountManagement/index';
import ProductManagement from '../AdminOptions/ProductManagement/index';
import UpdateProduct from '../AdminOptions/ProductManagement/updateProduct';
import RevenueStatistic from '../AdminOptions/RevenueStatistic/index';

//function truyền tham số từ trang AccountPage sang InformationAccount
function sendParams(hoten, sdt, email, ngaysinh, ngayTao, navigationz) {
  navigationz.navigate('infomationAccount', {
    hoten: hoten,
    sdt: sdt,
    email: email,
    ngaysinh: ngaysinh,
    ngayTao: ngayTao,
  });
}

//hiển thị những option tương ứng với tài khoản User
function ShowOptionUser() {
  const navigation = useNavigation();
  const [idAcc, setIdAcc] = React.useState('');

  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setIdAcc(user.uid);
    } else {
      // No user is signed in.
    }
  });

  return (
    <View style={Styles.ViewOptionMenu}>
      <TouchableOpacity onPress={() => navigation.navigate('OrderTracking')}>
        <View style={Styles.ViewOptionMenuItem}>
          <View style={Styles.ViewIconLeft}>
            <Icon name="list" color={'#BBB'} size={30} />
          </View>
          <View style={Styles.optionText}>
            <Text>Quản lý đơn hàng</Text>
          </View>
          <View style={Styles.ViewIconRight}>
            <Icon
              name="keyboard-arrow-right"
              color={'#BBB'}
              size={30}
              show="always"
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductLikes', {idAcc: idAcc})}>
        <View style={Styles.ViewOptionMenuItem}>
          <View style={Styles.ViewIconLeft}>
            <Icon name="favorite-border" color={'#BBB'} size={30} />
          </View>
          <View style={Styles.optionText}>
            <Text>Sản phẩm yêu thích</Text>
          </View>
          <View style={Styles.ViewIconRight}>
            <Icon
              name="keyboard-arrow-right"
              color={'#BBB'}
              size={30}
              show="always"
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

//hiển thị những option tương ứng với tài khoản User
function ShowOptionAdmin() {
  const navigation = useNavigation();
  return (
    <View style={Styles.ViewOptionMenu}>
      <TouchableOpacity onPress={() => navigation.navigate('orderManagement')}>
        <View style={Styles.ViewOptionMenuItem}>
          <View style={Styles.ViewIconLeft}>
            <Icon name="list" color={'#BBB'} size={30} />
          </View>
          <View style={Styles.optionText}>
            <Text>Quản lý đơn hàng</Text>
          </View>
          <View style={Styles.ViewIconRight}>
            <Icon
              name="keyboard-arrow-right"
              color={'#BBB'}
              size={30}
              show="always"
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductManagement')}>
        <View style={Styles.ViewOptionMenuItem}>
          <View style={Styles.ViewIconLeft}>
            <Icon name="list" color={'#BBB'} size={30} />
          </View>
          <View style={Styles.optionText}>
            <Text>Quản lý sản phẩm</Text>
          </View>
          <View style={Styles.ViewIconRight}>
            <Icon
              name="keyboard-arrow-right"
              color={'#BBB'}
              size={30}
              show="always"
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AccountList')}>
        <View style={Styles.ViewOptionMenuItem}>
          <View style={Styles.ViewIconLeft}>
            <Icon name="list" color={'#BBB'} size={30} />
          </View>
          <View style={Styles.optionText}>
            <Text>Quản lý tài khoản</Text>
          </View>
          <View style={Styles.ViewIconRight}>
            <Icon
              name="keyboard-arrow-right"
              color={'#BBB'}
              size={30}
              show="always"
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RevenueStatistic')}>
        <View style={Styles.ViewOptionMenuItem}>
          <View style={Styles.ViewIconLeft}>
            <Icon name="list" color={'#BBB'} size={30} />
          </View>
          <View style={Styles.optionText}>
            <Text>Thống kê doanh thu</Text>
          </View>
          <View style={Styles.ViewIconRight}>
            <Icon
              name="keyboard-arrow-right"
              color={'#BBB'}
              size={30}
              show="always"
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

//đăng xuất
function logOut(x) {
  Firebase.auth()
    .signOut()
    .then(function() {
      x.navigate('Login');
    })
    .catch(function(error) {
      alert(err);
    });
}

function changeInf(hoten, ngsinh, newP, sdt, email) {
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      if (newP != '') {
        user
          .updatePassword(newP)
          .then(function() {
            // Update successful.
            alert('ok');
          })
          .catch(function(error) {
            // An error happened.
            alert(error);
          });
      }
      let id = user.uid;
      Firebase.database()
        .ref('Users/' + id)
        .set({
          email: email,
          hoten: hoten,
          ngaySinh: ngsinh,
          sdt: sdt,
        })
        .then(() => {
          alert('updated');
        });
    }
  });
}

//trang hiển thị....
function AccountPage({route, navigation}) {
  const [id, setId] = React.useState('');
  const [sdt, setSdt] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [ngaysinh, setNgaySinh] = React.useState('');
  const [ngayTao, setNgayTao] = React.useState('');
  const [loaiTK, setLoaiTK] = React.useState('');
  const [hoten, setHoten] = React.useState('');
  const [roleId, setRoleId] = React.useState('');

  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setId(user.uid);
      setEmail(user.email);
      setNgayTao(user.created);
      Firebase.database()
        .ref('Users/' + id)
        .on('value', data => {
          setHoten(data.val().hoten);
          setNgaySinh(data.val().ngaySinh);
          setSdt(data.val().sdt);
          setLoaiTK(data.val().loaiTK);
          setRoleId(data.val().roleId);
        });
    } else {
      // No user is signed in.
    }
  });

  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>Account</Text>
      </LinearGradient>
      <View>
        {id !== '' ? (
          //màn hình hiển thị nếu có tham số (có đăng nhập)
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('infomationAccount', {
                  hoten: hoten,
                  ngaysinh: ngaysinh,
                  email: email,
                  sdt: sdt,
                })
              }
              style={{height: 70}}>
              <View style={Styles.ViewDangNhap}>
                <View style={Styles.ViewIconLeft}>
                  <Icon name="person" color={'#fce38a'} size={50} />
                </View>
                <View style={Styles.ViewRight}>
                  <Text style={Styles.TextRightBottom}>{hoten}</Text>
                  <Text>{sdt}</Text>
                  <Text>Thành viên từ: 1/6/2020</Text>
                </View>
                <View style={Styles.ViewIconRight}>
                  <Icon
                    name="keyboard-arrow-right"
                    color={'#fce38a'}
                    size={35}
                    show="always"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {roleId === 2 ? <ShowOptionAdmin /> : <ShowOptionUser />}
            <TouchableOpacity
              style={Styles.ButtomLogout}
              onPress={() => logOut(navigation)}>
              <Text style={Styles.TextButton}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        ) : (
          //màn hình hiển thị nếu chưa có tham số (chưa đăng nhập)
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{height: 70}}>
            <View style={Styles.ViewDangNhap}>
              <View style={Styles.ViewIconLeft}>
                <Icon
                  style={Styles.IconLeft}
                  name="person"
                  color={'#1ba9ff'}
                  size={50}
                />
              </View>
              <View style={Styles.ViewRight}>
                <Text style={Styles.TextRight}>Chào mừng bạn đến với...</Text>
                <Text style={Styles.TextRightBottom}>Đăng nhập/Đăng ký</Text>
              </View>
              <View style={Styles.ViewIconRight}>
                <Icon
                  name="keyboard-arrow-right"
                  color={'#1ba9ff'}
                  size={30}
                  show="always"
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

//trang hiển thị thông tin tài khoản
function infomationAccount({route, navigation}) {
  const [hoten, setHoten] = React.useState(route.params.hoten);
  const [ngaysinh, setNgaySinh] = React.useState(route.params.ngaysinh);
  const [email, setEmail] = React.useState(route.params.email);
  const [sdt, setSdt] = React.useState(route.params.sdt);
  const [ngayTao, setNgayTao] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [newPass, setNewPass] = React.useState('');

  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>My Information</Text>
      </LinearGradient>
      <View style={Styles.InforAccountGeneral}>
        <View style={[Styles.InfoAccView]}>
          <Text style={Styles.InfoAccText}>Cá nhân</Text>
        </View>
        <View style={[Styles.InfoAccView]}>
          <TextInput
            onChangeText={val => setHoten(val)}
            value={hoten}
            style={Styles.InfoAccText}
          />
          <TextInput editable={false} value={sdt} style={Styles.InfoAccText} />
          <TextInput
            editable={false}
            value={email}
            style={Styles.InfoAccText}
          />
          <TextInput
            onChangeText={val => setNgaySinh(val)}
            value={ngaysinh}
            style={Styles.InfoAccText}
          />
          <TextInput
            editable={false}
            value={ngayTao}
            style={Styles.InfoAccText}
          />
        </View>
        <View>
          <View style={Styles.ViewCheckBox}>
            <CheckBox value={show} onValueChange={setShow} />
            <Text onPress={() => setHidden(false)}>Đổi mật khấu</Text>
          </View>
          {!show ? (
            <Text />
          ) : (
            <View>
              <TextInput
                placeholder="Nhập mật khẩu mới"
                onChangeText={val => setNewPass(val)}
                style={Styles.InfoAccText}
                secureTextEntry={true}
                placeholderTextColor="#AAA"
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          style={Styles.ButtomSave}
          onPress={() => changeInf(hoten, ngaysinh, newPass, sdt, email)}>
          <Text style={Styles.TextSave}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();
export default function Account() {
  return (
    <>
      <NavigationContainer independent={true}>
        {/* <HomePage/> */}
        <Stack.Navigator
          initialRouteName="AccountPage"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="AccountPage"
            component={AccountPage}
            options={{
              title: 'Account Page',
              headerMode: 'float',
              headerStyle: {
                backgroundColor: '#03A9F4',
              },
              headerTitleStyle: {
                fontFamily: 'Arial',
                fontSize: 24,
                fontWeight: 'bold',
                textShadowRadius: 5,
                color: '#fb9a55',
              },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login Page',
              headerMode: 'float',
              headerStyle: {
                backgroundColor: '#03A9F4',
              },
              headerTitleStyle: {
                fontFamily: 'Arial',
                fontSize: 24,
                fontWeight: 'bold',
                textShadowRadius: 5,
                color: '#fb9a55',
              },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="infomationAccount"
            component={infomationAccount}
            options={{
              title: 'Information Account',
              headerMode: 'float',
              headerStyle: {
                backgroundColor: '#03A9F4',
              },
              headerTitleStyle: {
                fontFamily: 'Arial',
                fontSize: 24,
                fontWeight: 'bold',
                textShadowRadius: 5,
                color: '#fb9a55',
              },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="ProductLikes"
            component={ProductLikes}
            options={{
              title: 'Product Likes',
              headerMode: 'float',
              headerStyle: {
                backgroundColor: '#03A9F4',
              },
              headerTitleStyle: {
                fontFamily: 'Arial',
                fontSize: 24,
                fontWeight: 'bold',
                textShadowRadius: 5,
                color: '#fb9a55',
              },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="orderManagement"
            component={orderManagement}
            options={{
              title: 'Order Management',
              headerMode: 'float',
              headerStyle: {
                backgroundColor: '#03A9F4',
              },
              headerTitleStyle: {
                fontFamily: 'Arial',
                fontSize: 24,
                fontWeight: 'bold',
                textShadowRadius: 5,
                color: '#fb9a55',
              },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="createProduct" component={createProduct} />
          <Stack.Screen name="OrderTracking" component={OrderTracking} />
          <Stack.Screen name="detailsOrder" component={detailsOrder} />
          <Stack.Screen name="AccountList" component={AccountList} />
          <Stack.Screen
            name="ProductManagement"
            component={ProductManagement}
          />
          <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
          <Stack.Screen name="RevenueStatistic" component={RevenueStatistic} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
