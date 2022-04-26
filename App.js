/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';

import {
  StyleSheet,
  ImageBackground,
  View,
  Alert,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
} from 'react-native';
import geolocation from '@react-native-community/geolocation';
import NetInfo from "@react-native-community/netinfo";



import DateTime from './compoments/DateTime';
import WeatherScroll from './compoments/WeatherScroll';


const img = require("./picture/nui.jpg")
const App = () =>{
  const [data, SetData] = useState({});
  const [reload, SetReload] = useState(false);

  

  // Show alert when app don't have internet
  const alertWifi = () =>{

    Alert.alert(
      "Alert Wifi !!!",
      "You have problem with the internet go to setting wifi",
      [
        {
          text: "Cancel", onPress:() =>console.log("Cancel"),style:"cancel"
        },
        { text: "Ok",onPress:()=> Platform === 'ios' ? Linking.openURL('App-Prefs:Wifi') : Linking.sendIntent('android.settings.WIFI_SETTINGS')}
      ]
    );
  }

  // Check the internet is on or off
  // const unsubscribe = NetInfo.addEventListener(state => {
  //   if(state.isConnected == false){
  //     alertWifi();
  //   }
  //   else{
      
  //   }
  //   console.log("Connection type", state.type);
  //   console.log("Is connected?", state.isConnected);
  // });
  NetInfo.fetch().then(state =>{
    if(state.isConnected == false){
      alertWifi();
    }
    else{
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    }
  })

  useEffect(() =>{
    geolocation.getCurrentPosition((success) =>{
      let {latitude, longitude}  = success.coords;
      console.log(latitude,longitude)
      fetchDataFromApi(latitude,longitude)

    },(err) =>{// If the permision fail we you our latitude, longitude which is HCM city
      if(err){
        fetchDataFromApi("10.762622","106.660172")
      }
    })
  
  },[])
  // Create a function API weather 
  
  const fetchDataFromApi = (latitude, longitude) => {
    const API_KEY = "8c408770e8ac21be27cf0848da6182d7";
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
      .then(res =>res.json()).then(data =>{
        // console.log(data)
        
        SetData(data)
      })
  }

  const reloadApp = () =>{
    SetReload(true);
    geolocation.getCurrentPosition((success) =>{
      let {latitude, longitude}  = success.coords;
      console.log(latitude,longitude)
      fetchDataFromApi(latitude,longitude)

    },(err) =>{// If the permision fail we you our latitude, longitude which is HCM city
      if(err){
        fetchDataFromApi("10.762622","106.660172")
      }
    })
    setTimeout(()=> {
      SetReload(false);
    }, 1000);
  };


  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={reload} onRefresh={reloadApp}/>} contentContainerStyle={{flex:1}}>
        <ImageBackground source={img} style={styles.image}>
                
          <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/> 
          <WeatherScroll  weatherData={data.daily}/> 
        </ImageBackground>
    </ScrollView>
    </View>
    
      
  
  );
};


const styles = StyleSheet.create({
  container:{
    flex: 1,
    
  },
  image:{
    flex:1,
    resizeMode:"cover",
    justifyContent:"center"
  },

});

export default App;
