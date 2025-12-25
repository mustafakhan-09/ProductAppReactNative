// ProductDetailScreen.tsx
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function ProductDetailScreen({ route }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 12,
    padding: 60,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 22,
  },
});
