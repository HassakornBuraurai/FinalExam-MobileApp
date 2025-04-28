import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import BookingContext from '../context/BookingContext';

export default function BookingStatusScreen() {
  const { bookingInfo } = useContext(BookingContext);

  if (!bookingInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No booking yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.info}>Restaurant: {bookingInfo.restaurantName}</Text>
      <Text style={styles.info}>Name: {bookingInfo.name}</Text>
      <Text style={styles.info}>Phone: {bookingInfo.phone}</Text>
      <Text style={styles.info}>People: {bookingInfo.people}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginTop: 10,
  },
});
