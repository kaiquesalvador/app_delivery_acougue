import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cart, clearCart, removeFromCart } = useCart();
  const navigation = useNavigation();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>
                  {item.quantity}x {item.name}
                </Text>
                <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
              </View>
              {item.selectedOption && (
                <Text style={styles.itemDetail}>Corte: {item.selectedOption}</Text>
              )}
              {item.observation && (
                <Text style={styles.itemDetail}>Obs: {item.observation}</Text>
              )}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('Detalhes', { product: item })}
              >
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <Text style={styles.total}>Subtotal: R$ {calculateTotal()}</Text>
      <TouchableOpacity
        style={styles.addMoreButton}
        onPress={() => navigation.navigate('Cardápio')}
      >
        <Text style={styles.addMoreText}>Adicionar mais itens</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
        <Text style={styles.clearButtonText}>Limpar carrinho</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  cartItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#388e3c',
    fontWeight: 'bold',
  },
  itemDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  editButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 16,
    marginBottom: 16,
  },
  addMoreButton: {
    backgroundColor: '#388e3c',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  addMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
