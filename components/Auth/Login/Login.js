

 import React ,{useState} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   TextInput,
   TouchableOpacity,
   Alert
 } from 'react-native';
 import Styles from '../../Glogbal/GlobalStyles';
 import Icon from 'react-native-vector-icons/Ionicons';
 import FbLogin from '../../Assets/Images/fbLogin.png'
 import Line from '../../Assets/Images/Line.png'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';
import eye from "../../Assets/Images/eye.png"
import googleIcon from "../../Assets/Images/googlIcon.png"
import Baseurl from '../../../urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { load } from 'link';
 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 
 const Login =() => {
   const navigation = useNavigation()
   const [securetext , setSecureText] = useState(true)
   const [loading , setLoading] = useState(false)


   const [password , setPassword] = useState("")

   const [Email , setEmail] = useState("")
   const Login = ()=>{
     if(Email === "admin@admin.com" && password ==="12345678"){
navigation.navigate("Home")
     }
     else{
Alert.alert("Error","Kindly add correct credentials")
     }
   }
   const login =()=>{
    setLoading(true)
    var formdata = new FormData();
    formdata.append("email",Email);
    formdata.append("password", password);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${Baseurl}login`, requestOptions)
      .then(response => response.json())
      .then(result => {
        AsyncStorage.setItem('token',result.token)
        AsyncStorage.setItem('login',"true")
        AsyncStorage.setItem('name',result.user.name)
        AsyncStorage.setItem('email',result.user.email)
        AsyncStorage.setItem('role',result.user.roleid)
        AsyncStorage.setItem('userId',JSON.stringify(result.user.id))
        console.log("sss",result.user.roleid)

setLoading(false)
        navigation.navigate("Bottom")

        console.log(result)})
      .catch(error => {
        
        setLoading(false)
        console.log('error', error)
      Alert.alert("Error","Kindly add correct credentials")

    });
   }



   
 return(
 
   <View style={Styles.Container}>

  <View style={Styles.TopView}>
<TouchableOpacity
onPress={()=> navigation.goBack()}

>
<Icon

name='chevron-back'  style={{marginLeft:5}} size={25} color='#4C4C4C'    />
</TouchableOpacity>



<Text style={{color:"#4C4C4C",fontSize:24,marginLeft:5,marginTop:15,fontWeight:'bold'}}>Welcome</Text>
<Text style={{color:'#8A8A8A',margin:5}}>Login to continue</Text>
</View>
<View style={Styles.TopView}>

<Text style={styles.Text}>Email</Text>



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
<Text style={[styles.Text,{color:"#438EEC"}]}>Forgot Password?</Text>


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


{loading===true?
  <TouchableOpacity 

style={Styles.LoginBtn}>
<Text style={Styles.LoginTxt}>Loading....</Text>
</TouchableOpacity>:
<TouchableOpacity 
onPress={()=> login()}
style={Styles.LoginBtn}>
<Text style={Styles.LoginTxt}>Login</Text>
</TouchableOpacity>

}

<View style={styles.socialView}>
<Pressable style={styles.SocialBtn}>
<Image source={FbLogin} style={{width:10,height:20}} />
<Text style={styles.socialLoginTxt}>Fcebook</Text>
</Pressable>
<Pressable style={styles.SocialBtn}>
<Image source={googleIcon} style={{width:20,height:20}} />
<Text style={styles.socialLoginTxt}>Google</Text>
</Pressable>
</View>
<View style={{flexDirection:'row',alignItems:'center'}}>
<Image source={Line} style={{width:WindowWidth/2.9,height:2}}/>
<Text style={{color:"#4C4C4C",marginLeft:10,marginRight:10}}>Or</Text>
<Image source={Line} style={{width:WindowWidth/2.6,height:2}}/>

</View>
<Text style={{color:'#8A8A8A',marginTop:20}}>Don{"'"}t have an account? <Text 

onPress={()=> navigation.navigate("Register")}
style={{color:'#438EEC',fontWeight:'bold',marginLeft:10}}>Sign up</Text></Text> 
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
 socialView:{
width:WindowWidth/1.2,
margin:20,
flexDirection:'row',
justifyContent:'space-between'
 },
 SocialBtn:{
width:WindowWidth/2.6,
height:WindowHeight/16,
backgroundColor:'#F4F7FD',
borderRadius:8,
shadowColor:'black',
elevation:6,
opacity:0.8,
flexDirection:'row',justifyContent:'center',
alignItems:'center'
 },
 socialLoginTxt:{
  color:"#4C4C4C",
  fontWeight:'bold',
  marginLeft:10
 }
 });
 
 export default Login;
 