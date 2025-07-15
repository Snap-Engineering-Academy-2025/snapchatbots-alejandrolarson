import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import Song from "./Song";
import { useNavigation } from "@react-navigation/native";

const renderSong = ({ item, index }) => (
  <Song
    index={index}
    imageUrl={item.imageUrl}
    songTitle={item.songTitle}
    songArtists={item.songArtists}
    albumName={item.albumName}
    duration={item.duration}
  />
);

const SongList = ({ tracks }) => {
  // console.log("artist", tracks[0].songArtists);
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={(item, index) => renderSong(item, index)}
        keyExtractor={(item) => item.songTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 20,
  },
  text: {
    color: Themes.colors.gray,
  },
});

export default SongList;
