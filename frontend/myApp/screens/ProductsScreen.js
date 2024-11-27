import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchProductsByCategory } from '../services/api';

const ProductsScreen = ({ route }) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProductsByCategory(categoryId);
      setProducts(data);
    };
    loadProducts();
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productText}>{item.name}</Text>
            <Text style={styles.productText}>R$ {item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  productItem: { padding: 12, backgroundColor: '#f8f8f8', marginBottom: 8, borderRadius: 8 },
  productText: { fontSize: 18 },
});

export default ProductsScreen;