import { Icon } from "@/components/Icon";
import { Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import { useContext } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookingContext } from "./_layout";

export default function ParkTracking() {
  const insets = useSafeAreaInsets();
  const booking = useContext(BookingContext);
  return (
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
      <Pressable
        style={styles.backIcon}
        onTouchEnd={() => {
          router.back();
        }}
      >
        <Icon name="arrow-left" style={{ justifyContent: "center" }} />
      </Pressable>
      <View style={{ flex: 1 }}></View>
      <Image
        style={styles.image}
        source={require("@/assets/parking/direction.png")}
      />
      <View style={styles.mapCard}>
        <View style={{ paddingHorizontal: Sizes.xl, paddingTop: Sizes.xl }}>
          <View style={styles.card}>
            <View>
              <Text style={styles.muted}>Your Destination Address</Text>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: Sizes.sm,
                }}
              >
                <Icon name="location" />
                <Text>{booking.parkingSpot?.address}</Text>
              </View>
            </View>
            <View style={[styles.card, styles.dangerCard]}>
              <Icon name="time-circle" style={{ left: 0 }} />
              <Text style={[styles.danger, { marginLeft: Sizes.sm }]}>
                {booking.parkingSpot?.time} minutes
              </Text>
            </View>
          </View>
          <View style={[styles.card, styles.divider]}></View>
          <View>
            <Text style={styles.muted}>Your Address</Text>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: Sizes.sm,
              }}
            >
              <Icon name="location" />
              <Text>123 Dhaka Street</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Text>
            <Icon size="md" name="info-circle" />
          </Text>
          <PrimaryButton
            label="Start Now"
            style={{ width: "70%", marginBottom: 0 }}
            onPress={() => {
              router.push("/parking/choose_space");
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.lg,
  },
  muted: {
    color: Colors.light.muted,
  },
  danger: {
    color: Colors.light.danger,
  },
  mapCard: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.xl2x,
  },
  dangerCard: {
    backgroundColor: Colors.light.lightDanger,
    padding: Sizes.sm,
    borderRadius: Sizes.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
  divider: {
    height: 50,
    width: 1,
    borderWidth: 1,
    borderColor: Colors.light.muted,
    borderStyle: "dashed",
    margin: Sizes.sm,
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
