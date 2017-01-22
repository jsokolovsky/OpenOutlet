'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  BackAndroid,
  Linking,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Dimensions from 'Dimensions';
import MapView from 'react-native-maps';

var Ionicons = require('react-native-vector-icons/Ionicons');

var _navigator;
var WIDTH_MAP = Dimensions.get('window').width;
var HEIGHT_MAP = Dimensions.get('window').height;//-56;
var WIDTH_CALLOUT = WIDTH_MAP*.75;
var HEIGHT_CALLOUT = HEIGHT_MAP*.33;

var BLUE_FLAG = require('./flag-blue.png');
var BACK_ARROW = require('./ic_arrow_back_black_48dp.png');

class MapBody extends Component {
  //initial rendering
  componentDidMount() {
    console.log('component mounted');
    console.log(this.props);
    var minLat = (this.props.initialRegion.latitude - this.props.initialRegion.latitudeDelta*0.6).toString().substring(0, 8);
    var maxLat = (this.props.initialRegion.latitude + this.props.initialRegion.latitudeDelta*0.6).toString().substring(0, 8);
    var minLong = (this.props.initialRegion.longitude - this.props.initialRegion.longitudeDelta*0.6).toString().substring(0, 8);
    var maxLong = (this.props.initialRegion.longitude + this.props.initialRegion.longitudeDelta*0.6).toString().substring(0, 8);
    var queryParams = [minLat, maxLat, minLong, maxLong];
    console.log(queryParams);
    var stationQ = this.props.dataBase.objects('Station').filtered('latitude > $0 AND latitude < $1 AND longitude > $2 AND longitude < $3', ...queryParams);

    console.log(stationQ.length);
    this.props.whenRegionChanged(this.props.initialRegion, this.props.dataBase)
  }
  //go to google maps if user wants to navigate to a specific marker
  navigationButtonPressed() {
    var url = "google.navigation:q=" +this.props.calloutLoc.latitude+","+this.props.calloutLoc.longitude;
    console.log(url);
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  layoutMarker(loc, id){
    //console.log('render/rerendering marker: ' + id);
    let keyVal = 'm' + id.toString();
    return (
      <MapView.Marker
      key={keyVal}
      onPress={(location) => this.props.calloutOpened(location)}
      coordinate={loc}
      title={keyVal}
      calloutOffset={{ x: -8, y: 28 }}
      calloutAnchor={{ x: 0.5, y: 0.4 }}>
        <MapView.Callout>
        <View style={styles.button}>
        <View style={{flexDirection: 'row'}}>
        <Image source={BLUE_FLAG}></Image>
        <View style={styles.container}></View>
        </View>
        <View>
        </View>
        </View>
        </MapView.Callout>
        </MapView.Marker>);
  }

  renderMapView() {
    return (
      <MapView style={styles.map}
      onPress={() => this.props.onMapPressed()}
      onRegionChangeComplete={(region) => this.props.whenRegionChanged(region, this.props.dataBase)}
      showsUserLocation={true}
      showsTraffic={false}
      initialRegion={this.props.initialRegion}>
      {this.layoutMarkers()}
      </MapView>
    );
  }

  layoutMarkers() {
  let marks = [];

  for (var key in this.props.currentMarkers){
      marks.push(this.layoutMarker(this.props.currentMarkers[key].loc, key));
  }


  return marks;
  }
renderToolbar() {
  //render different toolbar based on current screen
  if (this.props.toolbarID===0){

    return <Ionicons.ToolbarAndroid title={"OpenOutlet"} onActionSelected={this.props.toolbarSelected} style={[styles.toolBar, {opacity: 0}]} actions={[{title: "action", show: 'always'}]}/>;
  }

  else return <Ionicons.ToolbarAndroid title={"About"} onIconClicked={() => this.props.toolbarSelected(-1)} navIconName={'android-arrow-back'} onActionSelected={this.props.toolbarSelected} style={styles.toolBar} actions={[{title: "action", show: 'always'}]}/>;

}
  render() {
    console.log('rendering mapview');
     console.log(this.props);
     return (
       <View style={styles.container}>
       {this.renderToolbar()}
       <View style={styles.mapContainer}>
       {this.renderMapView()}
       </View>
       <AboutScreen {...this.props}/>
       </View>
     );

  }
}

class ToolbarWrapper extends Component {
  render() {

  }
}

class AboutScreen extends Component {
  render() {
    return (<Animated.View style={[styles.buttonContainer, {transform: [{translateX: this.props.aboutAnimated}]}]}>
    <TouchableOpacity activeOpacity={.25} style={styles.buttonContainer } onPress={()=>{console.log('opacity pressed')}}>
    <Text>Click to navigate here</Text>
    </TouchableOpacity>
    </Animated.View>);
  }
}

/*
<View style={styles.buttonContainer}>
<TouchableOpacity activeOpacity={.25} style={styles.buttonContainer} onPress={()=>{console.log('opacity pressed')}}>
<Text>Click to navigate here</Text>
</TouchableOpacity>
</View>
*/

/*
<View style={styles.buttonContainer}>
{this.props.calloutLoc !== null ? <TouchableOpacity activeOpacity={.25} style={styles.bubble}>
<Text>Click to navigate here</Text>
</TouchableOpacity> : null}
</View>

transform: {
  translateY: 50
},
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'flex-end',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  toolBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 56,
    backgroundColor: 'blue',
    //width: WIDTH_MAP
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 60,
    right: 0,
    bottom: 0,
    left: 0,
    //margin: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    //opacity: 0,

  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  bubble: {
   backgroundColor: 'rgba(255,255,255,0.7)',
   paddingHorizontal: 18,
   paddingVertical: 12,
   borderRadius: 20,
 },
 mapContainer: {
       position: 'absolute',
       top: 60,
       left: 0,
       right: 0,
       bottom: 0,
       flex: 1
 },
  map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      //flex: 1,
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
  button: {
    width: WIDTH_CALLOUT,
    height: HEIGHT_CALLOUT,
    paddingBottom: 10,
    backgroundColor: '#4da2ab',
    flex: 1,
  },
  bcontainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  }
});

module.exports = MapBody;
