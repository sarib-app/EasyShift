

 import React,{useState,useEffect} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   ScrollView,
   TouchableOpacity,
Pressable,
Alert
 } from 'react-native';
 
 import Styles from '../Glogbal/GlobalStyles';
 import Bell from '../Assets/Images/Bell.png'
 import Menu from '../Assets/Images/Menu.png'
import avatar from '../Assets/Images/users.png'
import DropDownBtn from '../Assets/Images/DropDownBtn.png'

import Toggle from '../Assets/Images/Toggle.png'
import DisabledToggle from '../Assets/Images/ToggleDisabled.png'

import { useNavigation } from '@react-navigation/native';
 import MenuDrawer from 'react-native-side-drawer'
 import drawerContent from '../SideDrawer/SideDrawer';
 import forward from '../Assets/Images/forward.png'
 import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListAccordionGroupContext } from 'react-native-paper/lib/typescript/components/List/ListAccordionGroup';
 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 

 const Setting = () => {
  const[open , setOpen] = useState(false)
  const[Notification , setNotification] = useState(false)
  const[Do_Not_Disturb , setDo_Not_Disturb] = useState(false)
  const[Reminder , setReminder] = useState(false)
  const[name , setName] = useState("")
   const[email  , setEmail] = useState("")

const navigation=useNavigation()
const getAsyncData=async()=>{
     const namee = await AsyncStorage.getItem('name')
     const emaill = await AsyncStorage.getItem('email')
if(emaill){
     setEmail(emaill)
     setName(namee)

}

}
useEffect(() => {
     getAsyncData()

    }, [])





const onLogout=()=>{

     Alert.alert('Logout', 'Are you sure you want to Logout?', [
          {
            text: 'No',
            onPress: () => { },
          },
    
          {
            text: 'Yes',
            onPress: () => {
              Logout()
            },
          },
        ]);
}

const Logout =()=>{
     AsyncStorage.clear()
     navigation.navigate("Login")
     
}






 return(
 
 <Pressable 
 
 onPress={()=> setOpen(false)}
 style={Styles.Container}>



<MenuDrawer 
          open={open} 
          drawerContent={drawerContent()}
          drawerPercentage={80}
          animationTime={200}
          overlay={true}
          opacity={0.2}
          
        >


   <View  style={Styles.Header}>
     <View style={[Styles.HeaderI]}>

   <TouchableOpacity
   onPress={()=> setOpen(true)}
   >

   <Image source={Menu} style={{width:21,height:14,margin:20}} />
     </TouchableOpacity>  

     <Text
     
     style={{color:'white',fontWeight:'bold',fontSize:18}}>Setting</Text>

</View>
<Text
     onPress={()=> onLogout()}

style={{color:'white',fontWeight:"bold"}}>Logout</Text>
   </View>

   <View  style={[Styles.Header,{backgroundColor:'#F8F8F8',justifyContent:'space-between'}]}>
     <View style={[Styles.HeaderI]}>
<Image source={avatar} style={{width:64,height:64,margin:20}} />
<View>
<Text style={{fontSize:16,color:'#4C4C4C',fontWeight:'600'}}>{name}</Text>
<Text>{email}</Text>

</View>

</View>
<Image source={DropDownBtn} style={{width:23,height:25,margin:20}}/>
   </View>

   <View style={styles.MidCart}>
   <Text style={{color:'#4C4C4C',fontWeight:'500'}}>General settings</Text>

     <View style={styles.subview}>
<Text style={styles.Text}>Notification</Text>
<TouchableOpacity onPress={()=> setNotification((prev)=>!prev)}>
<Image source={Notification===false?DisabledToggle:Toggle} style={{width:40,height:20}}/>

</TouchableOpacity>
     </View>
     <View style={styles.subview}>
<Text style={styles.Text}>Do not disturb</Text>
<TouchableOpacity onPress={()=>setDo_Not_Disturb((prev)=>!prev)}>
<Image source={Do_Not_Disturb=== false?DisabledToggle:Toggle} style={{width:40,height:20}}/>

</TouchableOpacity>
     </View>
     <View style={styles.subview}>
<Text style={styles.Text}>Reminder</Text>
<TouchableOpacity onPress={()=>setReminder((prev)=>!prev)}>
<Image source={Reminder=== false?DisabledToggle:Toggle} style={{width:40,height:20}}/>

</TouchableOpacity>
     </View>
     <View style={styles.subview}>
<Text style={styles.Text}>Reminder ringtone</Text>
<TouchableOpacity onPress={()=> {}}>
<Image source={forward} style={{width:20,height:20}}/>

</TouchableOpacity>
     </View>
     <View style={styles.subview}>
<Text style={styles.Text}>Profile</Text>
<TouchableOpacity onPress={()=> {}}>
<Image source={forward} style={{width:20,height:20}}/>

</TouchableOpacity>
     </View>
     <View style={styles.subview}>
<Text style={styles.Text}>Secure account</Text>
<TouchableOpacity onPress={()=> {}}>
<Image source={forward} style={{width:20,height:20}}/>

</TouchableOpacity>
     </View>
     <View style={styles.subview}>
<Text style={styles.Text}>Help center</Text>
<TouchableOpacity onPress={()=> {}}>
<Image source={forward} style={{width:20,height:20}}/>

</TouchableOpacity>
     </View>
   </View>

</MenuDrawer>
 </Pressable>
 
 )
 
 
 };
 
 const styles = StyleSheet.create({
  topbar:{
    width:WindowWidth,
    height:WindowHeight/10,
    backgroundColor:"#F8F8F8",
    flexDirection:'row',
    alignItems:'center'
        },
        MidCart:{
          width:WindowWidth/1.1,
          height:WindowHeight/2,
          alignSelf:'center',
          marginTop:20
          // backgroundColor:'orange'
        },
        subview:{
          width:WindowWidth/1.1,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          // marginBottom:20
          marginTop:30
        
        },
        Text:{
          color:"#4C4C4C",
          
        }
 
 




 


 });
 
 export default Setting;
 