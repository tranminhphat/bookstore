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
  headerText: {
    marginTop: 24,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  textLabel: {
    marginTop: 10,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#DDD',
    height: 45,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    fontSize: 13,
    paddingLeft: 10,
  },
  scrollView: {
    marginBottom: 70,
  },
  btnAdd: {
    marginTop: 30,
    marginLeft: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'lightblue',
    width: 120,
    height: 50,
  },
  textBtn: {
    fontWeight: 'bold',
  },
  twoColumn: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  column: {
    flexGrow: 1,
  },
  goBackIcon: {
    marginLeft: 10,
    marginTop: 15,
  },
};
export default Styles;
