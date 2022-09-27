import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Styles from '../../Glogbal/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Success from "../../Assets/Images/OnSuccess.png"

import { useNavigation } from '@react-navigation/native';

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height; 

const OnSuccess = () =>{
const navigation = useNavigation()
return(
    <View style={[Styles.Container,{justifyContent:'center'}]}>
<Image source={Success} style={{width:157,height:157}} />
<Text style={{color:"#4C4C4C",fontWeight:"bold",fontSize:24,margin:20}}>
Success!
</Text>
<Text>You have Successfully Registered</Text>
<TouchableOpacity
onPress={()=> navigation.navigate("Bottom")}
style={Styles.LoginBtn}>
<Text style={Styles.LoginTxt}>Done</Text>
</TouchableOpacity>
    </View>
)


}
export default OnSuccess