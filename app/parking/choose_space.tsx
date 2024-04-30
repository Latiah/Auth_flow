import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

export default function ChooseSpace() {
  const floors = ["1st Floor", "2nd Floor", "3rd Floor", "4th Floor"];
  return (
    <>
      <View style={styles.container}>
        <LayoutHeader title="Choose Space" />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.floors}>
            {floors.map((floor, index) => (
              <View
                key={index}
                style={[styles.floor, index === 0 && styles.selected]}
              >
                <Text style={[index === 0 && styles.selectedText]}>
                  {floor}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <ImageBackground
        style={styles.room}
        source={require("@/assets/parking/room.png")}
      ></ImageBackground>
      <View style={styles.container}>
        <PrimaryButton
          label="Book Space"
          onPress={() => router.push("/parking/booking/")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.lg,
  },
  floors: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginVertical: Sizes.md,
    paddingHorizontal: Sizes.lg,
  },
  floor: {
    backgroundColor: Colors.white,
    marginHorizontal: Sizes.vsm,
    paddingVertical: Sizes.sm2x,
    paddingHorizontal: Sizes.lg,
    borderRadius: Sizes.xl,
  },
  selected: {
    backgroundColor: Colors.light.primary,
    color: Colors.white,
  },
  selectedText: {
    color: Colors.white,
  },
  room: {
    flex: 1,
    marginVertical: Sizes.lg,
  },
});
