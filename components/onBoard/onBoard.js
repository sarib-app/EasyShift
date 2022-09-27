

 import React,{useState,useEffect} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   TouchableOpacity
 } from 'react-native';
 
 import TopImg from '../Assets/Images/Ellipse4.png'
 import Logo from '../Assets/Images/Logo1.png'
 import { useNavigation } from '@react-navigation/native';
 import SplashScreen from '../Splash/Splash';
 const WindowWidth = Dimensions.get('window').width
 const WindowHeight = Dimensions.get('window').height; 
 
 
 const OnBoard =() => {
     const navigation = useNavigation()
     const [loading , setLoading] = useState(true)

 
     useEffect(()=>{

        const intervalId = setInterval(() => {  
        setLoading(false)
      
        }, 3000)
        return () => clearInterval(intervalId);
      },[])
    
 
 
     return(
 
        <>
        {loading === true ? <SplashScreen/> :
     <View style={styles.Container}>
        <View style={styles.Header}>
    <Image source={TopImg} style={styles.Img}/>
    </View>
    <View style={{alignItems:'center'}}>
    <Image source={Logo} style={{width:70,height:70}}/>
    <Text style={styles.LogoTitle}>anyshift</Text>
    <Text style={styles.LogoSSubTitle}>Veracity Care Staffing LLC</Text>
    <Text style={styles.LogoSSubTitle}>Trusted Nurcing Professionals</Text>
    </View>
    <Text style={{color:'black',fontSize:38,textAlign:'center',margin:10}}>
    Feel more{'\n'}productive{'\n'}than ever.
    </Text>
<Text style={{textAlign:'center'}}>
Easyshift helps you create ,{'\n'}
edit and view your work{'\n'} 
schedule and swapping shifts.
</Text>
<TouchableOpacity
onPress={()=> navigation.navigate('Login')}
style={styles.LoginBtn}>
<Text style={styles.LoginTxt}>Login</Text>
</TouchableOpacity>
<TouchableOpacity 
onPress={()=> navigation.navigate('Register')}

style={styles.LoginBtn}>
<Text style={styles.LoginTxt}>Create Account</Text>
</TouchableOpacity>

     </View>
 }
  </>
 )
 
 
 };
 
 const styles = StyleSheet.create({
    Container:{
        width:WindowWidth,
        height:WindowHeight,
        
        alignItems:"center"
    },
    Header:{
        width:WindowWidth,

    },
    Img:{
        width:80,
        height:80
    },
    LogoTitle:{
        color:'#5956E9',fontSize:39
    },
    LogoSSubTitle:{
        color:'black'
    },
    LoginBtn:{
        width:WindowWidth/1.2,
        height:WindowHeight/13,
        backgroundColor:"#5956E9",
        borderRadius:10,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    LoginTxt:{color:'white',fontWeight:'bold',fontSize:16}
 });
 
 export default OnBoard;
 