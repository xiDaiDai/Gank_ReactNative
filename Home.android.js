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
  StatusBar
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Android from './Android';
import IOS from './IOS';
import FrontEnd from './FrontEnd';
import Video from './Video';
import Amazing from './Amazing';

export default class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    return (
      <View style={{flex:1}}>
      <StatusBar
           backgroundColor="#1e90ff"
           barStyle="light-content"
           hidden ={false}/>
      <ScrollableTabView  
          tabBarBackgroundColor='#1e90ff'
          tabBarUnderlineColor='transparent'
          tabBarActiveTextColor='white'
          tabBarInactiveTextColor='#fff'
          scrollWithoutAnimation={true}
      >
        <Android tabLabel="Android"  navigator={this.props.navigator}/>
        <IOS tabLabel="iOS" navigator={this.props.navigator}/>
        <FrontEnd tabLabel="前端" navigator={this.props.navigator}/>
        <Video tabLabel="Videos" navigator={this.props.navigator}/>
        <Amazing tabLabel="福利" navigator={this.props.navigator}/>
      </ScrollableTabView>
                </View>

    
    );
  }
}

 

const styles = StyleSheet.create({
  
});

 
