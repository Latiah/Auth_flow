import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import Compass from "@/components/cards/Compass";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Parking() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LayoutHeader
          title="Details"
          onBackPress={() => {
            router.back();
          }}
        />
      </View>
      <View style={styles.images}>
        <Image source={require("../../../assets/auth/mall.png")} />
      </View>
      <View style={styles.images}>
        <Compass />
      </View>
      <Text style={styles.title}>Graha Mall</Text>
      <Text style={styles.bodyMessage}>123 Dhaka Street</Text>
      <View style={styles.icons}>
        <Text style={styles.background}>
          {" "}
          <Image source={require("../../../assets/auth/location.png")} /> 500 m
          away
        </Text>
        <Text style={styles.background}>
          {" "}
          <Image source={require("../../../assets/auth/clock.png")} /> 7 mins
        </Text>
      </View>
      <Text style={styles.texts}>Information</Text>
      <Text style={styles.paragraph}>
        24/7 parking facility with cctv camera, professional security guard,
        chair disble, floor parking list facilities. You{" "}
      </Text>
      <View style={styles.button}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Book Now</Text>
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

  bodyMessage: {
    color: "#2D2D2D",
    opacity: 0.5,
    fontSize: Sizes.md2x,
    textAlign: "center",
    marginBottom: 30,
  },
  header: {
    paddingLeft: 30,
    marginBottom: 10,
  },
  title: {
    color: "#2D2D2D",
    fontSize: Sizes.lg,
    textAlign: "center",
    marginTop: Sizes.lg,
    marginBottom: Sizes.sm,
  },
  texts: {
    marginLeft: 30,
    color: "#2D2D2D",
    fontSize: Sizes.md3x,
  },
  paragraph: {
    marginLeft: 30,
    color: "#2D2D2D",
    opacity: 0.2,
    fontSize: Sizes.md2x,
  },
  background: {
    backgroundColor: "#FFF3F3",
    width: 109,
    color: "#F43939",
    height: 32,
    textAlign: "center",
    marginLeft: 20,
    fontSize: Sizes.sm3x,
    borderRadius: Sizes.vsm,
    marginBottom: 60,
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
});
