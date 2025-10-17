import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";


const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const route = useRoute();
    const token = route;

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://192.168.1.42:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                email: email,
                password: password,
                }),
            });
            const res = await response.json();
            if (!response.ok) {
                alert(res.message);
                throw new Error("HTTP error! status: ${response.status}");
            }
            console.log(res.token);
            navigation.navigate('Home', {token:res.token})
        } catch (error) {
            console.error(error);
        }finally {
            setIsLoading(false);
        }
    };
        
    return (
        <View style={styles.item}>
        
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.title}>Please Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            
            {isLoading ? (
                    <ActivityIndicator size="large" color="#7a80c0ff" />
                ) : (
                    <Button title="Log In" onPress={handleSubmit} />
                )}
        </View>
        </View>
    )

};


const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: "center",
    },

    container: {
        padding: 10,
        marginHorizontal: 16,
        borderRadius: 12
    },

    title: {
        color: '#7a80c0ff',
        fontSize:20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: "center"
    },

    input: {
        color: '#7a80c0ff',
        fontSize:15,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#7a80c0ff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 15,
    },
    
});

export default LoginScreen;