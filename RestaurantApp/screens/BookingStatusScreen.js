import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import BookingContext from '../context/BookingContext';

export default function BookingStatusScreen() {
  const { bookingInfo } = useContext(BookingContext);

  if (!bookingInfo) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noBookingText}>No booking yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Details</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Restaurant Info</Text>
        <Text style={styles.label}>Restaurant:</Text>
        <Text style={styles.value}>{bookingInfo.restaurantName}</Text>

        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>User Info</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{bookingInfo.name}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{bookingInfo.phone}</Text>

        <Text style={styles.label}>Number of People:</Text>
        <Text style={styles.value}>{bookingInfo.people}</Text>

        <Text style={styles.label}>Booking Date:</Text>
        <Text style={styles.value}>{bookingInfo.date}</Text>

        {bookingInfo.orderedItems && bookingInfo.orderedItems.length > 0 && (
          <>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>Ordered Food</Text>
            {bookingInfo.orderedItems.map((item, index) => (
              <Text key={index} style={styles.orderItem}>
                {item.name} × {item.quantity} (฿{(item.price * item.quantity).toFixed(2)})
              </Text>
            ))}
          </>
        )}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  noBookingText: {
    fontSize: 18,
    color: 'gray',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#555',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#777',
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginVertical: 15,
  },
});
