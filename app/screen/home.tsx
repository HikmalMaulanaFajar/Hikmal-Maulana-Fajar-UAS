import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { token } = route.params as { token: string };

  const [username, setUsername] = useState("");

  useEffect(() => {
    // Ambil data user berdasarkan token
    const fetchUser = async () => {
      try {
        const res = await fetch("http://192.168.1.42:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setUsername(data.name || data.email);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    Alert.alert("Logout", "Apakah kamu yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Ya",
        onPress: () => navigation.replace("Login"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Selamat Datang!</Text>
        <Text style={styles.username}>{username || "Username"}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile", { token })}
        >
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.productButton}
          onPress={() => navigation.navigate("Product", { token })}
        >
          <Text style={styles.menuText}>Product</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  header: {
    backgroundColor: "#7a80c0ff",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  welcome: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  username: { color: "#fff", fontSize: 16 },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 10,
  },
  profileButton: {
    backgroundColor: "#9094b8ff",
    paddingVertical: 40,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  productButton: {
    backgroundColor: "#747fe7ff",
    paddingVertical: 40,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  menuText: { color: "#fff", fontSize: 16},
  logoutButton: {
    backgroundColor: "#ec5656ff",
    paddingVertical: 15,
    paddingHorizontal: 130,
    borderRadius: 10,
    marginTop: 10,
  },
  logoutText: { color: "#fff", fontSize: 16},
});

export default HomeScreen;
