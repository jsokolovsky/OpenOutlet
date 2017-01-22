'use strict'

import { connect } from 'react-redux';
import { updateRegion, openNavButton, closeCallout, changeToolBar, showAboutScreen} from './actions/actions'
import MapBody from './MapBody'

const mapStateToProps = (state) => {
  return {initialRegion: state.initialRegion,
    currentRegion: state.currentRegion,
    toolbarID: state.toolbarID,
    aboutAnimated: state.aboutAnimated,
    currentMarkers: state.currentMarkers,
    calloutLoc: state.calloutLoc};
};

const mapDispatchToProps = (dispatch) => {
  return {whenRegionChanged: (region, dataBase) => {
    dispatch(updateRegion(region, dataBase))
  }, calloutOpened: (location) => {
    dispatch(openNavButton(location))
  }, onMapPressed: () => {
    dispatch(closeCallout())
  }, toolbarSelected: (toolbarActionID) => {
    dispatch(changeToolBar(toolbarActionID))
  }
};
};

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps)
  (MapBody);

export default MapContainer;
