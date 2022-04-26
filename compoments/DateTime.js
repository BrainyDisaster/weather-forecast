import React, {useEffect, useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import moment from 'moment-timezone'


const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// Create WeatherItem function to past the value to function DateTime
const WeatherItem = ({title,value,unit}) => {
    return(
        <View style={styles.WeatherItem}>
            <Text style={styles.WeatherItemTitle}>{title}</Text>
            <Text style={styles.WeatherItemTitle}>{value}{unit}</Text>
            
        </View>
    )
}

const DateTime = ({current, lat, lon, timezone}) =>{

    
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')
    


    useEffect(() =>{
        setInterval(() =>{
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12 = hour >= 13 ? hour %12 : hour
            const minute = time.getMinutes();
            const AmOrPm = hour >= 12 ? 'PM' : 'AM'
            

            setTime((hoursIn12 <10 ? '0'+hoursIn12 : hoursIn12) + ':' + (minute <10 ? '0'+minute:minute)+ ' '+ AmOrPm)

            setDate(days[day] + ', ' + date+ ' '+ months[month])
          
        },1000);

        
    },[])
    return(
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.heading}>{time}</Text>
                </View>
                <View>
                    <Text style={styles.subheading}>{date}</Text>
                </View>
                <View style={styles.WeatherItemContainer}>
                    <WeatherItem title="Humidity" value={current? current.humidity : ""} unit="%"/>
                    <WeatherItem title="Pressure" value={current? current.pressure : ""} unit="hpA"/>
                    <WeatherItem title="Sunrise" value={current? moment.tz(current.sunrise *1000, timezone).format('HH:mm')  : ""} unit="am"/>
                    <WeatherItem title="Sunset" value={current? moment.tz(current.sunset *1000, timezone).format('HH:mm')  : ""} unit="pm"/>
                </View>
            </View> 
            <View style={styles.rightAlign}>
                <Text style={styles.timeZone}>{timezone}</Text>
                <Text style={styles.latlong}>{lat}N -{lon}E</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1.5,
        flexDirection:"row",
        justifyContent:"space-between",
        padding:15,
    },

    heading:{
        fontSize:45,
        color:'white',
        fontWeight:'100',
    },

    subheading:{
        fontSize:25,
        color:'white',
        fontWeight:'300',
    },

    rightAlign:{
        textAlign:'right',
        marginTop:20
    },

    timeZone:{
        fontSize:20,
        color:'white'
    },

    latlong:{
        fontSize:16,
        color:'white',
        fontWeight:'700',
    },

    WeatherItemContainer:{
        backgroundColor:"#18181b99",
        borderRadius:10,
        padding: 10,
        marginTop: 10,
    },

    WeatherItem:{
        flexDirection:'row',
        justifyContent:'space-between',
    },

    WeatherItemTitle:{
        color:'white',
        fontSize:14,
        fontWeight:'400',
    },

    
})


export default DateTime