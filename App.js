import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Themes } from "./assets/Themes";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SongList from "./components/SongList";
import HomeScreen from "./screens/HomeScreen";
import SongScreen from "./screens/SongScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <HomeScreen />
  );
}
