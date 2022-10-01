// import React from "react";
// import {
//     Image,
//     TouchableOpacity
// } from 'react-native';
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// // screens
// import { Onboarding, DestinationDetail } from "./screens/";
// // extra screens
// import Tabs from "./navigation/tabs";

// import { icons, COLORS, SIZES } from './constants';


// const theme = {
//     ...DefaultTheme,
//     colors: {
//         ...DefaultTheme.colors,
//         border: "transparent",
//     },
// };

// const Stack = createStackNavigator();

// const App = () => {
//     return (
//         <NavigationContainer theme={theme}>
//             <Stack.Navigator
//                 initialRouteName={'Onboarding'}
//             >
//                 {/* Screens */}
//                 <Stack.Screen
//                     name="Onboarding"
//                     component={Onboarding}
//                     options={{
//                         title: null,
//                         headerStyle: {
//                             backgroundColor: COLORS.white
//                         },
//                         headerLeft: null,
//                         headerRight: () => (
//                             <TouchableOpacity
//                                 style={{ marginRight: SIZES.padding }}
//                                 onPress={() => console.log("Pressed")}
//                             >
//                                 <Image
//                                     source={icons.barMenu}
//                                     resizeMode="contain"
//                                     style={{
//                                         width: 25,
//                                         height: 25,
//                                     }}
//                                 />
//                             </TouchableOpacity>
//                         ),
//                     }}
//                 />

//                 <Stack.Screen
//                     name="DestinationDetail"
//                     component={DestinationDetail}
//                     options={{ headerShown: false }}
//                 />

//                 {/* Tabs */}
//                 < Stack.Screen
//                     name="Home"
//                     component={Tabs}
//                     options={{
//                         title: null,
//                         headerStyle: {
//                             backgroundColor: COLORS.white
//                         },
//                         headerLeft: ({ onPress }) => (
//                             <TouchableOpacity
//                                 style={{ marginLeft: SIZES.padding }}
//                                 onPress={onPress}
//                             >
//                                 <Image
//                                     source={icons.back}
//                                     resizeMode="contain"
//                                     style={{
//                                         width: 25,
//                                         height: 25,
//                                     }}
//                                 />
//                             </TouchableOpacity>
//                         ),
//                         headerRight: () => (
//                             <TouchableOpacity
//                                 style={{ marginRight: SIZES.padding }}
//                                 onPress={() => console.log("Menu")}
//                             >
//                                 <Image
//                                     source={icons.menu}
//                                     resizeMode="contain"
//                                     style={{
//                                         width: 25,
//                                         height: 25,
//                                     }}
//                                 />
//                             </TouchableOpacity>
//                         ),
//                     }}
//                 />


//             </Stack.Navigator>
//         </NavigationContainer >
//     );
// };

// export default () => {
//     return <App />;
// };




import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { auth } from './firebase';
import { firebase } from './firebase';


import {Login, Register, HomeScreen, DetailsScreen, Onboarding, Reservation, OfferPack} from "./screens"
const Stack = createNativeStackNavigator();

export default function App() {

  const [logged, setLogged] = useState(false)

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       setLogged(true)
  //     }
  //   })
  //   return unsubscribe;
  // }, [])

  return (
      <NavigationContainer>
        {/* <StatusBar translucent backgroundColor={Colors.primary} /> */}
        <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: true, animationTypeForReplace: 'pop', presentation: 'card'}}>
          {/* {logged === false ? <Stack.Screen name="Login" component={Login} /> : null }   */}
          {/* {logged === false ? <Stack.Screen name="Register" component={Register} /> : null } */}
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Reservation" component={Reservation} />
          <Stack.Screen name="OfferPack" component={OfferPack} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
