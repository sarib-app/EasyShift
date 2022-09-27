

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
 import Menu from '../Assets/Images/Menu.png'
import ChatProf from '../Assets/Images/users.png'
import Search from '../Assets/Images/Search.png'
 import MenuDrawer from 'react-native-side-drawer'
 import drawerContent from '../SideDrawer/SideDrawer';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Baseurl from '../../urls';
import moment from "moment";

 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 

 const Chat = () => {
   const navigation = useNavigation()
   const[searchInput , setSearchInput] = useState("")
   const[userData , setUserData] = useState([])
const [userid,setUserId]=useState("")

  const[open , setOpen] = useState(false)
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    if(searchValue){
      setSearchInput(searchValue)
    }
    else{
      setSearchInput(searchValue)
    }
      if (searchInput !== '') {
          const filteredData = userData.filter((item) => {
              return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
          })
          setFilteredResults(filteredData)
      }
      else{
          setFilteredResults(userData)
      }
  }
 
  useEffect(() => {
    setFilteredResults(userData)

  }, [!searchInput])
  const getAsyncData= async()=>{
    const savedtoken = await AsyncStorage.getItem('token')
    const savedrole = await AsyncStorage.getItem('role')
    const namee = await AsyncStorage.getItem('name')
  
  
    const userId = await AsyncStorage.getItem('userId')
    const user_id= JSON.parse(userId)
    if(savedtoken){
      getAllusers(savedtoken)
      setUserId(user_id)
    }
  }
  const getAllusers =(savedtoken)=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${savedtoken}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${Baseurl}getallusers`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setFilteredResults(result.Users)
        
        setUserData(result.Users)
        console.log(result.Users)})
      .catch(error => console.log('error', error));
  }


  useEffect(()=>{
    getAsyncData()
  },[])


const renderUsers=({item})=>(
<TouchableOpacity
onPress={()=> navigation.navigate('ChatInbox',{name:item.name,id:item.id})}
style={styles.ChatView}
>
  <View style={{flexDirection:"row"}}>

 
<Image source={ChatProf} style={{width:40,height:40}} />
<View style={{marginLeft:15}}>
  <Text style={{color:"#4C4C4C",fontWeight:"600"}}>
    {item.name}
  </Text>
  <Text>
    {item.email}
  </Text>
</View>
</View>
<Text>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
</TouchableOpacity>
)

 return(
 
 <Pressable 
 
 onPress={()=> setOpen(false)}
 style={[Styles.Container]}>



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

<Text style={{alignSelf:'center',marginRight:40,color:'white',fontSize:18,fontWeight:'bold'}}>Chat</Text>
</View>
   </View>

<View style={styles.TextInput}>
  <Image source={Search} style={{width:15,height:15,marginLeft:15,marginRight:5}}/>
  <TextInput value={searchInput} onChangeText={(e)=>searchItems(e)} placeholder='Search' style={{flex:1}} />
</View>

{/* <TouchableOpacity
onPress={()=> navigation.navigate('ChatInbox')}
style={styles.ChatView}
>
  <View style={{flexDirection:"row"}}>

 
<Image source={ChatProf} style={{width:40,height:40}} />
<View style={{marginLeft:15}}>
  <Text style={{color:"#4C4C4C",fontWeight:"600"}}>
    Maude loreum
  </Text>
  <Text>
    Hahaha Lol
  </Text>
</View>
</View>
<Text>2:24 pm</Text>
</TouchableOpacity> */}
<FlatList
data={filteredResults.filter((item)=>item.id !=userid)}
renderItem={renderUsers}

/>



</MenuDrawer>
 </Pressable>
 
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
 
 export default Chat;
 