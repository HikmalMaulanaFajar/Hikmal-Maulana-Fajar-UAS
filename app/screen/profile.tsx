import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

const ProfileScreen = () => {
  const route = useRoute();
  const { token } = route.params as { token: string };

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch("http://192.168.1.42:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    getProfile();
  }, [token]);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile</Text>
      </View>

      {/* CARD PROFIL */}
      <View style={styles.card}>
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: user.photo }}
            style={styles.photo}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.value}>{user.name}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.mobile_phone}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoRow}>
            <Text style={styles.value}>{user.gender}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoRow}>
            <Text style={styles.value}>{[user.birthdate,"/", user.birthplace]}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{user.address}</Text>
          </View>
        </View>
      </View>
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
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "#fff", fontSize: 16 },

  card: {
    backgroundColor: "#fff",
    width: "85%",
    marginTop: 30,
    borderRadius: 12,
    paddingVertical: 30,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  infoContainer: { width: "90%", marginTop: 20 },
  infoRow: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 8,
  },
  label: { fontWeight: "bold", color: "#333" },
  value: { color: "#555", marginTop: 2 },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
