import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  LoginScreen  from "./app/screen/login";
import HomeScreen from "./app/screen/home";
import ProfileScreen from "./app/screen/profile";
import ProductScreen from "./app/screen/product";


const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {headerShown: false},
    },
    Home: {
      screen: HomeScreen,
      options: {headerTitle: 'Home'}
    },
    Profile: { 
      screen: ProfileScreen, 
      options: { title: "Profile" } 
    },
    Product: { 
      screen: ProductScreen, 
      options: { title: "Product" } 
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}

