import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetails() {
  const { title, image, price, description } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Section */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image as string }} style={styles.image} />
      </View>

      {/* Content Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.price}>${price}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c0443bff",
  },

  imageWrapper: {
    backgroundColor: "#ee9292ff",
    padding: 20,
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
  },

  card: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#50e909ff",
  },
});
