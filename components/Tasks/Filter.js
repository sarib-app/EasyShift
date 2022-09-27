
 import React,{useState} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   ScrollView,
   TouchableOpacity,
Pressable,
TextInput
 } from 'react-native';
 import maincolor from '../Glogbal/color'
 const WindowWidth = Dimensions.get('window').width;
 const WindowHeight = Dimensions.get('window').height; 

 import checked from '../Assets/Images/checked.png'
 import unchecked from '../Assets/Images/unchecked.png'
import { filterConfig } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';

 const Filter =({
     onClick,

 })=>{

    const [Pending,setPending]= useState(false)
    const [inProgress,setInprogress]= useState(false)

     return(
         <View style={Styles.container}>
             <View style={Styles.Header}>

<Text style={Styles.Heading}>Advance Filters</Text>
             </View>
             <Text 
             style={Styles.Text}
            >Timecards Type
             </Text>

<View style={Styles.options}>
<View style={{flexDirection:'row',alignItems:'center'}}>
    <TouchableOpacity onPress={()=>setPending((prev)=>!prev)}>
    <Image source={Pending===false? unchecked:checked} style={{width:15,height:15}}/>

    </TouchableOpacity>
     <Text style={{marginLeft:10}}>Pending</Text>
</View>
<View style={{flexDirection:'row',alignItems:'center'}}>
    <TouchableOpacity onPress={()=>setInprogress((prev)=> !prev)}>
    <Image source={inProgress ===false? unchecked:checked} style={{width:15,height:15}}/>

    </TouchableOpacity>
     <Text style={{marginLeft:10}}>In Progress</Text>
</View>
</View>
<Text style={Styles.Text}>From</Text>
<View style={Styles.TextInput}>
    <TextInput
    value=''
    placeholder='enter value'
    />
</View>
<Text style={Styles.Text}>To</Text>
<View style={Styles.TextInput}>
    <TextInput
    value=''
    placeholder='enter value'
    />
</View>
<TouchableOpacity 
 onPress={()=> onClick()}
style={Styles.LoginBtn}>
    <Text style={Styles.Heading}>Apply</Text>

</TouchableOpacity>
         </View>
     )
 }
 const Styles =StyleSheet.create({
     container:{
         width:WindowWidth/1.4,
         height:WindowHeight/1.8,
         backgroundColor:'white',
         borderRadius:10,
         shadowColor:'black',
         elevation:10
     },
     Header:{
         width:WindowWidth/1.4,
         height:WindowHeight/12,
         backgroundColor:maincolor,
         borderTopLeftRadius:10,
         borderTopRightRadius:10,
         justifyContent:'center',
         alignItems:'center'
     },
     Text:{
         color:'#4C4C4C',
fontWeight:'bold',
margin:15
     },
     options:{
         width:WindowWidth/1.7,
         alignSelf:'center',
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:'center'
     },
     Heading:{color:'white',fontWeight:'500',fontSize:18},
     TextInput:{
         width:WindowWidth/1.6,
         height:WindowHeight/16,
         borderWidth:1,
         borderRadius:8,
         alignSelf:'center',
         borderColor:'#E1E1E1'
     },
     LoginBtn:{
        width:WindowWidth/1.7,
        height:WindowHeight/15,
        backgroundColor:"#5956E9",
        borderRadius:10,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
 })
 export default Filter