import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import BookingStatusScreen from './screens/BookingStatusScreen';
import MenuOrderScreen from './screens/MenuOrderScreen';

import BookingContext from './context/BookingContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking Status" component={BookingStatusScreen} />
      <Tab.Screen name="Menu Order" component={MenuOrderScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [bookingInfo, setBookingInfo] = useState(null);

  return (
    <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Booking" component={BookingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BookingContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
