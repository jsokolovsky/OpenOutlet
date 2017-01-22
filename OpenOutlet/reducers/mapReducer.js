
const initialState = {
  currentRegion: {},
  currentMarkers: {},
  calloutLoc: {},
}

function updateRegion(state, action) {
  switch (action.type) {
    case 'UPDATE_REGION':
    return Object.assign({}, state, {currentRegion: action.region});
    default: return state;
  }
}

function calloutButtonReducer( state , action) {
  switch (action.type) {
    case 'OPEN_NAV_BUTTON': {
      return Object.assign({}, state, {calloutLoc: action.location})
    }
    case 'CLOSE_CALLOUT': {
      return Object.assign({}, state, {calloutLoc: null})
    }
    default: return state;
  }
}

function markerArrayReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_MARKERS': {
      let marks = Object.assign({}, action.newMarkers);
      console.log('updating markers to')
      console.log(marks);
      return marks;
    }
    default: return state;
  }
}

function toolbarReducer(state, action) {
  switch (action.type) {
    case 'TOOLBARID_UPDATE': {
      return action.toolbarID
    }
    default: return state;
  }

}

export default function OpenOutletReducer(state, action) {

      console.log(action);
      console.log(state);
      if (!state.currentRegion){
        return {
          aboutAnimated: state.aboutAnimated,
          aboutScreenState: state.aboutScreenState,
          toolbarID: state.toolbarID,
          initialRegion: state.initialRegion,
          currentMarkers: {},
          currentRegion: Object.assign({}, state.initialRegion),
          calloutLoc: {}
        }
      }
  return {
    aboutAnimated: state.aboutAnimated,
    aboutScreenState: state.aboutScreenState,
    toolbarID: toolbarReducer(state.toolbarID, action),
    initialRegion: state.initialRegion,
    currentMarkers: markerArrayReducer(state.currentMarkers , action),
    currentRegion: updateRegion(state.currentRegion, action),
    calloutLoc: calloutButtonReducer(state.calloutLoc, action)
  }
}
