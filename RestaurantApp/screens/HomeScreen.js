import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import restaurants from '../data/restaurants';

export default function HomeScreen({ navigation }) {
  const handlePress = (restaurant) => {
    navigation.navigate('Booking', { restaurant });
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restaurant List</Text>

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderRestaurantItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
});
