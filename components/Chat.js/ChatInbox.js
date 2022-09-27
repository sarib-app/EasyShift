

 import React,{useEffect, useState,useRef} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   ScrollView,
   TouchableOpacity,
   TextInput,
   KeyboardAvoidingView,
Pressable,
Alert
 } from 'react-native';
 
 import Styles from '../Glogbal/GlobalStyles';
 import Bell from '../Assets/Images/Bell.png'
 import Menu from '../Assets/Images/Menu.png'
import avatar from '../Assets/Images/Profile.png'
import DropDownBtn from '../Assets/Images/DropDownBtn.png'

import Toggle from '../Assets/Images/Toggle.png'
import DisabledToggle from '../Assets/Images/ToggleDisabled.png'
import data from '../../Data/chat';
import goback from '../Assets/Images/goback.png'
import { useNavigation } from '@react-navigation/native';
import chatmenu from '../Assets/Images/chatmenu.png'
 import MenuDrawer from 'react-native-side-drawer'
 import drawerContent from '../SideDrawer/SideDrawer';
 import forward from '../Assets/Images/forward.png'
 import Dp from '../Assets/Images/users.png'
 import emoji from '../Assets/Images/emoji.png'
 import attachment from '../Assets/Images/attachment.png'


 import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import Baseurl from '../../urls';
 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 

 const ChatInbox = (props) => {
  const flatlistRef = useRef();

     const navigation = useNavigation()
     const id=props.route.params.id
     const name=props.route.params.name
     const[token , setToken] = useState("")
     const[role,setRole]=useState("")
const [chat,setChat]=useState([])
  const[open , setOpen] = useState([])
  const[Myid , setMyId] = useState("1")

  const [starCounter,setStartCounter]=useState(false)
  
const[oldLength,setOldLength]=useState(0)

const [errorEncounted,setErrorEncounted]=useState(0)

const[chatInput,setChatInput] = useState("")

// const sendChat =()=>{
//   setChat((prevItems) => [
//     ...prevItems,
//     {
//       reciever : 20,
//       sender :1,
//       message: chatInput,
//       date:"sdasdas",
//       is_Seen:"false",
//       id:2
//     },
//     {
//       reciever : 1,
//       sender :20,
//       message: "Sorry i cant understand",
//       date:"sdasdas",
//       is_Seen:"false",
//       id:2
//     },
//   ]);
//   setChatInput("")
// }





const getAsyncData=async()=>{
  const savedtoken = await AsyncStorage.getItem('token')
  const savedrole = await AsyncStorage.getItem('role')
  const namee = await AsyncStorage.getItem('name')


  const userId = await AsyncStorage.getItem('userId')
  const user_id= JSON.parse(userId)

if(savedtoken){
setToken(savedtoken)
setRole(savedrole)
setMyId(user_id)
getChat(savedtoken,user_id)
}

}
useEffect(()=>{
getAsyncData()
},[])





const [newLen,setNewLen]=useState()

////////////////getting chat opn first render/////////////////
const getChat=(savedtoken,user_id)=>{
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${savedtoken}`);

var formdata = new FormData();
formdata.append("reciever_id", user_id);
formdata.append("sender_id", id);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${Baseurl}listchat`, requestOptions)
  .then(response => response.json())
  .then(result =>
    {
      if(!result.message){

        if(result.messages.length>0){
          
          setChat(result.messages)
          setOldLength(result.messages.length)
          
          const timer = setTimeout(() => {
            onPress()
          }, 1000);
          setStartCounter(true)
          return () => clearTimeout(timer);
          
        }
      }
  
  })
  .catch(error => 
   { if(error){
      return null
     }}
    
    );
}

//////////setting scroll animations
const onPress=()=>{
  flatlistRef.current.scrollToEnd({animating: true});

}


/////////// SENDING CHAT /////////////////////////

const sendChat=()=>{
  
  setChatInput("")
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var formdata = new FormData();
formdata.append("reciever_Id", id);
formdata.append("sender_Id", Myid);
formdata.append("message", chatInput);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${Baseurl}sendchat`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    getChatAgain()
    setChatInput("")
  
  })
  .catch(error => {

  });

}


////////////METHOD FOR GETTING NEW CHAT COUNT////////////////////////


useEffect(() => {
  const interval = setInterval(() => {
     
      getNewLength()
      

    
  }, 1000);
  return () => clearInterval(interval);
}, [starCounter]);



const getNewLength=()=>{
  const my_id=Number(Myid)
  const other_id=Number(id)
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var formdata = new FormData();
formdata.append("reciever_id", my_id);
formdata.append("sender_id", other_id);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${Baseurl}chatcount`, requestOptions)
  .then(response => response.json())
  .then(result => {

if(result.chat_count){

  if(result.chat_count>oldLength){
    setStartCounter(false)
    getChatAgain() 


    // console.log("nwwx WALA",result.chat_count)
    
  }
  
}
})
.catch(error =>{
  if(error){

    return null
  }
 });
}

///////////GETTING CHAT AGAIN/////////////////


const getChatAgain=async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  
  var formdata = new FormData();
  formdata.append("reciever_id", Myid);
  formdata.append("sender_id", id);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${Baseurl}listchat`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      if(result.messages.length>0){
        setOldLength(result.messages.length)
  // console.log("chat get krte hui",result.messages.length,oldLength)
  
  setStartCounter(true)
        setChat(result.messages)

    
        const timer = setTimeout(() => {
          onPress()
        }, 1000);
        return () => clearTimeout(timer);
        
      }
      // console.log(result)
    })
    .catch(error =>{
      
     if(error){
      return null
     }
    
    
    });
}


////////RENDERING CHAT/////////////////


const renderChat=({item})=>(
  <View style={{alignSelf:item.sender_id===`${Myid}`?"flex-end":"flex-start",flexDirection:'row',alignItems:'center'}}>
  {item.sender_id === `${Myid}` ? null :
<Image source={Dp} style={{width:40,height:40,marginLeft:10}}/>
  }
<View style={{margin:10,backgroundColor:item.sender_id!=`${Myid}`?"#F0F4FE":"#5956E9",borderRadius:10}}>

<Text style={{color:item.sender_id === `${Myid}` ? "white":"#606A82",margin:10}}>{item.message}</Text>
</View>
</View>

)





 return(
  <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
 style={styles.Container}>






   <View  style={[Styles.Header,{justifyContent:'space-between'}]}>
     <View style={[Styles.HeaderI]}>

   <TouchableOpacity
   onPress={()=> navigation.goBack()}
   >

   <Image source={goback} style={{width:8,height:14,margin:20}} />
     </TouchableOpacity>  

     <Text 
     
     onPress={()=>{onPress()}}
     style={{color:'white',fontWeight:'bold',fontSize:18}}>{name}</Text>

</View>
<Image source={chatmenu} style={{width:20,height:20,margin:20}}/>
   </View>

   

<View style={{width:WindowWidth,flex:1}}>
{/* {
  chat.map((item)=>{
    
    return(
     <View style={{alignSelf:item.sender_id==="3"?"flex-end":"flex-start",flexDirection:'row',alignItems:'center'}}>
       {item.sender_id === Myid ? null :
     <Image source={Dp} style={{width:40,height:40,marginLeft:10}}/>
       }
     <View style={{margin:10,backgroundColor:item.sender_id!=Myid?"#F0F4FE":"#5956E9",borderRadius:10}}>
     
     <Text style={{color:item.sender_id === Myid ? "white":"#606A82",margin:10}}>{item.message}</Text>
     </View>
     </View>
   
    )
  })




} */}
{chat.length>0?
<FlatList
ref={flatlistRef}
data={chat}
renderItem={renderChat}
/>
:
null}
</View>
<View style={{alignSelf:'center'}}>
<View style={styles.TextInput}>
  <Image source={emoji} style={{width:22,height:22,marginLeft:15,marginRight:5}}/>
  <TextInput value={chatInput} onChangeText={(e)=> setChatInput(e)} placeholder='Search' style={{flex:1}} />
  <TouchableOpacity onPress={()=> HideSHhowFilter()}>
    <TouchableOpacity onPress={()=> sendChat()}>
    <Image source={attachment} style={{width:20,height:11,marginRight:15}}/>

    </TouchableOpacity>

  </TouchableOpacity>
</View>
</View>


  

 </KeyboardAvoidingView>
 
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
          
        },
        Container:{
          width:WindowWidth,
          height:WindowHeight,
          backgroundColor:'white'
      },
      TextInput:{
        width:WindowWidth/1.12,borderRadius:10,backgroundColor:'#F0F4FE',height:WindowHeight/17,marginBottom:50,
      alignSelf:'flex-end',
      shadowColor:'black',
      elevation:5,
      flexDirection:"row",
      alignItems:'center',
      borderWidth:1,
      borderColor:"#E1E1E1"
},
 
 




 


 });
 
 export default ChatInbox;
 