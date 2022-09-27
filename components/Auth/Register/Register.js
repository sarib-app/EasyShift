

 import React,{useState} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   TextInput,
   TouchableOpacity,
   Pressable,
   Alert
 } from 'react-native';
 import Styles from '../../Glogbal/GlobalStyles';
 import Icon from 'react-native-vector-icons/Ionicons';
 import eye from "../../Assets/Images/eye.png"

 import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Baseurl from '../../../urls';
import { Colors } from 'react-native-paper';
 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 
 const Register =() => {
  const [securetext , setSecureText] = useState(true)

  const [password , setPassword] = useState("")
  const [userName , setUserName] = useState("")

  const [Email , setEmail] = useState("")
  const [loading , setLoading] = useState(false)


  const[role,setRole]=useState("2")
  const navigation = useNavigation()


const register =()=>{
  if(userName && Email && password && role ){
    setLoading(true)
    var formdata = new FormData();
    formdata.append("name", userName);
    formdata.append("email", Email);
    formdata.append("password", password);
    formdata.append("roleid", role);
    formdata.append("password_confirmation", password);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${Baseurl}register`, requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result)
      AsyncStorage.setItem('login',"true")
      AsyncStorage.setItem('name',result.user.name)
      AsyncStorage.setItem('email',result.user.email)
      AsyncStorage.setItem('role',role)
      AsyncStorage.setItem("token",result.token)
      AsyncStorage.setItem('userId',JSON.stringify(result.user.id))
      setLoading(false)
      navigation.navigate("OnSuccess")    
      
      
    })
    .catch(error => console.log('error', error));
  }
  else{
    Alert.alert("Warning","Some fields are empty")
  }
  }
  


 return(
 
   <View style={Styles.Container}>

  <View style={Styles.TopView}>

<Icon
onPress={()=> navigation.goBack()}
name='chevron-back'  style={{marginLeft:5}} size={25} color='#4C4C4C'    />


<Text style={{color:"#4C4C4C",fontSize:24,marginLeft:5,marginTop:15,fontWeight:'bold'}}>Create an account</Text>
<Text style={{color:'#8A8A8A',margin:5}}>Sign up to continue</Text>
</View>






<View style={[Styles.TopView,{backgroundColor:'white',marginTop:0,marginBottom:-30}]}>

<Text style={{color:"#4C4C4C",fontSize:24,marginLeft:5,marginTop:15,fontWeight:'bold'}}>SignUp As</Text>
<View style={{flexDirection:'row',margin:5}}>
  <Pressable 
   onPress={()=>setRole("2")}
  style={{width:50,height:30,backgroundColor:role==="2"?"#5956E9":'rgba(0,0,0,0.6)',justifyContent:"center",alignItems:"center",borderRadius:6}}>


<Text style={{color:'white'}}>Staff</Text>
  </Pressable>
  <Pressable 
  
  onPress={()=>setRole("1")}
  style={{width:70,height:30,backgroundColor:role==="1"?"#5956E9":'rgba(0,0,0,0.6)',justifyContent:"center",alignItems:"center",borderRadius:6}}>


<Text style={{color:'white'}}>Manager</Text>
  </Pressable></View>




</View>







<View style={Styles.TopView}>

<Text style={styles.Text}>Name</Text>



<View style={Styles.InputView}>
<TextInput 
style={{marginLeft:13,flex:1}}
placeholder="User Name"
keyboardType='email-address'
value={userName}
onChangeText={(e)=> setUserName(e)}

/>
</View>
<View style={styles.PasswordTextView}>


<Text style={[styles.Text]}>Email</Text>


</View>




<View style={Styles.InputView}>
<TextInput 
style={{marginLeft:13,flex:1}}
placeholder="Email"
value={Email}
onChangeText={(e)=> setEmail(e)}

/>
</View>



<View style={styles.PasswordTextView}>


<Text style={[styles.Text]}>Password</Text>


</View>




<View style={[Styles.InputView]}>
<TextInput 
style={{marginLeft:13,flex:1}}
placeholder="password"
value={password}
onChangeText={(e)=> setPassword(e)}
secureTextEntry={securetext}

/>
<TouchableOpacity
onPress={()=> setSecureText((prev)=>!prev)}

>
<Image
source={eye} style={{width:20,height:20,marginRight:13}}/>
</TouchableOpacity>

</View>



</View>
<TouchableOpacity 
onPress={()=> 
  register()
 }
style={Styles.LoginBtn}>
<Text style={Styles.LoginTxt}>{loading === false ?"Sign Up":"Loading..."}</Text>
</TouchableOpacity>


<Text style={{color:'#8A8A8A',marginTop:20}}>Already have an account? <Text onPress={() => navigation.navigate("Login")}style={{color:'#438EEC',fontWeight:'bold',marginLeft:10}}>Login</Text></Text> 
 </View>
 
 )
 
 
 };
 
 const styles = StyleSheet.create({

 Text:{
  color:"#4C4C4C",
  margin:5,
  fontWeight:'bold'

 },

 PasswordTextView:{marginTop:25,flexDirection:'row',width:WindowWidth/1.08,justifyContent:'space-between'},



 });
 
 export default Register;
 