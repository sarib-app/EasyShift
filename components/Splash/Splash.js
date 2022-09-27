import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
Pressable
} from 'react-native';

import Styles from '../Glogbal/GlobalStyles';
import Bell from '../Assets/Images/Bell.png'
import splash from '../Assets/Images/splash.png'

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height; 


const SplashScreen = ()=>{
    return(
    
    <View style={{width:WindowWidth,height:WindowHeight,justifyContent:'center',alignItems:"center"}}>
<Image source={splash} style={{width:512,height:512}} />


    </View>

    )
}
export default SplashScreen