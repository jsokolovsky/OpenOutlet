import {getCurrentMarkers, getAboutAnimated, getToolbarID} from '../selectors/selectors'
import {fork, select, put, call, take} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'

import {Animated} from 'react-native'

import * as actions from '../actions/actions'

import Dimensions from 'Dimensions'

var WIDTH = -Dimensions.get('window').width

export function* firstSaga() {
  //yield call(""START", initialSetup) TO DO run in parallel get first marker and get up component
  console.log('entered first saga with state');
  console.log(yield select())
  yield fork(toolBarSaga);
    yield* takeLatest('REGION_CHANGED', regionChanged)
}

function* toolBarSaga(){
  while (true) {
    const action = yield take('TOOLBAR_SELECT');
    if (action.toolbarActionID===-1){
      yield put(actions.updateToolbarID(0));
      const aboutAnimated = yield select(getAboutAnimated);
      Animated.timing(
        aboutAnimated,
        {toValue: WIDTH}
      ).start();
    } else {
    var toolbarID = yield select(getToolbarID);
    if (toolbarID===0) {
      if (action.toolbarActionID===0){
        yield put(actions.updateToolbarID(1));
        const aboutAnimated = yield select(getAboutAnimated);
        Animated.timing(aboutAnimated,
        {toValue: 0}
        ).start();
      }
    }
    else {
      yield put(actions.updateToolbarID(0));
      const aboutAnimated = yield select(getAboutAnimated);
      Animated.timing(aboutAnimated,
      {toValue: WIDTH}
      ).start();
    }
  }
  }
}

function* closeAbout() {
  const aboutAnimated = yield select(getAboutAnimated);
  Animated.timing(
    aboutAnimated,
    {toValue: 150}
  ).start();
}

function* openAbout() {
  const aboutAnimated = yield select(getAboutAnimated);
  Animated.timing(aboutAnimated,
  {toValue: 0}
  ).start();
}

function* regionChanged(action) {
  try {
    console.log('in regionChanged with action');
    console.log(action);
    console.log('and state');
    console.log(yield select())
    yield put(actions.updateRegionInState(action.region));

    //let currentMarkers = yield select(getCurrentMarkers);
    //gets new location window range and lat/long of reqgion to query for new markers
    let minLat = (action.region.latitude - action.region.latitudeDelta*0.6).toString().substring(0, 8);
    let maxLat = (action.region.latitude + action.region.latitudeDelta*0.6).toString().substring(0, 8);
    let minLong = (action.region.longitude - action.region.longitudeDelta*0.6).toString().substring(0, 8);
    let maxLong = (action.region.longitude + action.region.longitudeDelta*0.6).toString().substring(0, 8);
    let queryParams = [minLat, maxLat, minLong, maxLong];
    console.log(queryParams);
    let stationQ = action.dataBase.objects('Station').filtered('latitude > $0 AND latitude < $1 AND longitude > $2 AND longitude < $3', ...queryParams);

    console.log(stationQ);
    let newMarkers= {};
    let length = stationQ.length;
    console.log(length);
    //get all mnew markers and then update the displayed markers
    for (var i = 0; i < length; i++){
      let locObj = stationQ[i];
      newMarkers[locObj.key] = createMarkerObject(locObj);
    }
    console.log(newMarkers)
    yield put(actions.updateMarkers(newMarkers));

  }
   catch (error) {
     console.log(error);
   }
}

function createMarkerObject(locObj){
  return {loc: {
    latitude: locObj.latitude,
    longitude: locObj.longitude,
  }};
}
/*function* updateDataBase(newKeys, keysToRemove, dataBase) {
  try{
    console.log('updating database');
    console.log(newKeys);
    dataBase.write(() => {
      keysToRemove.map((key) => {
        dataBase.create('Station', {key: key, active: 0}, true);
      })
        newKeys.map((key) => {
        dataBase.create('Station', {key: key, active: 1}, true);
      })
    })
  }
  catch (error) {

  }
}*/
