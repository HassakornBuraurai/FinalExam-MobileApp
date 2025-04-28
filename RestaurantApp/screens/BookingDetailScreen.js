import { View, Text, Button, StyleSheet } from 'react-native';

export default function BookingDetailScreen({ navigation, route }) {
  const { bookingInfo } = route.params; // 👈 receive booking data

  const handleOrderFood = () => {
    navigation.navigate('MenuOrder', { menu: bookingInfo.menu });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.info}>Restaurant: {bookingInfo.restaurantName}</Text>
      <Text style={styles.info}>Name: {bookingInfo.name}</Text>
      <Text style={styles.info}>Phone: {bookingInfo.phone}</Text>
      <Text style={styles.info}>People: {bookingInfo.people}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Order Food" onPress={handleOrderFood} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 40,
  },
});

