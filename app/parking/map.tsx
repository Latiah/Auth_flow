import { Icon } from "@/components/Icon";
import { Text } from "@/components/Themed";
import { SearchInput } from "@/components/ThemedInput";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ParkingMap() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <ImageBackground
        source={require("@/assets/parking/maps.png")}
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={{ flex: 1, marginTop: Sizes.md3x }}>
          <Image
            source={require("@/assets/parking/map-popup.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.controls}>
          <Pressable
            style={styles.backIcon}
            onTouchEnd={() => {
              router.back();
            }}
          >
            <Icon name="dark-arrow-left" style={{ justifyContent: "center" }} />
          </Pressable>
          <View style={styles.backIcon}>
            <Icon name="current-location" />
          </View>
        </View>
        <View style={styles.mapCard}>
          <View
            style={{
              paddingHorizontal: Sizes.xl,
              paddingTop: Sizes.xl,
              overflow: "hidden",
            }}
          >
            <View style={styles.card}>
              <View>
                <Text style={styles.title}>Parking Spots</Text>
                <Text style={styles.muted}>123 Dhaka Street</Text>
              </View>
              <View style={[styles.card, styles.dangerCard]}>
                <Text style={[styles.danger, { marginLeft: Sizes.sm }]}>
                  $6
                </Text>
              </View>
            </View>
            <View style={styles.spots}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Image
                  key={i}
                  style={styles.spot}
                  source={require("@/assets/parking/spots.png")}
                />
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>
      <SearchInput
        dark
        placeholder="Parking address..."
        style={styles.search}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.lg,
    borderBottomLeftRadius: Sizes.xl2x,
    borderBottomRightRadius: Sizes.xl2x,
    overflow: "hidden",
  },
  image: {
    width: "auto",
    height: 300,
    resizeMode: "contain",
    marginBottom: Sizes.lg,
  },
  title: {
    fontSize: Sizes.xl,
    marginBottom: Sizes.sm,
  },
  muted: {
    color: Colors.light.muted,
  },
  danger: {
    color: Colors.light.danger,
    marginRight: 5,
  },
  mapCard: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.xl2x,
    overflow: "hidden",
  },
  dangerCard: {
    backgroundColor: Colors.light.lightDanger,
    padding: Sizes.sm,
    borderRadius: Sizes.md,
    justifyContent: "center",
  },
  search: {
    marginBottom: 0,
    paddingHorizontal: Sizes.lg,
    paddingTop: Sizes.lg,
    paddingBottom: Sizes.xl3x,
    backgroundColor: "transparent",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Sizes.lg,
    marginTop: Sizes.lg,
  },
  spots: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Sizes.md,
    marginBottom: Sizes.lg,
    gap: Sizes.sm,
    width: "100%",
  },
  spot: {
    width: 150,
    height: 100,
    borderRadius: Sizes.md,
    backgroundColor: Colors.light.light,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: Sizes.lg,
    backgroundColor: Colors.light["secondary-background"],
    paddingHorizontal: Sizes.xl,
    paddingVertical: Sizes.md,
    borderRadius: Sizes.lg,
  },
  backIcon: {
    left: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.sm2x,
    backgroundColor: Colors.light.light,
    marginTop: Sizes.md,
  },
});
