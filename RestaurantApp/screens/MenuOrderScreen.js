import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { useState } from 'react';

export default function MenuOrderScreen({ route }) {
  const { menu } = route.params;
  const [orderItems, setOrderItems] = useState([]);

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
    Alert.alert('Order Sent', 'The order has been sent');
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
      />

      <Text style={styles.subtitle}>Your Order:</Text>

      {orderItems.map((item, index) => (
        <View key={index} style={styles.orderItemRow}>
          <Text style={styles.orderItem}>
            {item.name} × {item.quantity} (฿{(item.price * item.quantity).toFixed(2)})
          </Text>
          <View style={styles.buttonGroup}>
            <Button title="+" onPress={() => handleAddItem(item)} />
            <Button title="-" onPress={() => handleRemoveItem(item)} />
          </View>
        </View>
      ))}

      <Text style={styles.total}>รวมราคา: ฿{calculateTotal()}</Text>

      <View style={styles.confirmButton}>
        <Button title="Confirm Order" onPress={handleConfirmOrder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
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
  },
  confirmButton: {
    marginTop: 20,
  },
});
