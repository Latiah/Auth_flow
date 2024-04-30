import { Icon } from "@/components/Icon";
import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import client from "@/utils/AppwriteClient";
import ParkingSpot from "@/utils/models/ParkingSpot";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_PARKING_SPOTS_COLLECTION_ID,
} from "@env";
import { router, useGlobalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Databases } from "react-native-appwrite/src";
import { BookingContext } from "./_layout";

export default function ParkingDetails() {
  const { parkingSpotId } = useGlobalSearchParams<{
    parkingSpotId: string;
  }>();
  const booking = useContext(BookingContext);
  const [parkingSpot, setParkingSpot] = useState<ParkingSpot | null>(null);

  useEffect(() => {
    fetchParkingSpot();
  }, [parkingSpotId]);

  const fetchParkingSpot = () => {
    if (!parkingSpotId) {
      booking.parkingSpot = new ParkingSpot(
        "1",
        "Graha Mall",
        "123 Dhaka Street",
        7,
        5
      );
      return;
    }
    if (booking.parkingSpot?.id === parkingSpotId) {
      setParkingSpot(booking.parkingSpot);
      return;
    }

    const database = new Databases(client);
    database
      .getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_PARKING_SPOTS_COLLECTION_ID,
        parkingSpotId
      )
      .then((response) => {
        booking.parkingSpot = new ParkingSpot(
          response["$id"],
          response["title"],
          response["address"],
          response["time"],
          response["price"]
        );
        setParkingSpot(booking.parkingSpot);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <LayoutHeader title="Details" />
      </View>
      <View style={styles.images}>
        <Image source={require("@/assets/auth/mall.png")} />
        <View style={styles.locIcon}>
          <Icon name="light-current-location" />
        </View>
      </View>
      {parkingSpot === null ? (
        <>
          <View style={[styles.title, styles.loading, { width: 200 }]} />
          <View style={[styles.bodyMessage, styles.loading, { width: 150 }]} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{parkingSpot?.title}</Text>
          <Text style={styles.bodyMessage}>{parkingSpot?.address}</Text>
        </>
      )}

      <View style={styles.icons}>
        <View style={styles.background}>
          <Icon name="location" />
          <Text style={styles.danger}>500 m away</Text>
        </View>
        <View style={styles.background}>
          <Icon name="time-circle" />
          <Text style={styles.danger}>{parkingSpot?.time} mins</Text>
        </View>
      </View>
      <Text style={styles.texts}>Information</Text>
      <Text style={styles.paragraph}>
        24/7 parking facility with cctv camera, professional security guard,
        chair disble, floor parking list facilities. You
      </Text>
      <View style={styles.button}>
        <PrimaryButton
          label="Book Now"
          style={styles.btn}
          onPress={() => {
            router.push("/parking/tracking");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.md,
    marginTop: Sizes.md,
    backgroundColor: Colors.light["secondary-background"],
  },
  bodyMessage: {
    color: "#2D2D2D",
    opacity: 0.5,
    fontSize: Sizes.sm3x,
    textAlign: "center",
  },
  header: {},
  danger: {
    color: Colors.light.danger,
    margin: 0,
    alignSelf: "center",
  },
  title: {
    color: "#2D2D2D",
    fontSize: Sizes.lg,
    textAlign: "center",
    marginTop: Sizes.lg,
    marginBottom: Sizes.sm,
  },
  texts: {
    marginLeft: 20,
    color: "#2D2D2D",
    fontSize: Sizes.md3x,
  },
  paragraph: {
    marginLeft: 20,
    color: "#2D2D2D",
    opacity: 0.2,
    fontSize: Sizes.md2x,
  },
  background: {
    backgroundColor: Colors.light.lightDanger,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Sizes.sm,
    paddingVertical: Sizes.sm,
    paddingHorizontal: Sizes.md,
    borderRadius: Sizes.sm,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Sizes.lg,
    marginVertical: Sizes.xl4x,
  },
  images: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },
  locIcon: {
    position: "relative",
    top: -10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.danger,
    alignItems: "center",
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
    fontSize: Sizes.md,
  },
  btn: {
    width: "70%",
  },
  loading: {
    padding: Sizes.sm2x,
    backgroundColor: Colors.light.background,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
