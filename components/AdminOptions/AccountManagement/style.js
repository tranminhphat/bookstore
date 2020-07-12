import {color} from 'react-native-reanimated';
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
    flexDirection: 'row',
  },
  headerText: {
    marginTop: 24,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  goBackIcon: {
    alignItem: 'center',
    marginLeft: 10,
    marginTop: 15,
  },
  itemAccount: {
    flexDirection: 'row',
    height: 120,
    padding: 10,
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
  thongtin: {
    width: 300,
  },
  Active: {
    backgroundColor: 'green',
    padding: 10,
    color: '#FFF',
    width: 80,
    textAlign: 'center',
    right: 20,
    top: 20,
    borderRadius: 10,
  },
  Disable: {
    backgroundColor: 'red',
    padding: 10,
    color: '#FFF',
    width: 80,
    textAlign: 'center',
    right: 20,
    top: 20,
    borderRadius: 10,
  },
  effect: {
    marginTop: 5,
  },
};
export default Styles;
