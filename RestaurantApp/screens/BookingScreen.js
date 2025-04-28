import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useState, useContext } from 'react';
import BookingContext from '../context/BookingContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingScreen({ navigation, route }) {
  const { restaurant } = route.params;
  const { setBookingInfo } = useContext(BookingContext);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState('');
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleConfirmBooking = () => {
    const bookingData = {
      restaurantName: restaurant.name,
      name,
      phone,
      people,
      date,
      menu: restaurant.menu,
    };

    setBookingInfo(bookingData);
    navigation.navigate('MainTabs');
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB');
      setDate(formattedDate);
    }
  };

  const allFieldsFilled = name && phone.length === 10 && people && parseInt(people) <= 100 && date;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>

      <View style={styles.form}>
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
          onChangeText={(text) => {
            if (text.length <= 10 && /^[0-9]*$/.test(text)) {
              setPhone(text);
            }
          }}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Number of People"
          value={people}
          onChangeText={(text) => {
            if (/^\d+$/.test(text) && parseInt(text) <= 100) {
              setPeople(text);
            }
          }}
          keyboardType="number-pad"
        />
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: date ? '#000' : '#aaa', fontSize: 16 }}>
            {date ? date : 'Select Booking Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}

        {allFieldsFilled ? (
          <TouchableOpacity style={styles.button} onPress={handleConfirmBooking}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        ) : null}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  form: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF7F50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
