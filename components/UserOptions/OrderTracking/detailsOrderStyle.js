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
  detailsContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    height: 250,
    backgroundColor: '#DDD',
    borderRadius: 10,
  },
  infoContainer: {
    position: 'absolute',
    left: 170,
  },
  detailsHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: (88, 88, 88),
  },
  detailsInfo: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: '#5edc17',
  },
  imageStyle: {
    position: 'absolute',
    marginLeft: 30,
    padding: 10,
    top: 50,
    width: 100,
    height: 150,
  },
  goBackIcon: {
    marginLeft: 10,
    marginTop: 15,
  },
};
export default styles;
