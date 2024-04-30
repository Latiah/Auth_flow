import CircularWheel from "@/components/CircularWheel";
import { Icon } from "@/components/Icon";
import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BookingContext } from "../_layout";

export default function Booking() {
  const hours = [
    { title: "1", label: "Hour" },
    { title: "2", label: "Hours" },
    { title: "3", label: "Hours" },
    { title: "4", label: "Hours" },
    { title: "5", label: "Hours" },
    { title: "6", label: "Hours" },
    { title: "7", label: "Hours" },
    { title: "8", label: "Hours" },
    { title: "9", label: "Hours" },
    { title: "10", label: "Hours" },
  ];

  const booking = useContext(BookingContext);
  const [selectedHour, setSelectedHour] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    booking.hours = parseInt(hours[selectedHour].title);
    booking.total = (booking.parkingSpot?.price || 0) * booking.hours + 5;
    setTotal(booking.total);
  }, [selectedHour]);

  return (
    <>
      <View style={styles.container}>
        <LayoutHeader title="Booking" />
      </View>
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap" }}>
        <View style={styles.column}>
          <Text style={styles.title}>Add Insurance?</Text>
          <View style={styles.iconsContainer}>
            <View style={styles.icons}>
              <Icon size="lg" name="fuel" />
            </View>
            <View style={styles.icons}>
              <Icon size="lg" name="car" />
            </View>
            <View style={styles.icons}>
              <Icon size="lg" name="screw-driver" />
            </View>
          </View>
        </View>
        <View style={styles.column}>
          <CircularWheel data={hours} onChange={setSelectedHour} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.price}>${total.toPrecision(4)}</Text>
        <PrimaryButton
          label="Pay"
          style={{ width: "60%", marginBottom: 0 }}
          onPress={() => {
            router.push("/parking/booking/details");
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.lg,
  },
  column: {
    flex: 1,
    padding: Sizes.lg,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: Sizes.xl2x,
    marginBottom: Sizes.md,
  },
  iconsContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    padding: Sizes.md,
    borderRadius: Sizes.lg,
    backgroundColor: Colors.white,
  },
  icons: {
    padding: Sizes.md,
    backgroundColor: Colors.light.background,
    marginVertical: Sizes.sm,
    borderRadius: Sizes.sm,
  },
  hourText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: Sizes.lg,
    paddingHorizontal: Sizes.xl,
    paddingVertical: Sizes.md,
  },
  price: {
    fontSize: Sizes.xl,
    fontWeight: "bold",
  },
});
