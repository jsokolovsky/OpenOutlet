

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  BackAndroid,
  Animated,
} from 'react-native';

import Dimensions from 'Dimensions'

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import OpenOutletReducer from './reducers/mapReducer.js';
import MapContainer from './MapContainer';

import {firstSaga} from './sagas/sagas';

import {changeToolBar} from './actions/actions';

const Realm = require('realm');
//temporary database simulator
var tempLocData = [
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.3299, type: 1, solar: 0, key: 0},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.3099, type: 1, solar: 0, key: 1},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.2899, type: 1, solar: 0, key: 2},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.2699, type: 1, solar: 0, key: 3},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.2499, type: 1, solar: 0, key: 4},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.2299, type: 1, solar: 0, key: 5},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.2099, type: 1, solar: 0, key: 6},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.1899, type: 1, solar: 0, key: 7},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.1699, type: 1, solar: 0, key: 8},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.201969, longitude: -72.1499, type: 1, solar: 0, key: 9},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.3299, type: 1, solar: 0, key: 10},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.3099, type: 1, solar: 0, key: 11},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.2899, type: 1, solar: 0, key: 12},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.2699, type: 1, solar: 0, key: 13},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.2499, type: 1, solar: 0, key: 14},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.2299, type: 1, solar: 0, key: 15},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.2099, type: 1, solar: 0, key: 16},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.1899, type: 1, solar: 0, key: 17},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.1699, type: 1, solar: 0, key: 18},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.221969, longitude: -72.1499, type: 1, solar: 0, key: 19},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.3299, type: 1, solar: 0, key: 20},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.3099, type: 1, solar: 0, key: 21},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.2899, type: 1, solar: 0, key: 22},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.2699, type: 1, solar: 0, key: 23},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.2499, type: 1, solar: 0, key: 24},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.2299, type: 1, solar: 0, key: 25},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.2099, type: 1, solar: 0, key: 26},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.1899, type: 1, solar: 0, key: 27},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.1699, type: 1, solar: 0, key: 28},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.241969, longitude: -72.1499, type: 1, solar: 0, key: 29},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.3299, type: 1, solar: 0, key: 30},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.3099, type: 1, solar: 0, key: 31},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.2899, type: 1, solar: 0, key: 32},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.2699, type: 1, solar: 0, key: 33},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.2499, type: 1, solar: 0, key: 34},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.2299, type: 1, solar: 0, key: 35},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.2099, type: 1, solar: 0, key: 36},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.1899, type: 1, solar: 0, key: 37},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.1699, type: 1, solar: 0, key: 38},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.261969, longitude: -72.1499, type: 1, solar: 0, key: 39},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.3299, type: 1, solar: 0, key: 40},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.3099, type: 1, solar: 0, key: 41},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.2899, type: 1, solar: 0, key: 42},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.2699, type: 1, solar: 0, key: 43},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.2499, type: 1, solar: 0, key: 44},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.2299, type: 1, solar: 0, key: 45},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.2099, type: 1, solar: 0, key: 46},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.1899, type: 1, solar: 0, key: 47},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.1699, type: 1, solar: 0, key: 48},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.281969, longitude: -72.1499, type: 1, solar: 0, key: 49},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.3299, type: 1, solar: 0, key: 50},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.3099, type: 1, solar: 0, key: 51},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.2899, type: 1, solar: 0, key: 52},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.2699, type: 1, solar: 0, key: 53},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.2499, type: 1, solar: 0, key: 54},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.2299, type: 1, solar: 0, key: 55},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.2099, type: 1, solar: 0, key: 56},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.1899, type: 1, solar: 0, key: 57},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.1699, type: 1, solar: 0, key: 58},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.301969, longitude: -72.1499, type: 1, solar: 0, key: 59},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.3299, type: 1, solar: 0, key: 60},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.3099, type: 1, solar: 0, key: 61},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.2899, type: 1, solar: 0, key: 62},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.2699, type: 1, solar: 0, key: 63},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.2499, type: 1, solar: 0, key: 64},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.2299, type: 1, solar: 0, key: 65},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.2099, type: 1, solar: 0, key: 66},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.1899, type: 1, solar: 0, key: 67},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.1699, type: 1, solar: 0, key: 68},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.321969, longitude: -72.1499, type: 1, solar: 0, key: 69},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.3299, type: 1, solar: 0, key: 70},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.3099, type: 1, solar: 0, key: 71},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.2899, type: 1, solar: 0, key: 72},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.2699, type: 1, solar: 0, key: 73},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.2499, type: 1, solar: 0, key: 74},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.2299, type: 1, solar: 0, key: 75},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.2099, type: 1, solar: 0, key: 76},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.1899, type: 1, solar: 0, key: 77},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.1699, type: 1, solar: 0, key: 78},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.341969, longitude: -72.1499, type: 1, solar: 0, key: 79},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.3299, type: 1, solar: 0, key: 80},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.3099, type: 1, solar: 0, key: 81},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.2899, type: 1, solar: 0, key: 82},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.2699, type: 1, solar: 0, key: 83},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.2499, type: 1, solar: 0, key: 84},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.2299, type: 1, solar: 0, key: 85},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.2099, type: 1, solar: 0, key: 86},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.1899, type: 1, solar: 0, key: 87},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.1699, type: 1, solar: 0, key: 88},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.361969, longitude: -72.1499, type: 1, solar: 0, key: 89},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.3299, type: 1, solar: 0, key: 90},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.3099, type: 1, solar: 0, key: 91},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.2899, type: 1, solar: 0, key: 92},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.2699, type: 1, solar: 0, key: 93},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.2499, type: 1, solar: 0, key: 94},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.2299, type: 1, solar: 0, key: 95},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.2099, type: 1, solar: 0, key: 96},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.1899, type: 1, solar: 0, key: 97},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.1699, type: 1, solar: 0, key: 98},
{name: 'SOME NAME', firstLine: '123 5th Avenue', secondLine: 'New York, NY, 00000', latitude: 41.381969, longitude: -72.1499, type: 1, solar: 0, key: 99},
]


const store = createStore(
  OpenOutletReducer,
  {initialRegion: {longitude:-72.22988091, latitude:41.30969427, latitudeDelta: 0.0461, longitudeDelta: 0.0211}, toolbarID: 0, aboutScreenState: 0, aboutAnimated: new Animated.Value(-Dimensions.get('window').width)},
  applyMiddleware(createSagaMiddleware(firstSaga))
);
//database schema
var StationSchema = {
  name: 'Station',
  primaryKey: 'key',
  properties: {
    name: {type: 'string', optional: true},
    firstLine: 'string',
    secondLine: 'string',
    latitude: 'double',
    longitude: 'double',
    type: 'float',
    solar: 'float',
    key: 'int',
  }
};

export default class App extends Component {
  //get inital markers before doing initial render
  constructor(props) {
    super(props);
    let realm = new Realm({schema: [StationSchema]});
    //realm.write(() => realm.deleteAll());
    console.log('intiating/cleaning DB');
    if (realm.objects('Station').length===0){
      console.log('new database');
      realm.write(() => {
        tempLocData.map((line)=>{
          realm.create('Station', line);
        });
      });
    }
    console.log('finished writing');
    this.state={dataBase: realm};
  }
  render() {
    console.log('rendering App with state');
    console.log(this.state);
    return (
      <Provider store={store}>
      <MapContainer dataBase={this.state.dataBase}/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


BackAndroid.addEventListener('hardwareBackPress', () => {
  console.log('BACKPRESS IN APP:');

  var {toolbarID}=store.getState();

  console.log(toolbarID);
  if (toolbarID===0) return false;

  store.dispatch(changeToolBar(-1));

  return true;
});
