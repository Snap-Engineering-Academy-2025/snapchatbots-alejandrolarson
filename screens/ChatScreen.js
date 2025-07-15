import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import BasicChatbot from "../components/BasicChatbot";
import BakersChatbot from "../components/BakersChatbot";
import AlejandrosChatbot from "../components/AlejandrosChatbot";
import NicolesChatbot from "../components/NicolesChatbot"
// prettier-ignore
export const CHATBOTS = {
  "BasicChatbot": {
    id: "BasicChatbot",
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  },
  "BakersChatbot": {
    id: "BakersChatbot",
    name: "Baker's Dog Trivia",
    imageUrl: "https://img.freepik.com/free-vector/cute-dog-robot-cartoon-character-animal-technology-isolated_138676-3143.jpg?w=150",
    component: BakersChatbot,
  },
    "AlejandrosChatbot": {
      id : "AlejandrosChatbot",
      name : "Alejandro's Chat Bot",
      imageUrl: "https://www.motortrend.com/uploads/sites/21/2008/07/10211580.jpeg.jpg",
      component: AlejandrosChatbot,
    },
    "NicolesChatbot": {
      id : "NicolesChatbot",
      name : "Nicole's Chat Bot",
      imageUrl: "https://cdn.outsideonline.com/wp-content/uploads/2021/01/21/surfer-san-diego-dawn_s.jpg",
      component: NicolesChatbot,
    }
  };

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
