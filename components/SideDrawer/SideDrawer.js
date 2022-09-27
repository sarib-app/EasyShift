import { View, Text, StyleSheet, TouchableOpacity,Dimensions, Alert, ScrollView ,Image} from 'react-native'
import * as React from 'react';
import { useState, useEffect ,useRef} from "react";
// import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Setting from '../Assets/Images/Setting.png'

import chat from '../Assets/Images/chat.png'
import Home from '../Assets/Images/Home.png'
import Logout from '../Assets/Images/Logout.png'
import Notification from '../Assets/Images/Notification.png'
import Tasks from '../Assets/Images/Tasks.png'
import shifts from '../Assets/Images/shifts.png'
import Profile2 from '../Assets/Images/users.png'





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const drawerContent = () => {
    const navigation = useNavigation(); 

    const[name , setName] = useState("")
    const[email  , setEmail] = useState("")
 
 
   const getAsyncData=async()=>{
     const namee = await AsyncStorage.getItem('name')
     const emaill = await AsyncStorage.getItem('email')
 if(emaill){
     setEmail(emaill)
     setName(namee)
 
 }
 
 }
 useEffect(() => {
   getAsyncData()
 
  }, [])
 
 

    const TogleOption = (props) =>{

    //   Alert.alert('Working Fine')
      navigation.navigate(props)
  
  }




  



    
    return (
        <View>
        <ScrollView>
      <View  style={styles.animatedBox}>
  
{/* ///    1 */}


          <TouchableOpacity 
        style={[styles.Options,{height:windowHeight/4.5,backgroundColor:'#5956E9',width:'100%',marginLeft:0}]}
       >

<Image source={Profile2} style={{width:64,height:64,margin:20}}/>
<View>
  <Text style={{fontWeight:'bold',fontSize:16,color:"white"}}>{name}</Text>
  <Text style={{color:'white',marginTop:5}}>{email}</Text>

</View>
        </TouchableOpacity>


{/* ///    2 */}

<TouchableOpacity 
        onPress={() => TogleOption('Home') }
        style={[styles.Options]}
       >
         <Image source={Home} style={{width:20,height:20,margin:10}}/>
<Text style={styles.OptionsText}>
    Home
</Text>
        </TouchableOpacity>

        {/* ///    3 */}

<TouchableOpacity 
        onPress={() => TogleOption('FindShifts') }
        style={[styles.Options]}
       >
         <Image source={shifts} style={{width:20,height:20,margin:10}}/>
<Text style={styles.OptionsText}>
Shifts
</Text>
        </TouchableOpacity>

       {/* ///    4 */}

       <TouchableOpacity 
        onPress={() => TogleOption('Tasks') }
        style={[styles.Options]}
       >
         <Image source={Tasks} style={{width:18,height:14,margin:10}}/>
<Text style={styles.OptionsText}>
Time Card
</Text>
        </TouchableOpacity>



        
       {/* ///    5 */}

       <TouchableOpacity 
        onPress={() => TogleOption('Chat') }
        style={[styles.Options]}
       >
         <Image source={chat} style={{width:20,height:20,margin:10}}/>
<Text style={styles.OptionsText}>
Chat
</Text>
        </TouchableOpacity>


                
       {/* ///    6 */}

       <TouchableOpacity 
        onPress={() => TogleOption('Notification') }
        style={[styles.Options]}
       >
         <Image source={Notification} style={{width:17,height:20,margin:10}}/>
<Text style={styles.OptionsText}>
Notification
</Text>
        </TouchableOpacity>
              
       {/* ///    7 */}

       <TouchableOpacity 
        onPress={() => TogleOption('Setting') }
        style={[styles.Options]}
       >
         <Image source={Setting} style={{width:16,height:18,margin:10}}/>
<Text style={styles.OptionsText}>
Setting
</Text>
        </TouchableOpacity>


              {/* ///    8 */}

       <TouchableOpacity 
        onPress={() => TogleOption('Login') }
        style={[styles.Options]}
       >
         <Image source={Logout} style={{width:16,height:16,margin:10}}/>
<Text style={styles.OptionsText}>
Logout
</Text>
        </TouchableOpacity>






        

    
      
      </View>
      </ScrollView>
      </View>
    );
  };
  const styles = StyleSheet.create({
  
    animatedBox: {
    //   marginTop:65,
      
    //   flex: 1,
      backgroundColor:'white',
      height:windowHeight,
      borderTopRightRadius:30,
borderBottomRightRadius:30
    },
 
    OptionsText:{color:'#4C4C4C',fontWeight:'400',margin:15,marginLeft:0},
    Options:{
        borderBottomColor:'#E47900',
        flexDirection:'row',
        alignItems:'center',
marginLeft:10

}
  })
  export default drawerContent;