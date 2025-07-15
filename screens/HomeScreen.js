import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { Themes } from "../assets/Themes";
import SongList from "../components/SongList";
import ChatList from "../components/ChatList";
import { CHATBOTS } from "./ChatScreen";

const tempTracks = [
  {
    albumName: "Special",
    duration: 135920,
    externalUrl: "https://open.spotify.com/track/6HMtHNpW6YPi1hrw9tgF8P",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02fe3b1b9cb7183a94e1aafd43",
    previewUrl: undefined,
    songArtists: [{ name: "Lizzo" }],
    songTitle: "About Damn Time",
  },
  {
    albumName: "Cuz I Love You",
    duration: 229146,
    externalUrl: "https://open.spotify.com/track/6KgBpzTuTRPebChN0VTyzV",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02bf7d271b8f3051af3cf0bf55",
    previewUrl: undefined,
    songArtists: [{ name: "Lizzo" }],
    songTitle: "Good as Hell",
  },
];

export default function HomeScreen({ navigation }) {
  // let contentDisplayed = (
  //   <SongList tracks={tempTracks} navigation={navigation} />
  // );

  // use the custom ChatList component instead of songList
  const contentDisplayed = <ChatList chats={Object.values(CHATBOTS)} />;

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
