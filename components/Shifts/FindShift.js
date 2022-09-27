

 import React,{useState,useEffect} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   TextInput,
   TouchableOpacity,
Pressable,
ImageBackground,
Alert,
FlatList

 } from 'react-native';
 
 import Styles from '../Glogbal/GlobalStyles';
 import Menu from '../Assets/Images/Menu.png'
 import goback from '../Assets/Images/goback.png'
 import dp3 from '../Assets/Images/dp3.png'
 import rectangle6 from '../Assets/Images/rectangle6.png'
 import arrows from '../Assets/Images/arrows.png'
 import AfterNoon from '../Assets/Images/AfterNoon.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

 import { useNavigation } from '@react-navigation/native';
import maincolor from '../Glogbal/color';
import Search from '../Assets/Images/Search.png'
import Filter from '../Assets/Images/filter.png'
import clander from '../Assets/Images/clander.png'
import Baseurl from '../../urls';
 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 

 const FindShifts = () => { 
  const[Hide , setHide] = useState(true)
  const navigation = useNavigation()
  const[searchInput , setSearchInput] = useState("")
  const[userid,setuserId]=useState("")
  const[shifts,setShifts]=useState([])
  const[timeCard,setTimeCard]=useState([])
  const[facultyname,setFacultyname]=useState("")
  const [filteredResults, setFilteredResults] = useState([]);


  const HideSHhowFilter =()=>{
setHide((prev)=> !prev) 

}
const[role , setRole] = useState("1")
const[token , setToken] = useState("")

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
setFacultyname(namee)
console.log(user_id)
getData(savedtoken)

}

}

const getData=(token)=>{
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${Baseurl}fetchpostunapproved`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
    setShifts(result.Posts)
    setFilteredResults(result.Posts)
    console.log(result)})
  .catch(error => console.log('error', error));
}
useEffect(()=>{
 
  getAsyncData()
  
  },[])
  const applyTimeCard=(id,shift_position,shift_time,hourly_rate,description,select_amount,status,days,faculty)=>{



    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({    
  
  "role_id":role,
  "shift_id":id,
  "shift_position":shift_position,
  "shift_time":shift_time,
  "hourly_rate":hourly_rate,
  "description":description,
  "select_amount":select_amount,
  "status":"unapproved",
  "user_id":userid,
  "faculty_id":facultyname,
  "timelap":"am",
  "cardsubmited":false,
  "hours_worked" :0,
  "earning":0,


  "Days":days

});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${Baseurl}createtimecard`, requestOptions)
  .then(response => response.json())
  .then(result => {
    Alert.alert("Success","Shift Applied Succesfully")
    navigation.goBack()
    console.log(result)})
  .catch(error => console.log('error', error.message));
  
  }
  

  const ApplForShift =(id,shift_position,shift_time,hourly_rate,description,select_amount,status,days,faculty)=>{
console.log(faculty)

    Alert.alert("Apply ?","if you want to apply click yes",[
      {
      text:"yes",
      onPress:()=>{applyTimeCard(id,shift_position,shift_time,hourly_rate,description,select_amount,status,days,faculty)}
     
    },
    {
      text:"No",
      onPress:()=>{}
     
    },
  
  ]
  
  
  )
  }


////////////setting fiiltered result/////////////



const searchItems = (searchValue) => {
  if(searchValue){
    setSearchInput(searchValue)
  }
  else{
    setSearchInput(searchValue)
  }
    if (searchInput !== '') {
        const filteredData = shifts.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(shifts)
    }
}

useEffect(() => {
  setFilteredResults(shifts)

}, [!searchInput])














const Allshifts  = ({ item }) => (
 
 
    <TouchableOpacity 
        
    onPress={()=>ApplForShift(item.id,item.shift_position,item.shift_time,item.hourly_rate,item.description,item.select_amount,item.status,item.days,item.faculty_id)}
    style={[styles.shifts,{marginTop:0}]}>
    <View style={{margin:10}}>
    <ImageBackground
    style={{width:65,height:65,justifyContent:'center',alignItems:'center'}}
source={clander}
>

<Text style={{textAlign:"center",fontSize:14}}>{moment(item.created_at).format('DD-MM-YYYY')}</Text>

</ImageBackground>
    </View>
<View style={{justifyContent:"center",alignItems:'center'}}>
<Text style={{color:"#4C4C4C",fontWeight:"bold"}}>{item.description}</Text>
<View style={{flexDirection:'row'}}>
  <Image 
  style={{width:20,height:20,marginRight:10}}
  source={AfterNoon}/>

  <Text>{item.shift_time}</Text>
</View>
<Text>Created By {item.faculty_id}</Text>
</View>



<View style={{justifyContent:"center",alignItems:'center'}}>
<Text style={{color:"#FFFFFF",fontWeight:"bold",backgroundColor:"#3397FF",width:40,alignSelf:'center'}}>{item.shift_position}</Text>


  <Text>${item.hourly_rate}/hr</Text>
</View>




</TouchableOpacity>
  
  
  
)








 return(
 
 <View 
 
 style={[Styles.Container,{alignItems:"center",backgroundColor:'#F0F4FE'}]}>




   
<View  style={Styles.Header}>

<TouchableOpacity
onPress={()=> navigation.goBack()}
>

<Image source={goback} style={{width:8,height:14,margin:20}} />
  </TouchableOpacity>  


<View style={{flex:1}}>

<Text style={{alignSelf:'center',marginRight:40,color:'white',fontSize:18,fontWeight:'bold'}}>Find Shift</Text>
</View>
</View>


<View style={styles.TextInput}>
  <Image source={Search} style={{width:15,height:15,marginLeft:15,marginRight:5}}/>
  <TextInput value={searchInput} onChangeText={(e)=>searchItems(e)}  placeholder='Search' style={{flex:1}} />
  <TouchableOpacity>
  <Image source={Filter} style={{width:18,height:18,marginRight:15}}/>

  </TouchableOpacity>
</View>


<View style={{width:WindowWidth/1.12}}>
    <Text style={{color:"#292929",fontSize:16,fontWeight:"bold"}}>
    Current Shifts
    </Text> 
    
    </View> 
  
    <FlatList
  data={filteredResults}
  renderItem={Allshifts}
    />

 </View>
 
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
   TextInput:{
    width:WindowWidth/1.12,borderRadius:10,backgroundColor:'#F0F4FE',height:WindowHeight/17,margin:20,
  alignSelf:'center',
  shadowColor:'black',
  elevation:5,
  flexDirection:"row",
  alignItems:'center',
marginBottom:0},


shifts:{
  width:WindowWidth/1.1,
  height:WindowHeight/8.7,
  borderRadius:5,
  backgroundColor:'#EDF5FF',
  borderColor:"#D4D3FF",
  borderWidth:1,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:"space-evenly",
  shadowColor:'black',
  elevation:0.5,
  alignSelf:'center',
  marginBottom:10
}


   




 


 });
 
 export default FindShifts;
 