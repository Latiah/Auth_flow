import { Icon } from "@/components/Icon";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ParkingRoute() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <ImageBackground
        source={require("@/assets/parking/spot.png")}
        style={styles.container}
      >
        <View style={[{ paddingTop: insets.top }, styles.card]}>
          <View style={styles.column}>
            <Text style={styles.title}>Route</Text>
            <Text style={styles.subtitle}>Turn left to parking spot</Text>
          </View>
          <View style={[styles.column, styles.divider]}></View>
          <View style={[styles.column, styles.distance]}>
            <Icon style={styles.icon} name="arrow-up-left" />
            <Text>100 m</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
        <Image
          style={styles.directions}
          source={require("@/assets/parking/directions.png")}
        />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderBottomEndRadius: Sizes.lg,
    borderBottomStartRadius: Sizes.lg,
    paddingBottom: Sizes.lg,
    paddingHorizontal: Sizes.lg,
  },
  title: {
    fontSize: Sizes.lg,
    marginBottom: Sizes.sm,
  },
  icon: {
    marginBottom: Sizes.sm,
  },
  subtitle: {
    fontSize: Sizes.md,
    color: Colors.light.muted,
  },
  divider: {
    backgroundColor: Colors.light.muted,
    width: 1,
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    marginTop: Sizes.md,
  },
  distance: {
    justifyContent: "center",
    alignItems: "center",
  },
  directions: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
});
