/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Home from './components/Home/Home';
import OnBoard from './components/onBoard/onBoard';
import OnSuccess from './components/Auth/Register/OnSuccess';
import Setting from './components/Setting/Setting'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import { ColorfulTabBar } from 'react-navigation-tabbar-collection';
import HomeBottom from './components/Assets/Images/homebottom.png';
import TaskBottom from './components/Assets/Images/TaskBottom.png';
import add from './components/Assets/Images/add.png';
import setingBottom from './components/Assets/Images/setingBottom.png';
import ChatBottom from './components/Assets/Images/ChatBottom.png';
import Notification from './components/Notification/Notification';
import HomeIcon from './components/Assets/Images/Home.png'
import maincolor from './components/Glogbal/color';
import Tasks from './components/Tasks/Tasks';
import Chat from './components/Chat.js/Chat';
import ChatInbox from './components/Chat.js/ChatInbox';
import TaskDetails from './components/Tasks/TaskDetails';
import FindShifts from './components/Shifts/FindShift';
import CreateShift from './components/Shifts/Creat_Shift';
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();








const Bottom = () => {
  
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: maincolor,
          tabBarInactiveTintColor:"#E1E1E1"

        }}
        // tabBar={(props) => <ColorfulTabBar {...props} />}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            // icon: ({ focused, color, size }) => (
              
            // ),
            color: "blue",

            tabBarIcon: ({ color, size }) => (
              // <Icon name="stepforward" size={size} color={color} />
              <Image source={HomeBottom} style={{tintColor:color}}/>
            ),
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={Tasks}
          options={{
            title: 'Tasks',
           
            tabBarIcon: ({ color, size }) => (
              <Image source={TaskBottom} style={{tintColor:color}}/>
            ),
            color: 'green',
          }}
        />
              <Tab.Screen
          name="Add"
          component={CreateShift}
          options={{
            title: 'add',
           
            tabBarIcon: ({ color, size }) => (
              <Image source={add} style={{}}/>
            ),
            color: 'green',
          }}
        />
         <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            title: 'Chat',
           
            tabBarIcon: ({ color, size }) => (
              <Image source={ChatBottom} style={{tintColor:color}}/>
            ),
            color: 'green',
          }}
        />
         <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            title: 'Setting',
           
            tabBarIcon: ({ color, size }) => (
              <Image source={setingBottom} style={{tintColor:color}}/>
            ),
            color: 'green',
          }}
        />
   
   

      
      </Tab.Navigator>
  );
};




const App =() => {
  

 



return(

  <NavigationContainer>
  <Stack.Navigator initialRouteName="OnBoard"   screenOptions={{
      headerShown: false
    }} >


    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Bottom" component={Bottom} />
     
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="OnBoard" component={OnBoard} />
    <Stack.Screen name="OnSuccess" component={OnSuccess} />
    <Stack.Screen name="Notification" component={Notification} />

    <Stack.Screen name="ChatInbox" component={ChatInbox} />
    <Stack.Screen name="TaskDetails" component={TaskDetails} />
    <Stack.Screen name="CreateShift" component={CreateShift} />
    <Stack.Screen name="Tasks" component={Tasks} />
    <Stack.Screen name="Setting" component={Setting} />

    <Stack.Screen name="FindShifts" component={FindShifts} />


    <Stack.Screen name="Chat" component={Chat} />





  </Stack.Navigator>
</NavigationContainer>

)


};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
