/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//AIzaSyAWUYge6_XjqqxENGxDaqNmjCYCUeQ7nrU

import React from 'react';
import { View,Text,SafeAreaView, Alert } from 'react-native';
import DocumantationMain from './Documentation';

import {Marker} from 'react-native-maps';
import MapView from "react-native-map-clustering";
import axios from 'axios';


export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      events:[],
      loading:true
    }
  }
  componentDidMount(){
    axios.get(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/events`)
    .then((res)=>{
      this.setState({
        events:res.data.events,
        loading:false
      })
    }).catch((error)=>Alert.alert(error))

  }

  render(){
    const {loading,events}=this.state;
    return(
      //<DocumantationMain/>
      <SafeAreaView style={{flex:1}}>
        {loading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Yükleniyor..</Text></View>  : 
        <MapView
        initialRegion={{
          latitude:52.5,
          longitude:19.2,
          latitudeDelta:8.5,
          longitudeDelta:8.5
        }}
        style={{
          height:'100%'
        }}
        >
          {
                events.map(item=>{
                  if(typeof item.geometries[0].coordinates[0]!='object'){
                    return <Marker 
                    title={item.title}
                    description={item.description}
                    coordinate={{
                      latitude:item.geometries[0].coordinates[1],
                      longitude:item.geometries[0].coordinates[0]
                    }}/>
                  }  
                })
          }
        </MapView>
      }
      </SafeAreaView>
    )
  }
}


