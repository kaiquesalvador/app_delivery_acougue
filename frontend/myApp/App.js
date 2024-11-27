import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './screens/CategoriesScreen';
import ProductDetail from './screens/ProductDetail';
import CartScreen from './screens/CartScreen';
import { CartProvider } from './context/CartContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Categories">
          <Stack.Screen name="Cardápio" component={CategoriesScreen} />
          <Stack.Screen name="Detalhes" component={ProductDetail} />
          <Stack.Screen name="Carrinho" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;