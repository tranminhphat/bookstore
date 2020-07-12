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
  Input: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    fontSize: 18,
  },
  InputBottom: {
    marginTop: 10,
  },
  ButtomLogin: {
    margin: 10,
    marginTop: 30,
    backgroundColor: 'red',
    padding: 15,
  },
  TextButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 18,
  },
};
export default Styles;
