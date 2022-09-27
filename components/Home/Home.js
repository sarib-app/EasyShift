/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState,useEffect, useMemo} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   ScrollView,
   TouchableOpacity,
   TouchableWithoutFeedback,
Pressable
 } from 'react-native';
 
 import Styles from '../Glogbal/GlobalStyles';
 import Bell from '../Assets/Images/Bell.png'
 import Menu from '../Assets/Images/Menu.png'
 import Profile from '../Assets/Images/users.png'
 import stats1 from '../Assets/Images/stats1.png'

 import stats2 from '../Assets/Images/stats2.png'

 import stats3 from '../Assets/Images/stats3.png'

 import timer from '../Assets/Images/timer.png'
 import Rectangle1 from '../Assets/Images/Rectangle1.png'
 import forwards from '../Assets/Images/forwards.png'

 import Rectangl2 from '../Assets/Images/Rectangl2.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
 import MenuDrawer from 'react-native-side-drawer'
 import drawerContent from '../SideDrawer/SideDrawer';
 import ProgressCircle from 'react-native-progress-circle'

import Baseurl from '../../urls';
 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 

 const Home = () => {
  const[open , setOpen] = useState(false)

  const[name , setName] = useState("")
   const[RN  , setRN] = useState(0)
   const[LPN  , setLPN] = useState(0)
   const[CNA  , setCNA] = useState(0)
   const[Total  , setTotal] = useState(0)
   const[Total_Shifts  , setTotal_Shifts] = useState(0)
   const[Hours_Worked  , setHours_Worked] = useState(0)

   const[email  , setEmail] = useState("")
const[role,setRole]=useState()


  const getAsyncData=async()=>{
    
    const namee = await AsyncStorage.getItem('name')
    const emaill = await AsyncStorage.getItem('email')
    const savedtoken = await AsyncStorage.getItem('token')
    const savedrole = await AsyncStorage.getItem('role')
  const userId = await AsyncStorage.getItem('userId')
  const user_id= JSON.parse(userId)
if(emaill){
    setEmail(emaill)
    setRole(savedrole)
    setName(namee)
    getUserRecord(savedtoken,savedrole,user_id)
}

}
useEffect(() => {
  getAsyncData()

 }, [])


 const getUserRecord=(savedtoken,savedrole,user_id)=>{
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${savedtoken}`);

var formdata = new FormData();
formdata.append("user_id", user_id);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${Baseurl}getrecord`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    
    setCNA(result.CNA)
    setLPN(result.LPN)
    setRN(result.RN)
    setTotal(result.Total)
    setHours_Worked(result.Hours_Worked)
    setTotal_Shifts(result.Total_Shifts)

    console.log(result)})
  .catch(error => console.log('error', error));
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

<Image source={Profile} style={{width:48,height:48}} />
<View style={{marginLeft:20}}>
<Text style={{fontWeight:"bold",fontSize:16,color:'white'}}>Hello, {name}!</Text>
<Text style={{color:'white'}}>Today is your day.</Text>

</View>
</View>
<Image source={Bell} style={{width:20,height:24,margin:20}} />

   </View>
  


<Text style={styles.Text}>Shift Stats</Text>
<View style={{width:WindowWidth}}>
<ScrollView
horizontal={true}
showsHorizontalScrollIndicator={false}
style={styles.CartScroller}>
  <View style={styles.CartI}>
  <View style={styles.carts}>
  <ProgressCircle
            percent={Total_Shifts}
            radius={40}
            borderWidth={8}
            color="#3399FF"
            shadowColor="white"
            bgColor="#51CCAA"
        >
             <Text style={{ fontSize: 18 ,color:"white"}}>{Total_Shifts}</Text>
        </ProgressCircle>
</View>

<Text style={styles.CartText}>Total Shifts Worked</Text>
  </View>

  <View style={styles.CartI}>
  <View style={[styles.carts,{backgroundColor:"#FD5B71"}]}>
  <ProgressCircle
            percent={Total_Shifts}
            radius={40}
            borderWidth={8}
            color="#3399FF"
            shadowColor="white"
            bgColor="#FD5B71"
        >
             <Text style={{ fontSize: 18 ,color:"white"}}>{Total_Shifts}</Text>
        </ProgressCircle>
</View>
<Text style={styles.CartText}>Total Hours Worked</Text>
  </View>
  <View style={styles.CartI}>
  <View style={[styles.carts,{backgroundColor:"#FFA556"}]}>
  <ProgressCircle
            percent={Total_Shifts}
            radius={40}
            borderWidth={8}
            color="#3399FF"
            shadowColor="white"
            bgColor="#FFA556"
        >
             <Text style={{ fontSize: 18 ,color:"white"}}>{Total_Shifts}</Text>
        </ProgressCircle>
</View>
<Text style={styles.CartText}>Total Applicants</Text>
  </View>
</ScrollView>
</View>


<Text style={[styles.Text,{fontWeight:'500'}]}>Shift Positions</Text>


<View style={styles.SmallCartView}>
<View style={{alignItems:'center'}}>
<View style={styles.smallCarts}>
<Text style={styles.smallCartsText}>{CNA}</Text>
</View>
<Text style={{marginTop:10}}>CNA</Text>
</View>
<View style={{alignItems:'center'}}>

<View style={[styles.smallCarts,{backgroundColor:'#51CCAA'}]}>
<Text style={[styles.smallCartsText]}>{LPN}</Text>
</View>
<Text style={{marginTop:10,color:"#4C4C4C"}}>LPN</Text>
</View>



<View style={{alignItems:'center'}}>
<View style={[styles.smallCarts,{backgroundColor:"#FD5B71"}]}>
<Text style={styles.smallCartsText}>{RN}</Text>
</View>
<Text style={{marginTop:10,color:"#4C4C4C"}}>RN</Text>

</View>


<View style={{alignItems:'center'}}>
<View style={[styles.smallCarts,{backgroundColor:"#5956E9"}]}>
<Text style={styles.smallCartsText}>{Total}</Text>
</View>
<Text style={{marginTop:10,color:"#4C4C4C"}}>Total</Text>
</View>




</View>
<Text style={[styles.Text,{fontWeight:'500'}]}>{role==="2"?"My Tasks":"Publish Shifts"}</Text>
<View style={styles.shifts}>



<View style={styles.innershift}>
<Image
source={Rectangle1}
style={{width:48,height:48,margin:20}}

/>
<View>
  <Text style={{color:"#4C4C4C",fontWeight:'bold'}}>
  US Nursing and Rehab
  </Text>
  <View style={styles.shiftinnerII}>
<Image source={timer} style={{width:15,height:15}}/>
<Text style={{marginLeft:5}}>12am to 12pm</Text>
  </View>


</View>
</View>
<Image source={forwards} style={{width:27,height:27}} />

</View>


<View style={[styles.shifts,{marginTop:10}]}>



<View style={styles.innershift}>
<Image
source={Rectangl2}
style={{width:48,height:48,margin:20}}

/>
<View>
  <Text style={{color:"#4C4C4C",fontWeight:'bold'}}>
  US Nursing and Rehab
  </Text>
  <View style={styles.shiftinnerII}>
<Image source={timer} style={{width:15,height:15}}/>
<Text style={{marginLeft:5}}>12am to 12pm</Text>
  </View>


</View>
</View>
<Image source={forwards} style={{width:27,height:27}} />

</View>
</MenuDrawer>
 </Pressable>
 
 )
 
 
 };
 
 const styles = StyleSheet.create({
 Text:{
alignSelf:"flex-start",
 margin:20,
 fontSize:16,
 color:'#4C4C4C',
 fontWeight:'bold'},
 CartScroller:{
 },
 carts:{

backgroundColor:'#51CCAA',
borderRadius:8,
width:WindowWidth/2.87,
height:WindowHeight/6.7,
justifyContent:'center',
alignItems:"center"
 },
 CartI:
  {alignItems:'center',flex:1,marginRight:10,
},
CartText:
  {color:"#4C4C4C",fontSize:12,fontWeight:'500'},
  smallCarts:{
    width:WindowWidth/6.4,
    height:WindowHeight/13,
    borderRadius:8,
    backgroundColor:'#3397FF',
  justifyContent:'center',
alignItems:'center'  },
SmallCartView:{width:WindowWidth/1.1,flexDirection:'row',justifyContent:'space-between',alignSelf:'center'},
  smallCartsText:{
    color:'white',
    fontSize:16,
    fontWeight:'bold'
  },
  shifts:{
    width:WindowWidth/1.1,
    height:WindowHeight/8.7,
    borderRadius:5,
    backgroundColor:'#F0F4FE',
    borderColor:"#D4D3FF",
    borderWidth:1,
    flexDirection:'row',
    alignItems:'center',
    shadowColor:'black',
    elevation:0.5,
    alignSelf:'center'
  },
  innershift:{
    width:WindowWidth/1.25,
    height:WindowHeight/8.7,
    borderRadius:5,
  
    flexDirection:'row',
    alignItems:'center'
  },
  shiftinnerII:{flexDirection:"row",alignItems:'center',marginTop:5}

 


 });
 
 export default Home;
 