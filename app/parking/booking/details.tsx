import { Icon } from "@/components/Icon";
import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import { DefaultAlert } from "@/components/alerts/DefaultAlert";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import client from "@/utils/AppwriteClient";
import { APPWRITE_BOOKINGS_COLLECTION_ID, APPWRITE_DATABASE_ID } from "@env";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Account,
  Databases,
  ID,
  Permission,
  Role,
} from "react-native-appwrite/src";
import { BookingContext } from "../_layout";

export default function BookingDetails() {
  const booking = useContext(BookingContext);
  const [loading, setLoading] = React.useState(false);

  const saveBookingDetails = async () => {
    setLoading(true);
    const account = new Account(client);
    const user = await account.get();

    const database = new Databases(client);
    database
      .createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_BOOKINGS_COLLECTION_ID,
        ID.unique(),
        {
          date: new Date().toISOString(),
          price: booking.total,
          hours: booking.hours,
          parkingSpot: booking.parkingSpot?.id,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.write(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      )
      .then((response) => {
        router.push("/payment/payment");
      })
      .catch((error) => {
        console.log(error);
        DefaultAlert({
          title: "Payment failed",
          message: "Failed to save booking details",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <LayoutHeader
        title="Book Details"
        onBackPress={() => {
          router.back();
        }}
      />
      <Image style={styles.image} source={require("@/assets/auth/mall.png")} />
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>{booking.parkingSpot?.title}</Text>
          <Text style={styles.bodyMessage}>{booking.parkingSpot?.address}</Text>
        </View>
        <View style={styles.grd}>
          <Text style={styles.dangerText}>${booking.parkingSpot?.price}/h</Text>
        </View>
      </View>
      <View style={styles.icons}>
        <View style={styles.card}>
          <View style={styles.grd}>
            <Icon name="location" />
          </View>
          <Text style={styles.numbers}>A-6</Text>
          <Text style={styles.text}>Parking Place</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.grd}>
            <Icon name="time-circle" />
          </View>
          <Text style={styles.numbers}>{booking.hours} h</Text>
          <Text style={styles.text}>Time</Text>
        </View>
      </View>
      <View style={styles.rectangle}>
        <View style={styles.ground}>
          <Image source={require("@/assets/auth/insurance.png")} />
        </View>
        <Text style={{ flex: 1 }}>Include Insurance</Text>
        <Text>$5/h</Text>
      </View>
      <View style={{ flex: 1 }} />
      <View style={styles.button}>
        <Text style={styles.price}>${booking.total.toPrecision(4)}</Text>
        <PrimaryButton
          label="Pay"
          style={styles.btn}
          loading={loading}
          onPress={saveBookingDetails}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.lg,
    paddingBottom: Sizes.lg,
  },
  text: {
    fontSize: Sizes.sm3x,
    color: Colors.light.muted,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Sizes.md3x,
  },
  price: {
    fontSize: Sizes.xl,
    fontWeight: "bold",
    paddingHorizontal: Sizes.md3x,
  },
  numbers: {
    fontSize: Sizes.md2x,
  },
  rectangle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: Sizes.sm3x,
    paddingHorizontal: Sizes.md3x,
    borderRadius: Sizes.md,
    backgroundColor: Colors.white,
    gap: Sizes.md,
    marginTop: Sizes.lg,
  },
  bodyMessage: {
    color: Colors.light.muted,
  },
  ground: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.lightDanger,
    padding: Sizes.sm,
    borderRadius: Sizes.sm,
  },
  grd: {
    backgroundColor: Colors.light.lightDanger,
    borderRadius: Sizes.sm,
    padding: Sizes.sm,
    marginBottom: Sizes.sm,
  },
  title: {
    fontSize: Sizes.lg,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Sizes.md,
    marginTop: Sizes.md3x,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
    objectFit: "contain",
    marginTop: Sizes.md3x,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Sizes.lg,
    gap: Sizes.lg,
  },
  btnText: {
    color: Colors.dark.text,
    textAlign: "center",
    fontSize: Sizes.md,
  },
  btn: {
    width: "50%",
    marginBottom: 0,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.md3x,
    justifyContent: "center",
    alignItems: "center",
    padding: Sizes.md3x,
    flex: 1,
  },
  dangerText: {
    color: Colors.light.danger,
    paddingHorizontal: Sizes.sm,
    textAlign: "center",
  },
});
