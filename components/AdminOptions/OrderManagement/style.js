/* eslint-disable no-unused-vars */
import {Dimensions} from 'react-native';
const W = Dimensions.get('window').width;
const w = Dimensions.get('window').width / 2;
const h = Dimensions.get('window').height;
const styles = {
  headerContainer: {
    backgroundColor: '#fce38a',
    height: 60,
    opacity: 1,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    bottom: 35,
  },
  goBackIcon: {
    marginLeft: 10,
    marginTop: 15,
  },
  unconfirmedContainer: {
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
  confirmedContainer: {
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
  orderInfo: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: (88, 88, 88),
  },
  infoContent: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: '#5edc17',
  },
  infoContent1: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: '#e0310e',
  },
  confirmButton: {
    backgroundColor: '#000',
  },
};
export default styles;
