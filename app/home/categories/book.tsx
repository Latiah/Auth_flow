import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Book() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LayoutHeader
          title="Book Details"
          onBackPress={() => {
            router.back();
          }}
        />
      </View>
      <View style={styles.images}>
        <Image source={require("@/assets/auth/mall.png")} />
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>Graha Mall</Text>
          <Text style={styles.bodyMessage}>123 Dhaka Street</Text>
        </View>
        <Text style={styles.background}> $10/h</Text>
      </View>
      <View style={styles.icons}>
        <View style={styles.card1}>
          <Text style={styles.grd}>
            <Image source={require("@/assets/auth/location.png")} />
          </Text>
          <Text style={styles.numbers}>A-6</Text>
          <Text style={styles.text}>Parking Place</Text>
        </View>
        <View style={styles.card2}>
          <Text style={styles.grd}>
            <Image source={require("@/assets/auth/clock.png")} />
          </Text>
          <Text style={styles.numbers}>4 h</Text>
          <Text style={styles.text}>Time</Text>
        </View>
      </View>
      <View style={styles.rectangle}>
        <Text style={styles.ground}>
          <Image source={require("@/assets/auth/insurance.png")} />
        </Text>
        <Text style={styles.txt}>Include Insurance</Text>
        <Text style={styles.hour}>$5/h</Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.price}>$35,00</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            router.push("/payment/payment");
          }}
        >
          <Text style={styles.btnText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#F4F4FA",
  },
  text: {
    fontSize: Sizes.sm3x,
    color: "#2D2D2D",
    opacity: 0.4,
  },
  txt: {
    fontSize: Sizes.md2x,
    marginRight: 30,
    marginTop: 5,
  },
  hour: {
    fontSize: Sizes.md,
    marginTop: 5,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  price: {
    fontSize: Sizes.lg,
    marginTop: 10,
    color: "#2D2D2D",
  },
  numbers: {
    fontSize: Sizes.md2x,
    color: "#2D2D2D",
  },
  header: {
    paddingLeft: 30,
    marginTop: 25,
    marginBottom: 10,
  },
  rectangle: {
    backgroundColor: Colors.dark.text,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 311,
    height: 61,
    padding: 10,
    margin: 35,
    borderRadius: 15,
  },
  bodyMessage: {
    color: "#2D2D2D",
    opacity: 0.4,
    fontSize: Sizes.sm3x,
    marginBottom: 30,
  },
  Btitle: {
    color: "#2D2D2D",
    fontSize: Sizes.md3x,
    textAlign: "center",
    marginBottom: Sizes.sm,
  },
  ground: {
    backgroundColor: "#FFF3F3",
    width: 41,
    height: 41,
    paddingLeft: 10,
    paddingTop: 5,
    borderRadius: 8,
  },
  grd: {
    backgroundColor: "#FFF3F3",
    paddingLeft: 11,
    paddingTop: 4,
    width: 38,
    height: 26,
    borderRadius: 8,
  },
  title: {
    color: "#2D2D2D",
    fontSize: Sizes.lg,
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
    backgroundColor: "#FFF3F3",
    width: 72,
    color: "#F43939",
    height: 38,
    textAlign: "center",
    marginLeft: 20,
    fontSize: Sizes.sm3x,
    borderRadius: Sizes.vsm,
    marginBottom: 60,
    marginTop: 30,
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
    justifyContent: "space-around",
    marginTop: 20,
  },
  btnText: {
    color: Colors.dark.text,
    textAlign: "center",
    marginTop: 15,
    fontSize: Sizes.md,
  },
  btn: {
    backgroundColor: "#130F26",
    borderRadius: 15,
    width: 197,
    height: 54,
  },
  card1: {
    width: 145,
    height: 126,
    backgroundColor: Colors.dark.text,
    marginRight: 20,
    borderRadius: Sizes.md3x,
    justifyContent: "center",
    alignItems: "center",
  },
  card2: {
    width: 145,
    height: 126,
    backgroundColor: Colors.dark.text,
    borderRadius: Sizes.md3x,
    justifyContent: "center",
    alignItems: "center",
  },
});
