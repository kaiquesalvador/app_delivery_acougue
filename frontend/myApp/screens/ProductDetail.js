import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';


const ProductDetail = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { product } = params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [observation, setObservation] = useState('');

  const totalPrice = (product.price * quantity).toFixed(2);

  // Identificar a categoria e definir opções de detalhamento
  let options = [];
  if (product.category === 'Carnes para Churrasco') {
    options = [
      { id: '1', name: 'Para grelha' },
      { id: '2', name: 'Para espeto' },
      { id: '3', name: 'Peça inteira' },
    ];
  } else if (product.category === 'Bovino Dia a Dia') {
    if (product.name === 'Alcatra') {
      options = [
        { id: '1', name: 'Bife' },
        { id: '2', name: 'Picadinho' },
        { id: '3', name: 'Inteira limpa' },
      ];
    }else if (product.name === 'Músculo' || product.name === 'Acém' || product.name === 'Peito Bovino')
    options = [
      { id: '1', name: 'Moído 1x' },
      { id: '2', name: 'Moído 2x' },
      { id: '3', name: 'Picadinho' },
      { id: '4', name: 'Inteira limpa' },
    ];
    else
    options = [
      { id: '1', name: 'Moído 1x' },
      { id: '2', name: 'Moído 2x' },
      { id: '3', name: 'Bife' },
      { id: '4', name: 'Picadinho' },
      { id: '5', name: 'Inteira limpa' },
    ];
  } else if (product.category === 'Suíno') {
    if (product.name === 'Lombo Suíno' || product.name === 'Pernil') {
      options = [
        { id: '1', name: 'Bife' },
        { id: '2', name: 'Inteiro' },
        { id: '3', name: 'Picadinho' },
      ];
    } else if (product.name === 'Costelinha Suína') {
      options = [
        { id: '1', name: 'Tira inteira' },
        { id: '2', name: 'Pedaço' },
      ];
    } else if (product.name === 'Bacon') {
      options = [
        { id: '1', name: 'Fatiado' },
        { id: '2', name: 'Pedaço' },
      ];
    } else if (product.name === 'Panceta Suína') {
      options = [
        { id: '1', name: 'Inteiro' },
        { id: '2', name: 'Cubos' },
      ];
    }
  }

  const handleAddToCart = () => {
    if (
      product.category === 'Carnes para Churrasco' || 
      product.category === 'Bovino Dia a Dia'
    ) {
      if (!selectedOption) {
        alert('Por favor, selecione uma opção de corte.');
        return;
      }
    }
    addToCart({ ...product, quantity, selectedOption, observation }); // Adiciona ao carrinho
    navigation.navigate('Carrinho'); // Redireciona para a tela do carrinho
  };

  return (
    <View style={styles.container}>
      {/* Adiciona a imagem do produto */}
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>

      {options.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Qual a preferência do corte?</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setSelectedOption(item.name)}
              >
                <View style={styles.radioCircle}>
                  {selectedOption === item.name && <View style={styles.selectedCircle} />}
                </View>
                <Text style={styles.optionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      <Text style={styles.sectionTitle}>Alguma observação?</Text>
      <TextInput
        style={styles.observationInput}
        placeholder="Ex: Com mais gordura, mais magro, etc."
        value={observation}
        onChangeText={setObservation}
        maxLength={140}
      />

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalPrice}>Total: R$ {totalPrice}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Adicionar ao carrinho</Text>
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
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    color: '#388e3c',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#388e3c',
  },
  optionText: {
    fontSize: 14,
  },
  observationInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    fontSize: 20,
    width: 32,
    textAlign: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
