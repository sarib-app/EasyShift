

 import React,{useState,useEffect} from 'react';
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
 import goback from '../Assets/Images/goback.png'
import ChatProf from '../Assets/Images/chatProf.png'
import Search from '../Assets/Images/Search.png'
 import MenuDrawer from 'react-native-side-drawer'
 import drawerContent from '../SideDrawer/SideDrawer';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 

 const Notification = () => {
     const navigation = useNavigation()
  const[open , setOpen] = useState(false)

// 'Content-Type': 'application/x-www-form-urlencoded'


 return(
 
 <View 
 
 style={[Styles.Container]}>





   <View  style={Styles.Header}>

   <TouchableOpacity
   onPress={()=> navigation.goBack()}
   >

   <Image source={goback} style={{width:8,height:14,margin:20}} />
     </TouchableOpacity>  


<View style={{flex:1}}>

<Text style={{alignSelf:'center',marginRight:40,color:'white',fontSize:18,fontWeight:'bold'}}>Notification</Text>
</View>
   </View>


<View
style={styles.ChatView}
>
  <View style={{flexDirection:"row"}}>

 
<Image source={ChatProf} style={{width:40,height:40}} />
<View style={{marginLeft:15}}>
  <Text style={{color:"#4C4C4C",fontWeight:"600"}}>
    Maude loreum
  </Text>
  <Text style={{textAlign:'left'}}>
  Add New Task<Text style={{color:"#5956E9"}}> Meditation </Text>{'\n'}under time <Text style={{color:"#5956E9"}}>2hr 5 min</Text>
  </Text>
</View>
</View>
<Text>2:24 pm</Text>
</View>

<View
style={styles.ChatView}
>
  <View style={{flexDirection:"row"}}>

 
<Image source={ChatProf} style={{width:40,height:40}} />
<View style={{marginLeft:15}}>
  <Text style={{color:"#4C4C4C",fontWeight:"600"}}>
    Maude loreum
  </Text>
  <Text style={{textAlign:'left'}}>
  Add New Task<Text style={{color:"#5956E9"}}> Meditation </Text>{'\n'}under time <Text style={{color:"#5956E9"}}>2hr 5 min</Text>
  </Text>
</View>
</View>
<Text>2:24 pm</Text>
</View>
<View
style={styles.ChatView}
>
  <View style={{flexDirection:"row"}}>

 
<Image source={ChatProf} style={{width:40,height:40}} />
<View style={{marginLeft:15}}>
  <Text style={{color:"#4C4C4C",fontWeight:"600"}}>
    Maude loreum
  </Text>
  <Text style={{textAlign:'left'}}>
  Add New Task<Text style={{color:"#5956E9"}}> Meditation </Text>{'\n'}under time <Text style={{color:"#5956E9"}}>2hr 5 min</Text>
  </Text>
</View>
</View>
<Text>2:24 pm</Text>
</View>




 </View>
 
 )
 
 
 };
 
 const styles = StyleSheet.create({

 
 
TextInput:{
  width:WindowWidth/1.12,borderRadius:10,backgroundColor:'#F0F4FE',height:WindowHeight/17,margin:20,
alignSelf:'center',
shadowColor:'black',
elevation:5,
flexDirection:"row",
alignItems:'center'},
ChatView:{
  width:WindowWidth/1.12,
  height:WindowHeight/9.3,
  alignSelf:'center',
  alignItems:"center",
  flexDirection:'row',
  justifyContent:'space-between',
  borderBottomWidth:0.8,
  borderBottomColor:"#E1E1E1"
}



 


 });
 
 export default Notification;
 