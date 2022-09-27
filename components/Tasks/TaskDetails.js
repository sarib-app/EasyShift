

 import React,{useEffect, useState} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   
   TouchableOpacity,
Pressable,
FlatList,
Alert

 } from 'react-native';
 
 import Styles from '../Glogbal/GlobalStyles';
 import Menu from '../Assets/Images/Menu.png'
 import goback from '../Assets/Images/goback.png'
 import dp3 from '../Assets/Images/dp3.png'
 import rectangle6 from '../Assets/Images/rectangle6.png'
 import arrows from '../Assets/Images/arrows.png'
 import timer from '../Assets/Images/timer.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
 import { useNavigation } from '@react-navigation/native';
import maincolor from '../Glogbal/color';
import Baseurl from '../../urls';
import Time from '../../Data/Time';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Toggle from '../Assets/Images/Toggle.png'
import DisabledToggle from '../Assets/Images/ToggleDisabled.png'

 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 

 const TaskDetails = (props) => {
  const card_id = props.route.params.card_id
  console.log(card_id)

  const[Hide , setHide] = useState(true)
  const navigation = useNavigation()

  const HideSHhowFilter =()=>{
setHide((prev)=> !prev) 

}



const[userid,setuserId]=useState("")

const[role , setRole] = useState("1")
const [timeIn,setTimeIn]=useState("")
const [timeOut,setTimeout]=useState("")
const [time,setTime]=useState("am")
const[timeEditMode,setTimeEditMode]=useState("")

const[token , setToken] = useState("")
const [data,setData]=useState([])


const getAsyncData=async()=>{
  const savedtoken = await AsyncStorage.getItem('token')
  const savedrole = await AsyncStorage.getItem('role')
  const namee = await AsyncStorage.getItem('name')


  const userId = await AsyncStorage.getItem('userId')
  const user_id= JSON.parse(userId)

if(savedtoken){
setToken(savedtoken)
setRole(savedrole)
setuserId(user_id)
getData(savedtoken)
}

}
useEffect(()=>{
getAsyncData()
},[])






const SubmitCard=(id,time_in,time_out,hourly_rate)=>{
 
const T_in=timeIn ===""?time_in:timeIn
const T_out=timeOut ===""?time_out:timeOut


  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  
  var formdata = new FormData();
  formdata.append("time_in", T_in);
  formdata.append("time_out", T_out);
  formdata.append("status", "unapproved");
  formdata.append("user_id", userid);
  formdata.append("timelap", time);
  formdata.append("cardsubmited", "true");
  formdata.append("hours_worked", T_in - T_out);
  formdata.append("earning", (T_in-T_out)*hourly_rate);

  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${Baseurl}updatetimecard/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      Alert.alert("Sucess","Segment Submited Successfully")
      navigation.goBack()
      console.log(result)})
    .catch(error => console.log('error', error));
}


const approveTimeCard=(id,time_in,time_out,user_id,hours_worked,earning,timelap,cardsubmited)=>{

  console.log(userid)
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var formdata = new FormData();
    formdata.append("time_in", time_in);
    formdata.append("time_out", time_out);
    formdata.append("status", "approved");  
    formdata.append("user_id", user_id);
    formdata.append("timelap", timelap);
    formdata.append("cardsubmited", cardsubmited);
    formdata.append("hours_worked", hours_worked);
    formdata.append("earning", earning);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${Baseurl}updatetimecard/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        Alert.alert("Sucess","Approved Successfully")
        navigation.goBack()
        console.log(result)})
      .catch(error => console.log('error', error));
  }
  








const getData=(savedtoken)=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${savedtoken}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`${Baseurl}timecardwithid/${card_id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      
      setData(result.timecard)
      console.log(result.timecard )}
      
      )
    .catch(error => console.log('error', error));
}





const renderTime=({item})=>(
  <Pressable 
  
  onPress={()=>{
    timeEditMode==="timein"?setTimeIn(item.time):setTimeout(item.time)
    setTimeEditMode("")
  }}
  style={{backgroundColor:"white",borderBottomColor:"rgba(0,0,0,0.5)",borderBottomWidth:0.8,width:WindowWidth/1.8,height:WindowHeight/16,marginBottom:10,justifyContent:"center",alignItems:'center',borderRadius:20}}>

  <Text style={{color:"rgba(0,0,0,0.5)",fontSize:20}}>{item.time}:00</Text>
  </Pressable>
  )
const TimePicker =()=>{
  return(
    <View style={styles.timepicker}>
<View style={{flexDirection:'row',margin:10}}>
<Text>Am </Text>

<Pressable
onPress={()=>setTime("am")}
>

<Image source={time=== "am"?Toggle:DisabledToggle} style={{width:40,height:20}}/>
</Pressable>

<Text>Pm </Text>
<Pressable
onPress={()=>setTime("pm")}
>
<Image source={time=== "pm"?Toggle:DisabledToggle} style={{width:40,height:20}}/>
</Pressable>

</View>
      <FlatList
   showsVerticalScrollIndicator={false}

   data={Time}
   renderItem={renderTime}
      
      />




</View>
  )



}

 return(
 
 <Pressable 
 
 style={[Styles.Container,{alignItems:"center",backgroundColor:'#F0F4FE'}]}>




   
<View  style={Styles.Header}>

<TouchableOpacity
onPress={()=> navigation.goBack()}
>

<Image source={goback} style={{width:8,height:14,margin:20}} />
  </TouchableOpacity>  


<View style={{flex:1}}>

<Text style={{alignSelf:'center',marginRight:40,color:'white',fontSize:18,fontWeight:'bold'}}>Time Card</Text>
</View>
</View>



<View style={{width:WindowWidth/1.12,margin:20}}>
    <Text style={{color:"#292929",fontSize:16,fontWeight:"bold"}}>
    Current Shifts
    </Text>
    
    </View>

    {
      data.map((item)=>{
        return(
          <>
          <View style={styles.cart}>
          <View style={styles.cartInnerI}>
          <Image  source={dp3} style={{width:87,height:87}}/>
          <View style={{alignItems:"center",justifyContent:"space-evenly"}}>
          <Image  source={arrows} style={{width:36,height:26,marginBottom:10}}/>
          <View style={styles.Cna}><Text>{item.shift_position}{data.length}</Text></View>
          </View>
          <Image  source={rectangle6} style={{width:87,height:87}}/>
          
          </View>
          
          <View style={styles.durationView}>
          {((item.time_in-item.time_out)*item.hourly_rate) <0?
          
          <Text style={styles.DurationTxt}> { item.time_out ==="null"?"0 hour worked":"Hours Worked "+(item.hours_worked)*-1}  
              </Text >
        :
        <Text style={styles.DurationTxt}> { item.time_out ==="null"?"0 hour worked":"Hours Worked "+(item.hours_worked)}  
        </Text >
        }
            
      
          </View>

{((item.time_in-item.time_out)*item.hourly_rate) <0?

<Text style={{color:maincolor,margin:10,marginBottom:10}}>
{item.time_out ==="null"?"Earnings $0": "Earnings $"+(item.earning)*-1}
</Text>:
<Text style={{color:maincolor,margin:10,marginBottom:10}}>
{item.time_out ==="null"?"Earnings $0": "Earnings $"+item.earning}
</Text>

}

         
          </View>
          
          
          <View style={styles.midCart}>
          
          
            <View style={styles.cartInnerII}>
          <Text style={styles.cartIIText}>
          Faculity
          </Text>
          <Text style={styles.cartIIText}>
          Date
          </Text>
          <Text style={styles.cartIIText}>
          Time
          </Text><Text style={styles.cartIIText}>
          Rate
          </Text>
          
            </View>
          
            <View style={styles.cartInnerIII}>
          <Text style={styles.cartIIIText}>
          {item.faculty_id}
          </Text>
          <Text style={styles.cartIIIText}>
          {moment(item.created_at).format('DD-MM-YYYY')}
          </Text>
          <Text style={styles.cartIIIText}>
          {item.shift_time}
          </Text><Text style={styles.cartIIIText}>
          {item.hourly_rate}
          </Text>
          
            </View>
          
          
          </View>
          
          
          <View style={styles.cart}>
            <View style={styles.clockIncart}>
              <View style={{margin:10,flexDirection:"row",alignItems:"center"}}>
              <Image source={timer} style={{tintColor:"#01C853",width:14,height:14}}/>
          
          <Text style={{fontWeight:"bold",marginLeft:10,marginRight:10}}>Clock in</Text>
          <View style={{backgroundColor:"#01C853",width:50,height:20,borderRadius:5,justifyContent:"center",alignItems:"center"}}>
            <Text
            
            onPress={()=>setTimeEditMode("timein")}
            style={{color:"white"}}>edit</Text>
          </View>
              </View>

              {
                timeIn === ""?
                <Text>{item.time_in==="null"?"Not set":item.time_in}</Text>:
                <Text>{timeIn}</Text>

              }
            </View>
            <View style={styles.clockIncart}>
              <View style={{margin:10,flexDirection:"row",alignItems:"center"}}>
              <Image source={timer} style={{tintColor:"#EE4751",width:14,height:14}}/>
          
          <Text style={{fontWeight:"bold",marginLeft:10,marginRight:10}}>Clock Out</Text>
          <View style={{backgroundColor:"#EE4751",width:50,height:20,borderRadius:5,justifyContent:"center",alignItems:"center"}}>
            <Text onPress={()=>setTimeEditMode("timeout")} style={{color:"white"}}>edit</Text>
          </View>
              </View>
              {timeOut === ""?
              <Text>{item.time_out==="null"?"not set":item.time_out}</Text>
           :
           <Text>{timeOut}</Text>
            
            }
            </View>
          </View>
          {
            role==="1"?<TouchableOpacity 
          
            onPress={()=>{
              
              if(item.time_in==="null" && item.time_out==="null"){
                Alert.alert("Stop,","This user have not set up their clock in/out")
                
              }
              else{
                item.status==="approved"?Alert.alert("Stop","You have already approved this user can not approve again"):
                approveTimeCard(item.id,item.time_in,item.time_out,item.user_id,item.hours_worked,item.earning,item.timelap,item.cardsubmited)
             }
            
            
            
            }}
            
            style={Styles.LoginBtn}>
            <Text style={Styles.LoginTxt}>{item.status==="approved"?"Already Approved":"Approve Timecard"}</Text>
            </TouchableOpacity>
            :
            
            <TouchableOpacity 
          
            onPress={()=>{
              
              if(timeIn==="" && timeOut===""){
                Alert.alert("Stop,","Please select clock in and clock out first")
              }else{
                item.cardsubmited==="true"?Alert.alert("Operation Failed", "You have already submited the card"):
                SubmitCard(item.id,item.time_in,item.time_out,item.hourly_rate)}}
              }
            
            style={Styles.LoginBtn}>
          <Text style={Styles.LoginTxt}>{item.cardsubmited==="true"?"card already submited":"Submit Timecard"}</Text>
          </TouchableOpacity>


          
        }
        
          
              </>
        )
      })
    }
    {timeEditMode===""?null:
    <View style={{marginTop:-WindowHeight/2}}>


<TimePicker/>
    </View>
    }


 </Pressable>
 
 )
 
 
 };
 
 const styles = StyleSheet.create({

 cart:{
     width:WindowWidth/1.2,
     backgroundColor:"white",
     borderRadius:10,
     shadowColor:"black",
     elevation:5,
     alignItems:"center"
 },
 cartInnerI:{
    width:WindowWidth/1.4,
    margin:10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
 },
 Cna:{backgroundColor:"#3397FF",
 width:50,
 height:21,
 borderRadius:4,
 justifyContent:'center',
 alignItems:'center'},
 durationView:{
     width:WindowWidth/2.4,
     height:WindowHeight/17,
     backgroundColor:maincolor,
     borderRadius:25,
     justifyContent:"center",
     alignItems:'center',
     
 },
 DurationTxt:{
     color:'white',
     fontWeight:'bold',
     fontSize:16,
     fontWeight:"600"
 },
 cartInnerII:{
width:WindowWidth/3.8,
justifyContent:"space-between",
borderRightWidth:1,
borderColor:'#D4D3FF',
margin:10
 },
 cartIIText:{
color:"#4C4C4C",
fontWeight:"600",
margin:8

 },
 midCart:{
  width:WindowWidth/1.2,
  backgroundColor:"white",
  borderRadius:10,
  shadowColor:"black",
  elevation:5,
  margin:20,
  flexDirection:'row',
  alignItems:'center'
},
cartInnerIII:{
  width:WindowWidth/2,
  justifyContent:"space-between",

  margin:10,
  alignItems:'center'
   },
   cartIIIText:{
  color:"#4C4C4C",
  margin:8
  
   },
 

   clockIncart:{
width:WindowWidth/1.4,
borderBottomColor:"#D4D3FF",
borderBottomWidth:1,
flexDirection:"row",
alignItems:"center",
justifyContent:'space-between'

   },
   timepicker:{width:WindowWidth/1.6,
   height:WindowHeight/3.5,
   alignSelf:'center',
   backgroundColor:"white",
  borderRadius:20,
shadowColor:"black",
elevation:10,
justifyContent:"center",
alignItems:'center'}



   




 


 });
 
 export default TaskDetails;
 