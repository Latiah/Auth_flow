import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import ParkingSpot from "@/utils/models/ParkingSpot";
import { router } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookingContext } from "../parking/_layout";

export default function Payment() {
  const insets = useSafeAreaInsets();
  const booking = useContext(BookingContext);

  useEffect(() => {
    if (!booking.parkingSpot) {
      booking.parkingSpot = new ParkingSpot(
        "1",
        "Graha Mall",
        "123 Dhaka Street",
        30,
        5
      );
    }
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LayoutHeader title="Payment" />
      <View style={styles.card}>
        <View style={styles.images}>
          <Image source={require("@/assets/auth/mall3.png")} />
        </View>
        <Text style={styles.title}>{booking.parkingSpot?.title}</Text>
        <Text style={styles.bodyMessage}>{booking.parkingSpot?.address}</Text>
        <View style={styles.icons}>
          <View style={styles.background}>
            <Image source={require("@/assets/auth/location.png")} />
            <Text style={styles.danger}>A-6</Text>
          </View>
          <View style={styles.background}>
            <Image source={require("@/assets/auth/clock.png")} />
            <Text style={styles.danger}>{booking.hours} hours</Text>
          </View>
        </View>
      </View>
      <View style={styles.rectangle}>
        <Text style={styles.txt}>Input voucher code</Text>
        <Text style={styles.use}>Use</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.prices}>
          <Text style={styles.texts}>Sub total</Text>
          <Text>
            $
            {(booking.hours * (booking.parkingSpot?.price || 0)).toPrecision(4)}
          </Text>
        </View>
        <View style={styles.prices}>
          <Text style={styles.texts}>Insurance</Text>
          <Text>$5.00</Text>
        </View>
        <Text style={styles.line}></Text>
        <View style={styles.prices}>
          <Text style={styles.totalCost}>Total</Text>
          <Text style={styles.totalCost}>${booking.total.toPrecision(4)}</Text>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            router.push("/payment/details");
          }}
        >
          <Text style={styles.btnText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.lg,
  },
  bodyMessage: {
    color: Colors.light.muted,
    textAlign: "center",
    marginBottom: 10,
  },
  header: {
    marginBottom: Sizes.md,
  },
  use: {
    color: Colors.light.primary,
  },
  txt: {
    fontSize: Sizes.md2x,
    color: Colors.light.muted,
  },
  title: {
    color: "#2D2D2D",
    fontSize: Sizes.lg,
    textAlign: "center",
    marginTop: Sizes.lg,
  },
  card: {
    backgroundColor: Colors.dark.text,
    marginBottom: Sizes.lg,
    padding: Sizes.md,
    borderRadius: Sizes.sm,
  },
  line: {
    width: "100%",
    height: 0,
    borderWidth: 1,
    borderColor: "#2D2D2D",
    opacity: 0.05,
    marginBottom: Sizes.sm1x,
  },
  prices: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Sizes.sm1x,
  },
  rectangle: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: Sizes.sm,
    padding: Sizes.md,
    marginBottom: Sizes.md,
    backgroundColor: Colors.dark.text,
  },
  texts: {
    color: "#2D2D2D",
    opacity: 0.6,
    fontSize: Sizes.md,
  },
  totalCost: {
    fontWeight: "bold",
    fontSize: Sizes.md2x,
  },
  danger: {
    color: Colors.light.danger,
  },
  background: {
    flexDirection: "row",
    padding: Sizes.sm,
    fontSize: Sizes.sm3x,
    borderRadius: Sizes.sm1x,
    columnGap: Sizes.sm,
    backgroundColor: Colors.light.lightDanger,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: Sizes.md,
    marginVertical: Sizes.md,
  },
  images: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 2,
  },
  btnText: {
    color: Colors.dark.text,
    textAlign: "center",
    marginTop: 15,
    fontSize: Sizes.md3x,
  },
  btn: {
    backgroundColor: "#130F26",
    borderRadius: 15,
    width: 311,
    height: 60,
  },
});
