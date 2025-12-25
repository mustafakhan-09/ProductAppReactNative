import { View, FlatList, StyleSheet, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../contexts/ApiContext";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import { useRouter } from "expo-router";
import Loader from "../../components/Loader";

export default function HomeScreen() {
  const { products, fetchProducts, refreshing } = useContext(ApiContext);
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchProducts(true);
  }, []);

  if (refreshing && products.length === 0) {
    return <Loader />;
  }

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <SearchBar value={query} onChange={setQuery} />
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: {
                  id: item.id.toString(),
                  title: item.title,
                  image: item.image,
                  price: item.price.toString(),
                  description: item.description,
                },
              })
            }
          />
        )}
        onRefresh={() => fetchProducts(true)}
        refreshing={refreshing}
        onEndReached={() => fetchProducts()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ec6e6eff",
  },

  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#eebcbcff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0754faff",
  },

  searchWrapper: {
    backgroundColor: "#ccf5b5ff",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
