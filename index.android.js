/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator,
  Platform,
  BackAndroid
} from 'react-native';

import Home from './Home';
import Detail from './Detail';
import ImagePage from './ImagePage';

let nav;

class Gank_ReactNative extends Component {
 constructor(props) {
  super(props);
   
}

componentDidMount(){
    if (Platform.OS === 'android') {
        BackAndroid.addEventListener('hardwareBackPress',()=>this.onBackAndroid());
    };
}


  onBackAndroid(){
    let routers = this.nav.getCurrentRoutes();
    if (this.nav&&routers.length > 1) {
        this.nav.pop();
        return true;
      }
        return false;
  } 
 
  renderScene(route, navigator){
      this.nav = navigator;
      switch(route.name){
        case 'home':
           return <Home navigator={navigator} route={route} />
           break;
        case 'detail':
          return <Detail navigator={navigator} route={route} {...route.params}/>
           break;
        case 'imagePage':
          return <ImagePage navigator={navigator} route={route} {...route.params}/>
           break;
        
       }
      
    }

  render() {
        let initialRoute = {name:'home'}
        return (
              <Navigator
              style={styles.container}
              initialRoute={{component: Home,name:'home'}}
              configureScene={() => Navigator.SceneConfigs.PushFromRight}
              renderScene={(route,navigator)=>this.renderScene(route,navigator)}/>
              );
         }
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
   
});

AppRegistry.registerComponent('Gank_ReactNative', () => Gank_ReactNative);
