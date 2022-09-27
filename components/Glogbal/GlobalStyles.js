import {
  StyleSheet,

  Dimensions,
  
} from 'react-native';

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height; 

const Styles = StyleSheet.create({
    Container:{
        width:WindowWidth,
        height:WindowHeight,
        alignItems:'center',
        backgroundColor:'white'
    },
    Header:{
width:WindowWidth,
height:WindowHeight/10,
backgroundColor:"#5956E9",
flexDirection:'row',
alignItems:'center'
    },
    HeaderI:{
      width:WindowWidth/1.18,
      height:WindowHeight/10,
      flexDirection:'row',
      alignItems:'center'
          },
    TopView:{
   width:WindowWidth/1.08,
   marginTop:30
    },
    Text:{
     color:"#4C4C4C",
     margin:5,
     fontWeight:'bold'
   
    },
    InputView:{
      width:WindowWidth/1.08,
      height:WindowHeight/17,
      borderRadius:8,
      borderColor:'#E1E1E1',
       borderWidth:1,
       alignItems:"center",
       flexDirection:"row"
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
 export default Styles   