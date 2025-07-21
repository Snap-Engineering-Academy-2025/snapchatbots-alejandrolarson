import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import { useNavigation } from "@react-navigation/native";

const BotDeveloper = ({ botDevelopers }) => {
  return (
    <Text style={styles.botDevelopers} numberOfLines={1}>
      {botDevelopers.map(({ name }) => `${name}`).join(", ")}
    </Text>
  );
};

const ChatBot = ({
  index,
  imageUrl,
  botTitle,
  botDevelopers,
  botName
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChatScreen", {
          // this is a "quick and dirty" hack for the moment, we'll want to rename our properties later
          chatbotName: botName,
        })
      }
    >
      <View style={styles.chatbot}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image
          style={[styles.image, styles.chatbotImage]}
          source={{ uri: imageUrl }}
        />
        <View style={styles.chatbotContainer}>
          <Text style={[styles.botTitle]} numberOfLines={1}>
            {botTitle}
          </Text>
          <BotDeveloper botDevelopers={botDevelopers} />
        </View>
        <Text style={[styles.botName]} numberOfLines={1}>
          {botName}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatbot: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  index: {
    color: Themes.colors.gray,
    flex: 0.05,
    textAlign: "center",
    fontSize: 12,
    margin: 1,
  },
  chatbotImage: {
    resizeMode: "contain",
    flex: 0.2,
    width: 50,
    height: 50,
  },
  chatbotContainer: {
    flex: 0.4,
    margin: 5,
  },
  botTitle: {
    color: Themes.colors.white,
    fontSize: 12,
  },
  botDevelopers: {
    color: Themes.colors.gray,
    fontSize: 12,
  },
  botName: {
    color: Themes.colors.white,
    flex: 0.25,
    fontSize: 12,
    margin: 5,
  },
});

export default ChatBot;
