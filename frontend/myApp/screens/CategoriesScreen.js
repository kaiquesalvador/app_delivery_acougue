import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchText, setSearchText] = useState('');
  const { cart } = useCart();

  const uniqueItemsCount = cart.length;

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  const categories = [
    {
      id: '1',
      name: 'Promoções',
      products: [
        { id: '1', name: 'Costela Bovina', price: 29.99, description: 'PESO: 1KG', image: 'https://bretas.vtexassets.com/arquivos/ids/189079/6571c34f558925a4e8899349.jpg?v=638375511871470000' },
        { id: '2', name: 'Almôndega', price: 39.99, description: 'PESO: 1KG', image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/beirario/media/uploads/produtos/foto/b09eb23b0e398file.png' },
        { id: '3', name: 'Kit Hambúrguer', price: 59.99, description: '4 BLENDS 150G CADA, 4 PÃES DE HAMBÚRGUER, 8 FATIAS DE QUEIJO, 8 FATIAS DE BACON', image: 'https://ramalhocarnes.com.br/wp-content/uploads/2021/10/kit-burger-ramalho.jpg' },
      ],
    },
    {
      id: '2',
      name: 'Carnes para Churrasco',
      products: [
        { id: '4', name: 'Picanha', price: 69.99, description: 'GRELHA, ESPETO OU PEÇA INTEIRA', image: 'https://cdn.sistemawbuy.com.br/arquivos/aa0543e6e28970c84ad7321d40710790/produtos/6414a30c284ca/picanha-fresca-644da1b95ddc6.jpg' },
        { id: '5', name: 'Fraldinha', price: 44.99, description: 'GRELHA, ESPETO OU PEÇA INTEIRA', image: 'https://images.tcdn.com.br/img/img_prod/765092/fraldinha_preco_por_kg_389_1_20200326162338.jpg' },
        { id: '6', name: 'Contrafilé', price: 54.99, description: 'GRELHA, ESPETO OU PEÇA INTEIRA', image: 'https://cortedeourocarnes.com.br/wp-content/uploads/2020/05/contra-file-1.jpg' },
        { id: '7', name: 'Maminha', price: 52.99, description: 'GRELHA, ESPETO OU PEÇA INTEIRA', image: 'https://supermercadobomdemais.com.br/wp-content/uploads/2023/12/Maminha.png' },
      ],
    },
    {
      id: '3',
      name: 'Bovino Dia a Dia',
      products: [
        { id: '8', name: 'Alcatra', price: 52.99, description: 'Bife, Picadinho ou Peça Inteira', image: 'https://tb1304.vtexassets.com/arquivos/ids/192770/CARNE-ALCATRA--PECA-INTEIRA--4-KG.jpg?v=638089629807530000' },
        { id: '9', name: 'Patinho', price: 52.99, description: 'Moído, Bife ou Picadinho', image: 'https://tb1304.vtexassets.com/arquivos/ids/192777/Carne-patinho-500G.jpg?v=638089630292570000' },
        { id: '10', name: 'Músculo', price: 39.99, description: 'Moído, Inteiro ou em Cubos', image: 'https://boa.vtexassets.com/arquivos/ids/582514/Carne-Bovina-Musculo-Traseiro-kg.jpg?v=638614840448300000' },
        { id: '11', name: 'Acém', price: 39.99, description: 'Moído, Inteiro ou em Cubos', image: 'https://comper.vteximg.com.br/arquivos/ids/181715-1000-1000/1655329_acem_bov.jpg?v=637439081014330000' },
        { id: '12', name: 'Peito Bovino', price: 42.99, description: 'Moído, Inteiro ou em Cubos', image: 'https://tdc0wy.vteximg.com.br/arquivos/ids/163691-1000-1000/PONTA-DE-PEITO-BOVINO-KG.png?v=638489724566370000' },
      ],
    },
    {
      id: '4',
      name: 'Suíno',
      products: [
        { id: '13', name: 'Lombo Suíno', price: 24.99, description: 'Bife, Inteiro ou Picadinho', image: 'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw684344c4/Produtos/21504-0000000002150-lombo%20suino%20granel%20kg-acougue-1.jpg' },
        { id: '14', name: 'Pernil', price: 24.99, description: 'Bife, Inteiro ou Picadinho', image: 'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw34784541/Produtos/21539-0000000002153-pernil%20sem%20osso%20a%20granel%20kg-acougue-1.jpg' },
        { id: '15', name: 'Costelinha Suína', price: 39.99, description: 'Tira inteira ou Pedaço', image: 'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw3c861d00/Produtos/21512-0000000002151-costela%20suina%20a%20granel%20kg-acougue-1.jpg' },
        { id: '16', name: 'Bacon', price: 39.99, description: 'Fatiado ou Pedaço', image: 'https://pelotas.supernicolini.com.br/wp-content/uploads/2020/04/2025600000005.jpg' },
        { id: '17', name: 'Panceta Suína', price: 19.99, description: 'Inteiro ou Cubos', image: 'https://phygital-files.mercafacil.com/comercial-big-oferta/uploads/produto/panceta_suina_kg_fe0b1c33-dfd7-44b6-83ed-42c8a30cc0ba.png' },
      ],
    },
    {
      id: '5',
      name: 'Frango',
      products: [
        { id: '18', name: 'Coxa e Sobrecoxa', price: 19.99, description: 'PESO: 1KG', image: 'https://superprix.vteximg.com.br/arquivos/ids/199404-600-600/CoxaSobrecoxa-de-Frango-Resfriada-Bandeja-de-550-gramas--aproximadamente-550g-.jpg?v=637624818141600000' },
        { id: '19', name: 'Peito de Frango', price: 29.99, description: 'PESO: 1KG', image: 'https://www.svicente.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw652f89d5/Produtos/15711-0000000003512-file%20de%20peito%20de%20frango%20bandeja%20kg-acougue-1.jpg' },
        { id: '20', name: 'Meio da Asa', price: 39.99, description: 'PESO: 1KG', image: 'https://d21wiczbqxib04.cloudfront.net/G65O1rEW94LzCU7va_UNEEC_R6Y=/1600x0/smart/https://osuper-ecommerce-casamoacir.s3.sa-east-1.amazonaws.com/702ac1bd-whatsappimage20230711at145535removebgpreview.png' },
        { id: '21', name: 'Coxinha da Asa', price: 15.99, description: 'PESO: 1KG', image: 'https://bage.supernicolini.com.br/wp-content/uploads/2020/04/2478200000003.jpg' },
      ],
    },
  ];

  // Calcula o subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cardápio', // Título da tela
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
          <View style={styles.cartIconContainer}>
            <Text style={{ marginRight: 15 }}>🛒</Text>
            {uniqueItemsCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{uniqueItemsCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, uniqueItemsCount]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar carnes..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => toggleCategory(item.id)} style={styles.categoryButton}>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.dropdownIndicator}>
                {expandedCategories[item.id] ? '−' : '+'}
              </Text>
            </TouchableOpacity>
            {expandedCategories[item.id] && (
              <FlatList
                data={item.products}
                keyExtractor={(product) => product.id}
                renderItem={({ item: product }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Detalhes', {
                        product: { ...product, category: item.name },
                      })
                    }
                    style={styles.productRow}
                  >
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
                      <Text style={styles.productDescription}>{product.description}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}
      />
      {/* Subtotal exibido no final da tela */}
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal: R$ {subtotal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    margin: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  categoryButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownIndicator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#388e3c',
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
  },
  cartIconContainer: {
    position: 'relative',
    marginRight: 10,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtotalContainer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoriesScreen;
