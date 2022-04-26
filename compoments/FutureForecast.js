import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import moment from 'moment-timezone'


const FutureForecast = ({data}) => {
  return (
    <View style={{flexDirection:'row'}}>
      {
        data && data.length > 0 ?

        data.map((data, idx) =>(
          idx != 0 && <FutureForecastItem key={idx} forcecastItem={data}/> 

        ))

        :

        <View/>
      }
     

  
    </View>
  )
}

const FutureForecastItem = ({forcecastItem}) =>{
  const img = {uri:"http://openweathermap.org/img/wn/"+ forcecastItem.weather[0].icon+"@2x.png"}
  return(
    <View style={styles.FutureForecastItemContainer}>
      <Text style={styles.day}>{moment(forcecastItem.dt *1000).format('ddd')}</Text>
      <Image source={img} style={styles.image}/>
      <Text style={styles.temp}>Night - {forcecastItem.temp.night}&#176;C</Text>
      <Text style={styles.temp}>Day - {forcecastItem.temp.day}&#176;C</Text>

    </View>
   
  )
}

const styles = StyleSheet.create({

  image:{
    height:100,
    width:100,
  },

  FutureForecastItemContainer:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#00000033',
    borderRadius:10,
    borderColor:'white',
    borderWidth:1,
    padding:20,
    marginLeft:10,

  },

  day:{
    fontSize: 20,
    color:'#ffffff',
    backgroundColor:'#666666',
    padding:10,
    textAlign:'center',
    borderRadius:50,
    fontWeight:"200",
    marginBottom:15,
  },

  temp:{
    fontSize:15,
    color:'white',
    fontWeight:"100",
    alignItems:'center',
  }
})


export default FutureForecast