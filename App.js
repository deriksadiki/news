/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Image,
  ImageBackground
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {SliderBox} from 'react-native-image-slider-box'
import Carousel from 'react-native-snap-carousel';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { isTypeParameter } from '@babel/types';
export default class App extends Component  {

  constructor(props){
    super(props);
    this.state = {
        carouselItems: null,
        isLoading: true
    }
}


componentDidMount(){
  return fetch('https://newsapi.org/v2/top-headlines?country=za&apiKey=64681d686f9d48f19114467a83d5c668')
        .then( (response) => response.json())
        .then((responseJson) =>{
          var temp = responseJson.articles;
          var tempArray =  new Array();
          for (var x = 0; x < temp.length; x++){
            if (temp[x].urlToImage != null){
              tempArray.push(temp[x])
            }
          }
          this.setState({
            carouselItems: tempArray,
            activeIndex:0
          })
          setTimeout(() => {
            this.setState({
              isLoading: false,
            })
          }, 2000);
        });
}

_renderItem({item,index}){
    return (
      <ScrollView>

      <Card style={{height:530, justifyContent:'center', width:600}}>
        <CardImage 
          source={{uri: item.urlToImage}}
          title={item.title} 
          style={styles.img}/>
        

        <CardTitle
        title={item.author}
        />
        <CardContent  />
        <CardAction 
          separator={true} 
          inColumn={false}>
          <CardButton
            onPress={() => {}}
            title="Share"
            color="#FEB557"
          />
          <CardButton
            onPress={() => {}}
            title="Explore"
            color="#FEB557"
          />
        </CardAction>
      </Card>
    
    </ScrollView>
    )
}

render() {
  if (this.state.isLoading == true){
    return (
      <View>
        <ImageBackground source={require('./assets/gti.gif')} style={{height:'100%', width:'100%'}}>
        </ImageBackground>
      </View>
    )
  }
  else{

    return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
             onPress={
              () => { this.carousel._snapToItem(this.state.activeIndex-1)}
          }>
            <Image style={{width:50, height:80}} source={require('./assets/left.png')}/>
        </TouchableHighlight>
        <Carousel
                data={this.state.carouselItems}
                sliderWidth={280}
                ref={ref => this.carousel = ref}
                itemWidth={400}
                itemHeight={200}
                sliderHeight={10}
                renderItem={this._renderItem}
                layout={'stack'} 
                layoutCardOffset={`18`} 
                onSnapToItem = { index => this.setState({activeIndex:index}) }
            />
       
       <TouchableHighlight
            onPress={
                () => { this.carousel._snapToItem(this.state.activeIndex+1)}
            }>
            <Image style={{width:50, height:80}} source={require('./assets/right.png')}/>
        </TouchableHighlight>
    </SafeAreaView>
    );
  }
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor:'#7d7d80',
flexDirection:'row', 
alignItems: 'center',
justifyContent: 'center',
},

img:{
  color:'red'
}
});

