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
  imgBook: {
    padding: 10,
    width: 100,
    height: 150,
  },
  ViewImg: {
    padding: 15,
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
  pageHeader: {
    backgroundColor: '#fce38a',
    width: 412,
    height: 60,
    flexDirection: 'row',
  },
  ViewTextHeader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    left: 80,
  },
  goBackIcon: {
    marginLeft: 10,
  },
};
export default Styles;
