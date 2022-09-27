

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
TextInput,
FlatList
 } from 'react-native';
 import moment from "moment";
 import { useIsFocused } from '@react-navigation/native';

 import Styles from '../Glogbal/GlobalStyles';
 import Bell from '../Assets/Images/Bell.png'
 import Menu from '../Assets/Images/Menu.png'
 import forwards from '../Assets/Images/forwards.png'
 import Rectangl2 from '../Assets/Images/Rectangl2.png'
 import progressed from '../Assets/Images/progressed.png'
 import unapproved from '../Assets/Images/unapproved.png'

 import Search from '../Assets/Images/Search.png'
 import bag from '../Assets/Images/bag.png'
 import Filter from '../Assets/Images/filter.png'

import Filterr from './Filter';
 import MenuDrawer from 'react-native-side-drawer'
import { useNavigation } from '@react-navigation/native';
 import drawerContent from '../SideDrawer/SideDrawer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Baseurl from '../../urls';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';

 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 

 const Tasks = () => {
   const navigation = useNavigation()
   const focused =useIsFocused()
  const[open , setOpen] = useState(false)
    const[searchInput , setSearchInput] = useState("")

  const[Hide , setHide] = useState(true)
  const[faculty,setFaculty]=useState("")
  const[userid,setuserId]=useState("")

const[role , setRole] = useState("1")
const[token , setToken] = useState("")
const [data,setData]=useState([])
const [filteredResults, setFilteredResults] = useState([]);

  const HideSHhowFilter =()=>{
setHide((prev)=> !prev) 

}



const getAsyncData=async()=>{
  const savedtoken = await AsyncStorage.getItem('token')
  const savedrole = await AsyncStorage.getItem('role')
  const namee = await AsyncStorage.getItem('name')

  const userId = await AsyncStorage.getItem('userId')
  const user_id= JSON.parse(userId)

if(savedtoken){
setToken(savedtoken)
setRole(savedrole)
setFaculty(namee)
setuserId(user_id)
getData(savedtoken,user_id,savedrole)
}

}
useEffect(()=>{
 
  getAsyncData()
  
  },[focused===true])

 
 
 
 
  const searchItems = (searchValue) => {
    if(searchValue){
      setSearchInput(searchValue)
    }
    else{
      setSearchInput(searchValue)
    }
      if (searchInput !== '') {
          const filteredData = data.filter((item) => {
              return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
          })
          setFilteredResults(filteredData)
      }
      else{
          setFilteredResults(data)
      }
  }
 
  useEffect(() => {
    setFilteredResults(data)

  }, [!searchInput])
 
 

 
 
 
  const getData=(savedtoken,user_id,savedrole)=>{
    console.log(savedrole==="2"?"sdasd":"dont")
    console.log(user_id)
    const endpoint=savedrole==="2"?`fetchtimecard/${user_id}`:`fetchalltimecard`
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${savedtoken}`);

var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${Baseurl}${endpoint}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    setFilteredResults( savedrole==='1'? result.Timecards:result.timecard)
    setData( savedrole==='1'? result.Timecards:result.timecard)
    console.log(result)
  console.log(savedrole)
  
  })
  .catch(error => console.log('error', error));
  }




const timecards=({item})=>(
  <View style={[styles.shifts,{marginTop:0}]}>



<View style={styles.innershift}>
<Image
source={Rectangl2}
style={{width:48,height:48,margin:20}}

/>

<View>
  <Text style={{color:"#4C4C4C",fontWeight:'bold'}}>
  {item.description}
  </Text>
  <View style={styles.shiftinnerII}>
<Image source={item.status==="unapproved"?unapproved:progressed} style={{width:15,height:15}}/>
<Text style={{marginLeft:5,color:item.status==="unapproved"?"red":"#66C692"}}>{item.status}<Text style={{color:"#8A8A8A"}}> on {moment(item.created_at).format('DD-MM-YYYY')}</Text></Text>
  </View>
  <View style={styles.shiftinnerII}>
<Image source={bag} style={{width:13,height:14}}/>
<Text style={{marginLeft:5}}>Applied by {item.faculty_id}</Text>
  </View>

</View>
</View>
<TouchableOpacity onPress={()=> {navigation.navigate("TaskDetails",{card_id:item.id})}}>
<Image source={forwards} style={{width:27,height:27}} />

</TouchableOpacity>


</View>
)



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

<TouchableOpacity
onPress={()=> setOpen(true)}
>

<Image source={Menu} style={{width:21,height:14,margin:20}} />
  </TouchableOpacity>  


<View style={{flex:1}}>

<Text style={{alignSelf:'center',marginRight:40,color:'white',fontSize:18,fontWeight:'bold'}}>Time Card</Text>
</View>
</View>
<View style={styles.TextInput}>
  <Image source={Search} style={{width:15,height:15,marginLeft:15,marginRight:5}}/>
  <TextInput value={searchInput}
  
  onChangeText={(e)=>searchItems(e)} placeholder='Search' style={{flex:1}} />
  {/* <TouchableOpacity onPress={()=> HideSHhowFilter()}>
  <Image source={Filter} style={{width:18,height:18,marginRight:15}}/>

  </TouchableOpacity> */}
</View>

<FlatList
data={filteredResults}
renderItem={timecards}

/>
<View style={{ width:WindowWidth/1.1,
    height:WindowHeight/8.7,backgroundColor:"transparent"}}>





</View>



{/* 
{Hide === true ? null:
  <View style={{alignSelf:'center',marginTop:-WindowHeight/3}}>
<Filterr onClick={HideSHhowFilter}/>

</View>
} */}



</MenuDrawer>
 </Pressable>
 
 )
 
 
 };
 
 const styles = StyleSheet.create({

 
 

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
    alignSelf:'center',
    marginBottom:10
  },
  innershift:{
    width:WindowWidth/1.25,
    height:WindowHeight/8.7,
    borderRadius:5,
  
    flexDirection:'row',
    alignItems:'center'
  },
  shiftinnerII:{flexDirection:"row",alignItems:'center',marginTop:5},
   
TextInput:{
  width:WindowWidth/1.12,borderRadius:10,backgroundColor:'#F0F4FE',height:WindowHeight/17,margin:20,
alignSelf:'center',
shadowColor:'black',
elevation:5,
flexDirection:"row",
alignItems:'center'},



 


 });
 
 export default Tasks;
 