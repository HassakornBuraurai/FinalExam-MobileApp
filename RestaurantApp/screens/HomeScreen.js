import { View, FlatList } from 'react-native';
import RestaurantItem from '../components/RestaurantItem';
import restaurants from '../data/restaurants';

export default function HomeScreen({ navigation }) {
  const handlePress = (restaurant) => {
    navigation.navigate('Booking', { restaurant });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantItem 
            restaurant={item} 
            onPress={() => handlePress(item)} 
          />
        )}
      />
    </View>
  );
}
