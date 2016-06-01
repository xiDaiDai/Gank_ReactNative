/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  WebView,
  View,
  ToastAndroid,
  ToolbarAndroid,
  Dimensions,
  ProgressBarAndroid,
  Image
} from 'react-native';

 

const  WINDOW_WIDTH = Dimensions.get('window').width;
const  WINDOW_HEIGHT = Dimensions.get('window').height;

class ImagePage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isloading:true,
    };
  }

  render() {
    let mask = this.state.isloading?<View style = {{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
        <ProgressBarAndroid styleAttr="Inverse" color='#1e90ff' />
      </View>:null;
    return (
      <View style={styles.container}>
      <ToolbarAndroid
                style={styles.toolBar}
                navIcon={require('./image/ic_arrow_back_white_18dp.png')}
                title={this.props.title}
                titleColor='white'
                onIconClicked={() => this.backAndroid()}/>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image style={{width:WINDOW_WIDTH,height:WINDOW_HEIGHT-70}}
               source={{uri:this.props.url}}
               resizeMode={Image.resizeMode.contain}
               onLoad={()=>{this.setState({isloading:false})}}
               >
          
        </Image>
        </View>
      </View>
    );
  }

  backAndroid(){
       this.props.navigator.pop();
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
   toolBar: {
    backgroundColor: '#1e90ff',
    height: 50,
  },
   
});

export default ImagePage;
