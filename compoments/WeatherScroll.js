import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native'
import moment from 'moment-timezone'

import FutureForecast from './FutureForecast'


const WeatherScroll = ({weatherData}) => {
  return (  
    
        <ScrollView horizontal={true} style={styles.scrollView} contentContainerStyle={{flexGrow:1}}>
            <CurrentTempEL data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}/>
            <FutureForecast data={weatherData}/>
        </ScrollView>
    
    
  )
}

const CurrentTempEL =({data}) =>{

    if(data && data.weather){
        const img = {uri: 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'}
        return(
            <View style={styles.CurrentTempELContainer}>
                <Image source={img} style={styles.image}></Image>
    
                <View style={styles.otherContainer}>
                    <Text style={styles.day}>{moment(data.dt *1000).format('dddd')}</Text>
                    <Text style={styles.temp}>Night - {data.temp.night}&#176;C</Text>
                    <Text style={styles.temp}>Day - {data.temp.day}&#176;C</Text>
                </View>
                
            </View>
        )
    }
    else{
        return(
            <View></View>
        )
    }
    
}

const styles = StyleSheet.create({
    scrollView: {
        flex:0.5,
        backgroundColor:'#18181bcc',
        padding:30,
        paddingHorizontal:5,
    },

    image: {
        width:150,
        height:150,
    },

    CurrentTempELContainer: {
        flexDirection: 'row',
        backgroundColor:'#00000033',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor:'white',
        borderWidth:2,
        padding:15,
    },

    day: {
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
    },

    otherContainer:{
        paddingRight: 40,
    }
})



export default WeatherScroll