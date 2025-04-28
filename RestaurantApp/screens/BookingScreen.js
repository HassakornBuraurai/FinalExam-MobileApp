import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState, useContext } from 'react';
import BookingContext from '../context/BookingContext'; // 👈 import context

export default function BookingScreen({ navigation, route }) {
  const { restaurant } = route.params;
  const { setBookingInfo } = useContext(BookingContext); // 👈 use context

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState('');

  const handleConfirmBooking = () => {
    const bookingData = {
      restaurantName: restaurant.name,
      name,
      phone,
      people,
      menu: restaurant.menu, // ✅ include menu
    };

    setBookingInfo(bookingData); // ✅ Save booking info globally
    navigation.navigate('MainTabs'); // ✅ Go back to main bottom tabs
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of People"
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
      />

      <Button title="Confirm Booking" onPress={handleConfirmBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
});
