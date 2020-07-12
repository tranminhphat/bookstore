import {Dimensions} from 'react-native';
const W = Dimensions.get('window').width;
const w = Dimensions.get('window').width / 2;
const h = Dimensions.get('window').height;
const Styles = {
  linearGradienth2: {
    height: (W * 3) / 14,
    borderRadius: 40,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerContainer: {
    backgroundColor: '#fce38a',
    height: 60,
    opacity: 1,
    textAlign: 'center',
  },
  goBackIcon: {
    marginLeft: 10,
    marginTop: 15,
  },
  headerText: {
    marginTop: 24,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  ViewBookLikes: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 15,
  },
  ViewImg: {
    padding: 15,
  },
  imgBook: {
    padding: 10,
    width: 100,
    height: 150,
  },
  ViewText: {
    padding: 15,
  },
  nameBook: {
    fontSize: 20,
  },
  priceBook: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  update: {
    width: 60,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    backgroundColor: '#c8ab3f',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  delete: {
    width: 60,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    backgroundColor: '#63d53e',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  listProduct: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 15,
  },
  addProduct: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'lightblue',
    width: 120,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 280,
  },
};
export default Styles;
