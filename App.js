/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//AIzaSyAWUYge6_XjqqxENGxDaqNmjCYCUeQ7nrU

import React from 'react';
import MapView,{ PROVIDER_GOOGLE,Marker,Polygon,Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
import {Alert,PermissionsAndroid,Platform,StyleSheet,Text,View,} from 'react-native';

import MapViewDirections from 'react-native-maps-directions';


export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      latitude:'',
      longitude:'',
      loading:false
    }
  }

  componentDidMount=async()=> {
    if(Platform.OS=='android'){
      const response=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
        'title':'MapsAndGeo',
        'message':'Konumunuzu istiyoruz'
      });
    }else{
      Geolocation.requestAuthorization();
    }
    /*
    Geolocation.getCurrentPosition(
        position=>{
            const{coords:{latitude,longitude}}=position;
            this.setState({latitude,longitude})  
        },error=>{
            console.log(error);
        }
    );*/

    this.watchId=Geolocation.watchPosition(
      position=>{
        const {coords:{latitude,longitude}}=position;
        this.setState({latitude,longitude,loading:true})
      },
      error=>{
        console.log(error);
      }
    )

  }
  componentWillUnmount=()=>{
    Geolocation.clearWatch(this.watchId);
  }
  render(){
    const{latitude,longitude,loading}=this.state;
    console.log(latitude,longitude)
    return(
      <View style={styles.container}>
        {(loading) ?
         <MapView
         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
         style={styles.map}
         region={{
           latitude:Number(latitude),
           longitude:Number(longitude),
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121
         }}
         //showsUserLocation={true}
         >

           <Marker coordinate={{latitude,longitude}}/>
         </MapView>
         :
         <View><Text>Konum Alınıyor.</Text></View>
        }
      </View>
    )
  }
}


      /*<Marker
       draggable={true}
       onPress={()=>Alert.alert('click marker')}
       onDrag={()=>Alert.alert("kaydrıma")}
       onDragEnd={()=>Alert.alert("kaydırma bitti")}
       title={"212"}
       description={"AVM"}
       pinColor={"blue"}
       //opacity={0.5}
        coordinate={{
           latitude: 41.0477744,
           longitude: 28.8056053,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
       }}/>*/

      /* <Polygon 
       onPress={()=>Alert.alert("tıklandı")}
       strokeWidth={3}
       strokeColor={'red'}
       fillColor={"yellow"}
       tappable={true}
       coordinates={[
         {latitude:41.051873,longitude:28.809529},
         {latitude:41.0505525,longitude:28.809171},
         {latitude:41.051896,longitude:28.812319},

       ]}/>*/

       /*  <Circle 
       strokeWidth={3} 
       strokeColor={"red"} 
       radius={100} 
       fillColor={"purple"}
       center={{latitude:41.0505525,longitude:28.809171}}
       />*/


         /*//Direction (Farturalandırma)
      <MapViewDirections 
      apikey={"AIzaSyAWUYge6_XjqqxENGxDaqNmjCYCUeQ7nrU"}
      origin={{latitude:41.040058,longitude:228.8094457}}
      destination={{latitude:41.050725,longitude:28.808352}}>
      </MapViewDirections>
      */
     
      //Dragable Marker
       /*<Marker
       draggable={true}
       onDrag={(e)=>console.log(e.nativeEvent.coordinate)}
       onDragStart={(e)=>console.log(`start ${e.nativeEvent.coordinate}`)}
       //onDragEnd={(e)=>console.log(`end:${e.nativeEvent.coordinate}`)}
       onDragEnd={(e)=>Alert.alert(e.nativeEvent.coordinate.latitude)}
       title={"Dragable"}
       description={"Marker"}
        coordinate={{
           latitude:41.051873,
           longitude: 28.809529,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
       }}/>*/


       /*       
       <Marker
       //Custom Marker
       title={"Custom"}
       description={"Marker"}
        coordinate={{
           latitude:41.051896,
           longitude: 28.8056058,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
       }}>
         <View style={{justifyContent:'center',alignItems:'center',borderRadius:50,width:40,height:40,backgroundColor:'red'}}>
           <Text style={{color:'white',padding:10,fontSize:15}}>8</Text>
         </View>
       </Marker>*/


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });



