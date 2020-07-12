import {Dimensions} from 'react-native';
const W = Dimensions.get('window').width;
const w = Dimensions.get('window').width / 2;
const h = Dimensions.get('window').height;
const styles = {
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
  headerContainer: {
    backgroundColor: '#fce38a',
    height: 60,
    opacity: 1,
  },
  orderContainer: {
    flex: 1,
    fontFamily: 'Arial, san-serif',
    backgroundColor: '#DDD',
    width: 373,
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  orderInfo: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: (88, 88, 88),
  },
  infoChild: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: '#5edc17',
  },
  infoChild1: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: '#e0310e',
  },
  detailButton: {
    position: 'absolute',
    left: 230,
    bottom: 100,
    backgroundColor: '#03A9F485',
    width: 130,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  detailButtonText: {
    textAlign: 'center',
  },
  cancelButton: {
    position: 'absolute',
    left: 230,
    bottom: 30,
    backgroundColor: '#fb9a55',
    width: 130,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
  },
  goBackIcon: {
    marginLeft: 10,
    marginTop: 15,
  },
};
export default styles;
