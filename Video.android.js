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
  View,
  Image,
  ListView,
  RefreshControl,
  TouchableHighlight,
  ToastAndroid,
  ProgressBarAndroid,
  AsyncStorage
} from 'react-native';

 
const url = "http://gank.io/api/data/休息视频/15/";

let pageIndex = 1;
 
export default class Video extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
        isRefreshing:this.props.needRefresh,
        dataSource:new ListView.DataSource({
          rowHasChanged:(row1,row2)=>row1!==row2,
        }),  
        loaded:false,
        loadMore: false,
        newContent:null,
    };
  }

  componentDidMount(){
    this.fetchNewsData();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(newsItem)=>this.renderNewsItem(newsItem)}
          onEndReached={()=>this.loadmore()}
          onEndReachedThreshold={30}
          renderFooter={()=>this.renderFooter()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={()=>this.onRefresh()}
              colors={['#272822']}/>}/>
      </View>
    );
  }

 
  renderFooter(){
    return(this.state.loadmore?<View style={{height:50,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
      <ProgressBarAndroid styleAttr="SmallInverse" color='#272822' />
      <Text style={{fontSize:13,color:'#272822',marginLeft:10}}>正在加载......</Text>
      </View>:null);
  }


  renderNewsItem(newsItem){
    return(
      <TouchableHighlight 
            underlayColor='white'
            onPress={() => this.pressRow(newsItem.url,newsItem.desc)} >
        <View style={{backgroundColor:'white',flexDirection:'column'}}>
                    
               <View style= {styles.leftContainer}>
                  <Text style = {{flex:2,fontSize:15,color:'#272822',paddingBottom:10}}>{newsItem.desc}</Text>
                  <View style = {{flex:1,flexDirection:'row'}} >
                    <Text  style={{flex:1}}>@{newsItem.who}</Text>

                    <Text  style={{flex:1,textAlign:'right'}}>{newsItem.publishedAt.slice(0,10)}</Text>
                   
                  </View>                   
               </View>
                
                    
          <View style={{backgroundColor:'#d8d8d8',height:1,flexDirection: 'row'}}/>
        </View>
      </TouchableHighlight>
  
    );
  }

  onRefresh(){
      this.setState({isRefreshing: true,});
      this.fetchNewsData();
  }


  fetchNewsData(){
    pageIndex = 1,
    fetch(url+pageIndex)
      .then((response) => response.json())

      .then((responseData) => {
        this.setState({
          newContent:responseData.results,
          dataSource:this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
          isRefreshing:false
        });
        
       AsyncStorage.setItem('NewsCache',JSON.stringify(responseData),()=>{
       
       //  ToastAndroid.show(,2000);
       });
        // ToastAndroid.show(JSON.stringify(responseData),2000);

       

        
      }).catch((err)=>{ToastAndroid.show(err.message,3000)})
      .done();
  }


  loadmore(){
     if(this.state.loadmore) return;
     this.setState({loadmore:true});
     pageIndex++;
     fetch(url+pageIndex)
      .then((response) => response.json())
      .then((responseData) => {
        
        this.setState({
          newContent:[...this.state.newContent, ...responseData.results],
          dataSource:this.state.dataSource.cloneWithRows(this.state.newContent),
          loaded: true,
          isRefreshing:false,
          loadmore:false
        });
      }).catch((err)=>{ToastAndroid.show(err.message,1000)})
      .done();
  }


  pressRow(id,title){
        this.props.navigator.push({
             title:'detail',
             name:'detail',
             params:{url:id,title:title}
              
            });
  }

 


}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    flexDirection :'row', 
  },
  leftContainer:{
    padding:10,
    
    flexDirection :'column', 
    flex: 1,  
    marginRight: 5,
    backgroundColor: 'white',
  },
   
});
