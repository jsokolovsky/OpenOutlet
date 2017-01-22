

export const updateRegion = (region, dataBase) => {
  return {
    type: 'REGION_CHANGED',
    region,
    dataBase
  }
}

export const showAboutScreen = () => {
  return {
    type: 'SHOW_ABOUT_SCREEN'
  }
}

export const updateToolbarID = (toolbarID) => {
  return {
    type: 'TOOLBARID_UPDATE',
    toolbarID
  }
}

export const changeToolBar = (toolbarActionID) => {
  return {
    type: 'TOOLBAR_SELECT',
    toolbarActionID
  }
}

export const updateMarkers = (newMarkers) => {
  return {
    type: 'UPDATE_MARKERS',
    newMarkers
  }
}

export const updateRegionInState = (region) => {
  return {
    type: 'UPDATE_REGION',
    region
  }
}

export const openNavButton = (location) => {
  return {
    type: 'OPEN_NAV_BUTTON',
    location
  }
}

export const closeCallout = () => {
  return {
    type: 'CLOSE_CALLOUT'
  }
}

export const addMarker = (locObj) => {
  return {
    type: 'ADD_MARKER',
    locObj
  }
}

export const removeMarker = (key) => {
  return {type: 'REMOVE_MARKER',
          key}
}

export const updateActive = (keys) => {
  return {
    type: 'UPDATE_ACTIVE',
    keys
  }
}
