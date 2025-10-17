import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const ProductScreen = () => {
  const route = useRoute();
  const { token } = route.params as { token: string };

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://192.168.1.42:3000/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [token]);

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading produk...</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Tidak ada produk untuk user ini.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daftar Produk Anda</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => toggleExpand(item.id)}
              style={styles.productHeader}
            >
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.icon}>
                {expandedId === item.id ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>

            {expandedId === item.id && (
              <View style={styles.detailContainer}>
                <Text style={styles.detailText}>
                  {item.description}
                </Text>
                <Text style={styles.detailText}>Harga: Rp {item.price}</Text>
                <Text style={styles.detailText}>Stok: {item.stock}</Text>
                <Text style={styles.detailText}>
                  Tanggal Produksi: {item.production_date}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#7a80c0ff",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    fontSize: 18,
    color: "#ffffffff",
    fontWeight: "bold",
  },

  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  card: {
    backgroundColor: "#747fe7ff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffffff",
  },
  detailContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ffffffff",
    paddingTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#ffffffff",
    marginVertical: 2,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: { fontSize: 16, color: "#777" },
});
