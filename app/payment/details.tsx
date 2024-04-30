import { Icon } from "@/components/Icon";
import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { BookingContext } from "../parking/_layout";

export default function Details() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const booking = useContext(BookingContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LayoutHeader title="Payment Details" />
      </View>
      <View style={styles.rectangle}>
        <Text>Mobile Banking</Text>
        <Icon name="dark-arrow-right" />
      </View>
      <View style={styles.card}>
        <View style={styles.message}>
          <Text>Credit Card</Text>
          <Image
            source={require("@/assets/auth/Arrowup.png")}
            style={styles.img}
          />
        </View>
        <View style={styles.cardNames}>
          <Image
            source={require("@/assets/auth/mastercard.png")}
            style={styles.mastercard}
          />
          <Text style={styles.accountNumber}>ABC Bank **** 6189</Text>
          <View style={styles.circleActive}></View>
        </View>
        <View style={styles.cardNames}>
          <Image
            source={require("@/assets/auth/visa.png")}
            style={styles.visaIcon}
          />
          <Text style={styles.accountNumber}>ABC Bank **** 6189</Text>
        </View>
        <View style={styles.add}>
          <Image source={require("@/assets/auth/add.png")} />
          <Text style={styles.text}>Add new card</Text>
        </View>
      </View>
      <View style={styles.rectangle}>
        <Text>Google Play</Text>
        <Icon name="dark-arrow-right" />
      </View>
      <View style={styles.rectangle}>
        <Text>Debit Card</Text>
        <Icon name="dark-arrow-right" />
      </View>
      <View style={styles.messages}>
        <Text>Send receipt to your email</Text>
        <Switch
          trackColor={{ true: Colors.light.primary }}
          value={isEnabled}
          onValueChange={setIsEnabled}
        />
      </View>
      <View style={styles.button}>
        <PrimaryButton
          label="Pay Now"
          onPress={() => {
            router.push("/payment/success");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.lg,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#F4F4FA",
  },
  cardNames: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F4F4FA",
    padding: Sizes.md,
    borderRadius: Sizes.sm1x,
    columnGap: Sizes.md,
  },
  header: {
    marginBottom: 30,
  },
  sendEmail: {
    color: "#2D2D2D",
    fontSize: 14,
  },
  img: {
    width: 16,
    height: 16,
  },
  message: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  messages: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Sizes.lg,
  },
  accountNumber: {
    flex: 1,
    marginTop: 5,
  },
  title: {
    color: "#2D2D2D",
    fontSize: Sizes.lg,
    textAlign: "center",
  },
  mastercard: {
    width: 25,
    height: 15,
    marginTop: 5,
  },
  visaIcon: {
    width: 28,
    height: 9,
    marginTop: 7,
  },
  circles: {
    backgroundColor: "#F43939",
    color: Colors.dark.text,
    borderRadius: 50,
    width: 20,
    height: 20,
    padding: 1,
  },
  circleActive: {
    backgroundColor: "#F43939",
    width: 13.5,
    height: 13.5,
    borderRadius: 50,
    marginTop: 5,
    marginLeft: 40,
  },
  add: {
    flexDirection: "row",
  },
  icon: {
    width: 35,
    height: 21,
  },
  card: {
    backgroundColor: Colors.dark.text,
    paddingVertical: Sizes.lg,
    paddingHorizontal: Sizes.md,
    marginBottom: 20,
    borderRadius: Sizes.sm1x,
  },
  text: {
    color: "#2D2D2D",
    opacity: 0.5,
    marginLeft: 10,
  },
  rectangle: {
    backgroundColor: Colors.dark.text,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Sizes.md,
    borderRadius: 10,
    marginBottom: 20,
  },
  texts: {
    color: "#2D2D2D",
    opacity: 0.6,
    fontSize: Sizes.md,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
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
});
