import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import BookingStatusScreen from './screens/BookingStatusScreen';
import MenuOrderScreen from './screens/MenuOrderScreen';

import BookingContext from './context/BookingContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: '#FF7F50',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
      backgroundColor: '#fff',
      height: 70,
      paddingBottom: 10,
      paddingTop: 5,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    headerShown: false,
  }}
>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Text style={{ fontSize: 22 }}>{focused ? '🏠' : '🏠'}</Text>
      ),
      tabBarLabel: 'Home',
    }}
  />
  <Tab.Screen
    name="Booking Status"
    component={BookingStatusScreen}
    options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Text style={{ fontSize: 22 }}>{focused ? '📋' : '📋'}</Text>
      ),
      tabBarLabel: 'Booking',
    }}
  />
  <Tab.Screen
    name="Menu Order"
    component={MenuOrderScreen}
    options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Text style={{ fontSize: 22 }}>{focused ? '🍽️' : '🍽️'}</Text>
      ),
      tabBarLabel: 'Menu',
    }}
  />
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
