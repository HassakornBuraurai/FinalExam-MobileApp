import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { useState, useContext } from 'react';
import BookingContext from '../context/BookingContext';

export default function MenuOrderScreen() {
  const { bookingInfo, setBookingInfo } = useContext(BookingContext);
  const [orderItems, setOrderItems] = useState([]);

  if (!bookingInfo || !bookingInfo.menu) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 18 }}>Please book a restaurant first.</Text>
      </View>
    );
  }

  const menu = bookingInfo.menu;

  const handleAddItem = (item) => {
    setOrderItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (item) => {
    setOrderItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        if (found.quantity === 1) {
          return prev.filter((i) => i.id !== item.id);
        } else {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          );
        }
      }
      return prev;
    });
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0).toFixed(2);
  };

  const handleConfirmOrder = () => {
    if (orderItems.length === 0) {
      Alert.alert('Warning', 'Please select at least one item.');
      return;
    }

    let orderSummary = orderItems.map(
      (item) => `${item.name} × ${item.quantity} = ฿${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    orderSummary += `\n\nTotal: ฿${calculateTotal()}`;


    setBookingInfo({
      ...bookingInfo,
      orderedItems: orderItems,
    });

    Alert.alert('Order Confirmed', orderSummary);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleAddItem(item)}>
            <Text style={styles.itemText}>
              {item.name} - ฿{item.price ? item.price.toFixed(2) : '0.00'}
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Text style={styles.subtitle}>Your Order:</Text>

      <ScrollView style={styles.orderList}>
        {orderItems.length === 0 ? (
          <Text style={styles.emptyOrder}>No items selected yet.</Text>
        ) : (
          orderItems.map((item, index) => (
            <View key={index} style={styles.orderItemRow}>
              <Text style={styles.orderItem}>
                {item.name} × {item.quantity} (฿{(item.price * item.quantity).toFixed(2)})
              </Text>
              <View style={styles.buttonGroup}>
                <Button title="+" onPress={() => handleAddItem(item)} />
                <Button title="-" onPress={() => handleRemoveItem(item)} />
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Text style={styles.total}>Total Price: ฿{calculateTotal()}</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#555',
  },
  orderList: {
    maxHeight: 250,
  },
  emptyOrder: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  orderItem: {
    fontSize: 18,
    flex: 1,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 5,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#FF7F50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
