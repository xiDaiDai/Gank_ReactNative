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

 
const url = "http://gank.io/api/data/Android/15/";
const person = {
  name:'jack',
  gender:'male'
};

let pageIndex = 1;
 
export default class Android extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
        isRefreshing:this.props.needRefresh,
        dataSource:new ListView.DataSource({
          rowHasChanged:(row1,row2)=>row1!==row2,
        }),  
        loadMore: false,
        isRefreshing:true,
        newContent:null,
    };
  }

  componentDidMount(){
    this.getAsycStorage();
    this.fetchNewsData();
  }

  render() {
    return (
      <View style={{flex:1,padding:5,backgroundColor:'#f1f1f1'}}>
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
              colors={['#1e90ff']}/>}/>
      </View>
    );
  }

  getAsycStorage(){
    AsyncStorage.getItem('AndroidJson', (err, result) => {
      if(result){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(JSON.parse(result).results),
            loaded: true,
        });
      }
    });
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
        <View style={{backgroundColor:'white',flexDirection:'column',margin:5}}>
                    
               <View style= {styles.leftContainer}>
                  <Text style = {{flex:2,fontSize:15,color:'#272822',paddingBottom:10}}>{newsItem.desc}</Text>
                  <View style = {{flex:1,flexDirection:'row'}} >
                    <Text  style={{flex:1}}>@{newsItem.who}</Text>

                    <Text  style={{flex:1,textAlign:'right'}}>{newsItem.publishedAt.slice(0,10)}</Text>
                   
                  </View>                   
               </View>
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
        AsyncStorage.setItem('AndroidJson',JSON.stringify(responseData));
        this.setState({
          newContent:responseData.results,
          dataSource:this.state.dataSource.cloneWithRows(responseData.results),
          isRefreshing:false
        });
      }).catch((err)=>{
        ToastAndroid.show(err.message,3000);
         this.setState({
          isRefreshing:false
        });
      })
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
          loadmore:false
        });
      }).catch((err)=>{ToastAndroid.show(err.message,1000)})
      .done();
  }


  pressRow(url,desc){
        this.props.navigator.push({
             title:'Detail',
             name:'detail',
             params:{url:url,title:desc}
              
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
    backgroundColor: 'white',
  },
   
});

