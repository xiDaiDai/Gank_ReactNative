
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
  Dimensions
} from 'react-native';

 
const WINDOW_WIDTH = Dimensions.get('window').width;


const url = "http://gank.io/api/data/福利/15/";
 
let pageIndex = 1;
export default class Amazing extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
        isRefreshing:false,
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
     // if(!this.state.loaded)return (<LoadingView/>);
    return (
       
        <ListView

          contentContainerStyle={styles.list} 
          dataSource={this.state.dataSource}
          
          renderRow={(newsItem)=>this.renderNewsItem(newsItem)}
          onEndReached={()=>this.loadmore()}
          onEndReachedThreshold={60}
          renderFooter={()=>this.renderFooter()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={()=>this.onRefresh()}
              colors={['#ff0000']}/>}/>
      
    );
  }

 renderFooter(){
    return(this.state.loadmore?<View style={{height:50,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
      <ProgressBarAndroid styleAttr="SmallInverse" color='#272822' />
      <Text style={{fontSize:13,color:'#272822',marginLeft:10}}>正在加载......</Text>
      </View>:null);
    
  }

  renderNewsItem(newsItem){
      
  if(!newsItem) return null;
   return(
      <TouchableHighlight underlayColor='white' onPress={()=>this.pressRow(newsItem.url,newsItem.desc)}>
        <View style={styles.item}>
            
         <View style={{alignItems:'center'}}>
                <Image  source={{uri:newsItem.url}}
                        style={{height:WINDOW_WIDTH/2,width:(WINDOW_WIDTH-32)/2,borderRadius:5}}>
                </Image>
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
       
        this.setState({
          newContent:responseData.results,
          dataSource:this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
          isRefreshing:false
        });
      }).catch((err)=>{ToastAndroid.show(err.message,1000)})
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


  pressRow(url,title){
        this.props.navigator.push({
             title:'imagePage',
             name:'imagePage',
             params:{url:url,title:title}
            });
  }


}

const styles = StyleSheet.create({
   
  list: {
    backgroundColor:'#f4f4f4',
    padding:5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  item:{
    height:WINDOW_WIDTH/2,
    width:(WINDOW_WIDTH-30)/2,
    backgroundColor:'white',
    flexDirection:'column',
    margin:5,
    borderRadius:5,
    borderWidth:0.5,
    borderColor:'#A8AFB3',
    flex:1
  }
});

