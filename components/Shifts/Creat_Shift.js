

 import React,{useState,useEffect} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   TextInput,
   TouchableOpacity,
   ScrollView,
Pressable,
Alert

 } from 'react-native';
 
 import Styles from '../Glogbal/GlobalStyles';
 import goback from '../Assets/Images/goback.png'
 import Night from '../Assets/Images/Night.png'
 import AfterNoon from '../Assets/Images/AfterNoon.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

 import morning from '../Assets/Images/morning.png'


 import { useNavigation } from '@react-navigation/native';
import maincolor from '../Glogbal/color';

import Increaser from '../Assets/Images/increaser.png'
import decreaser from '../Assets/Images/decreaser.png'
import rightarrowCircle from '../Assets/Images/rightarrowCircle.png'
import leftarrowcircle from '../Assets/Images/leftarrowcircle.png'
import rightarrowBox from '../Assets/Images/rightarrowBox.png'
import leftarrorwBox from '../Assets/Images/leftarrorwBox.png'
import Baseurl from '../../urls';
import alldays from './dateData';

import Selected from '../Assets/Images/selected.png'

 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 

 const CreateShift = () => {
  const[Hide , setHide] = useState(true)
  const navigation = useNavigation()

  const[role , setRole] = useState("1")
  const[token , setToken] = useState("")
  const[position , setPosition] = useState("CNA")
  const[shiftTime , setshiftTime] = useState("Morning")
  const[hourly_rate , setHourlyRate] = useState("")
  const[Description , setDescription] = useState("")
  const[amount , setAmount] = useState("")
  const[days , setDays] = useState(alldays)
  const[userid,setuserId]=useState("")
  const[faculty,setFaculty]=useState("")




  // const[Hide , setHide] = useState(true)
  const getAsyncData=async()=>{
    const savedtoken = await AsyncStorage.getItem('token')
    const savedrole = await AsyncStorage.getItem('role')
    const userId = await AsyncStorage.getItem('userId')
    const namee = await AsyncStorage.getItem('name')
  
  
  if(savedtoken){
  setToken(savedtoken)
  setRole(savedrole)
  setuserId(userId)
  setFaculty(namee)
  console.log(token)
  
  }
  
  }
  
  useEffect(()=>{
   
  getAsyncData()
  
  },[])
const createShift=()=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "role_id": role,
    "shift_id": 1,
    "shift_position": position,
    "shift_time": shiftTime,
    "hourly_rate": hourly_rate,
    "description": Description,
    "select_amount": days.length,
    "status": "unapproved",
    "user_id": userid,
    "faculty_id": faculty,
    "Days":days
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`${Baseurl}createpost`, requestOptions)
    .then(response => response.json())
    .then(result => {
      Alert.alert("congratulations","Data Saved Successfully")
      console.log(result)})
    .catch(error => console.log('error', error));


}





const SelectShifts=(shifts,index,operator)=>{
  if(operator==="add"){

    let day = [...days];
    day[index] = {...day[index], shift:shifts+1};
    setDays( day );
    return day
  }
  else{
    if(shifts >0){

      let day = [...days];
      day[index] = {...day[index], shift:shifts-1};
      setDays( day );
      return day
    }
    else{
      return null;
    }
  }
}


 return(

 
 <ScrollView 
 contentContainerStyle={[styles.Container,{alignItems:"center",backgroundColor:'white'}]}

>


   
<View  style={styles.Header}>



<Text style={{alignSelf:'center',color:'white',fontSize:18,fontWeight:'bold',}}>Time Card</Text>
</View>



<View style={{width:WindowWidth/1.12,margin:20}}>
    <Text style={{color:"#292929",fontSize:16,fontWeight:"bold"}}>
    Shift Positions    </Text>
    
    </View>

<View style={styles.cart}>
<TouchableOpacity 

onPress={()=>{
  setPosition("CNA")
}}
style={[styles.smallCarts,{backgroundColor:"#3397FF"}]}>
<Text style={{color:'white'}}>CNA</Text>
{position==="CNA"?
<Image source={Selected} style={{width:19,height:19}}/>
:null}

</TouchableOpacity>
<TouchableOpacity 
onPress={()=>{
  setPosition("LPN")
}}

style={[styles.smallCarts,{backgroundColor:"transparent",borderColor:"#51CCAA",borderWidth:1,marginLeft:20,marginRight:30}]}>
<Text style={{color:'#51CCAA'}}>LPN</Text>
{position==="LPN"?
<Image source={Selected} style={{width:19,height:19}}/>
:null}
</TouchableOpacity>
<TouchableOpacity
onPress={()=> setPosition("RN")}

style={[styles.smallCarts,{backgroundColor:"transparent",borderColor:"#FD5B71",borderWidth:1}]}>
<Text style={{color:'#FD5B71'}}>RN</Text>
{position==="RN"?
<Image source={Selected} style={{width:19,height:19}}/>
:null}
</TouchableOpacity>
</View>

<View style={{width:WindowWidth/1.12,margin:20}}>
    <Text style={{color:"#292929",fontSize:16,fontWeight:"bold"}}>
    Shift Time</Text>
    
    </View>

    <View style={[styles.cart,{justifyContent:'space-between'}]}>
<TouchableOpacity

onPress={()=>setshiftTime("Morning")}
style={[styles.smallCartsII,{backgroundColor:"#3397FF"}]}>
<View style={{justifyContent:'center',alignItems:"center"}}>
  <Image source={morning} style={{width:24,height:24,margin:6}}/>
<Text style={{color:'white'}}>Morning</Text>
</View>
{shiftTime==="Morning"?

<Image source={Selected} style={{width:18,height:18,marginRight:-20}}/>:null
}

</TouchableOpacity>
<TouchableOpacity
onPress={()=>setshiftTime("AfterNoon")}

style={[styles.smallCartsII,{backgroundColor:"#F2F2FF"}]}>

<View style={{justifyContent:'center',alignItems:"center"}}>
  <Image source={AfterNoon} style={{width:25,height:20,margin:6}}/>
<Text style={{color:maincolor}}>AfterNoon</Text>
</View>
{shiftTime==="AfterNoon"?

<Image source={Selected} style={{width:18,height:18,marginRight:-20}}/>:null
}
</TouchableOpacity>


<TouchableOpacity 
onPress={()=>setshiftTime("Evening")}

style={[styles.smallCartsII,{backgroundColor:"#F2F2FF"}]}>
<View style={{justifyContent:'center',alignItems:"center"}}>
  <Image source={Night} style={{width:12,height:18,margin:6}}/>
<Text style={{color:maincolor}}>Evening</Text>
</View>
{shiftTime==="Evening"?

<Image source={Selected} style={{width:18,height:18,marginRight:-20}}/>:null
}
</TouchableOpacity>

</View>
<View style={{width:WindowWidth/1.12,margin:20,marginBottom:10}}>
    <Text style={{color:"#292929",fontSize:16,fontWeight:"bold"}}>
    Hourly Rate</Text>
    
    </View>
<View style={styles.TextInput}>
  <Text style={{marginLeft:15,marginRight:5}}>
    $
  </Text>
  <TextInput value={hourly_rate} 
  onChangeText={(e)=>setHourlyRate(e)}  
  placeholder='no' style={{flex:1}} />
  <View >
    <>
    <Image source={Increaser} style={{width:20,height:14,marginRight:15,marginBottom:3}}/>
    <Image source={decreaser} style={{width:20,height:14,marginRight:15}}/>

    </>

  </View>

</View>


<View style={{width:WindowWidth/1.12,margin:20,marginBottom:10}}>
    <Text style={{color:"#292929",fontSize:16,fontWeight:"bold"}}>
    Discription (Option)</Text>
    
    </View>


    <View style={[styles.TextInput,{height:WindowHeight/8}]}>
 
  <TextInput 
  multiline={true}
  value={Description} 
  onChangeText={(e)=>setDescription(e)}
  placeholder='Task Discription' style={{margin:10}}  />

</View>

<View style={{width:WindowWidth/1.12,margin:20,marginBottom:10}}>
    <Text style={{color:"#292929",fontSize:16,fontWeight:"bold"}}>
    Select Amount of Shifts</Text>
    
    </View>

{/* 
<TouchableOpacity style={Styles.LoginBtn}>
<Text style={Styles.LoginTxt}>Submit Timecard</Text>
</TouchableOpacity> */}

<View style={styles.BottomCart}>
<View style={styles.InnerBottomCart}>
<Image source={rightarrowCircle} style={{width:21,height:21,marginLeft:20}}/>
<Text style={{color:"white"}}>March 14-20 , 2022</Text>
<Image source={leftarrowcircle} style={{width:21,height:21,marginRight:20}}/>

</View>
{days.map((item,index)=>{
  return(
<View style={styles.InnerBottomCartI}>
<Text>{item.date}</Text>
<View style={{flexDirection:'row'}}>
  <Pressable
   onPress={()=>{
    SelectShifts(item.shift,index,"minus")
  }}
  >

  <Image source={rightarrowBox} style={{width:18,height:20}}/>
  </Pressable>
  <Text style={{marginLeft:10,marginRight:10}}>{item.shift}</Text>
  <Pressable
    onPress={()=>{
      SelectShifts(item.shift,index,"add")
    }}
  >

  <Image 

  source={leftarrorwBox} style={{width:18,height:20}}/>
  </Pressable>
</View>

</View>

  )
})}

</View>
{
  role==="2"?
  <TouchableOpacity 
onPress={()=> Alert.alert("Notice","You are logged in as staff so you can not create a shift")


}
style={[Styles.LoginBtn,{marginBottom:10}]}>
<Text style={Styles.LoginTxt}>Staff can not create shift</Text>
</TouchableOpacity>
:
<TouchableOpacity 
onPress={()=> createShift()


}
style={[Styles.LoginBtn,{marginBottom:10}]}>
<Text style={Styles.LoginTxt}>Create</Text>
</TouchableOpacity>
}



 </ScrollView>
 
 )
 
 
 };
 
 const styles = StyleSheet.create({
  Header:{
    width:WindowWidth,
    height:WindowHeight/10,
    backgroundColor:"#5956E9",
    alignItems:'center',
    justifyContent:'center'
        },
  Container:{
    width:WindowWidth,
    alignItems:'center',
    backgroundColor:'white'
},
 cart:{
     width:WindowWidth/1.12,
     borderRadius:10,
     alignItems:"center",
     flexDirection:"row",
     justifyContent:"center",
 },
 smallCarts:{
width:WindowWidth/4.5,
height:WindowHeight/15.8,
borderRadius:9,
justifyContent:"center",
alignItems:'center',
flexDirection:'row'
 },
 smallCartsII:{
  width:WindowWidth/3.8,
  height:WindowHeight/9,
  borderRadius:9,
  justifyContent:"center",
  alignItems:'center',
  shadowColor:'black',
  flexDirection:'row',
  elevation:2,
  shadowOffset:{width:1,height:1}

 },


TextInput:{
width:WindowWidth/1.12,borderRadius:10,height:WindowHeight/17,
alignSelf:'center',
borderWidth:1,
borderColor:"#E1E1E1",
flexDirection:"row",
alignItems:'center'},


BottomCart:{
  width:WindowWidth/1.12,
  borderWidth:1,
  borderColor:"#E1E1E1",
  // height:WindowHeight/10,
  borderRadius:10,  
  alignItems:"center"
},

InnerBottomCart:{
  width:WindowWidth/1.12,
  height:WindowHeight/16,
  backgroundColor:maincolor,
  alignItems:"center",
  flexDirection:'row',
  borderRadius:10,
  justifyContent:'space-between',
},
InnerBottomCartI:{
  width:WindowWidth/1.32,
  height:WindowHeight/16,
  alignItems:"center",
  flexDirection:'row',
  justifyContent:'space-between',
  borderBottomColor:'#E1E1E1',
  borderBottomWidth:1
}

 });
 
 export default CreateShift;
 