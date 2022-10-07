

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


import {
  Login, 
  Register, 
  HomeScreen, 
  DetailsScreen, 
  Onboarding, 
  Reservation, 
  OfferPack, 
  Profile,
  AdminPage,
  GererRam,
  AddRam
} from "./screens"
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
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="AdminPage" component={AdminPage} />
          <Stack.Screen name="GererRam" component={GererRam} />
          <Stack.Screen name="AddRam" component={AddRam} />
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
