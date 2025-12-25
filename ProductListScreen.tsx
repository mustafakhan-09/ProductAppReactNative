// ProductListScreen.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
} from "react-native";
import { ApiContext } from "../contexts/ApiContext";
import { AuthContext } from "../contexts/AuthContext";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useRouter } from "expo-router";

export default function ProductListScreen() {
  const { products, fetchProducts, refreshing } = useContext(ApiContext);
  const { token, loading } = useContext(AuthContext);
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [token, loading]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts(true);
  }, []);

  if (loading || (refreshing && products.length === 0)) return <Loader />;

  const filteredProducts = products.filter((item: any) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Products</Text>

      <TextInput
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { ...item },
              })
            }
          />
        )}
        onRefresh={() => fetchProducts(true)}
        refreshing={refreshing}
        onEndReached={() => fetchProducts()}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2762daff",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38e40dff",
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#df1f1fff",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
