// import { useState, useEffect } from 'react';
// import { TextInput, Button } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';


// const HomeScreen = () => {
//     const [name, setName] = useState('');
//     const [mobile_phone, setNumber] = useState('');

//     useEffect(() => {
        
//     const fetchData = async () => {
//         try {
//         const response = await fetch('http://192.168.1.42:3000/login'); // Example API endpoint
//         if (!response.ok) {
//             throw new Error('HTTP error! status: ${response.status}');
//         }
//         const json = await response.json();
//         setName(json.name);
//         setNumber(json.mobile_phone);
//         } catch (e) {
                
//         } finally {
//         }
//     };

//         fetchData();
    
        
//     });
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Name : {name}</Text>
//             <Text style={styles.title}>Phone Number : {mobile_phone}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#cbceeeff',
//         padding: 10,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         borderRadius: 12
//     },

//     title: {
//         color: '#7a80c0ff',
//         fontSize:15,
//         fontWeight: 'bold',
//         textAlign: "center",
//     },
// });

// export default HomeScreen;












// import { View, Text, StyleSheet } from "react-native";

// const HomeScreen = () => {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Hello World!</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#cbceeeff',
//         padding: 10,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         borderRadius: 12
//     },

//     title: {
//         color: '#7a80c0ff',
//         fontSize:15,
//         fontWeight: 'bold',
//         textAlign: "center",
//     },
// });

// export default HomeScreen;