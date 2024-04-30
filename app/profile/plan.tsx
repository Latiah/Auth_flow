import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Plan() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <LayoutHeader
        title="Upgrade"
        onBackPress={() => {
          router.back();
        }}
      />
      <View style={styles.images}>
        <Image source={require("@/assets/auth/upgrade.png")} />
      </View>
      <View style={styles.card1}>
        <View style={styles.circleActive}>
          <View style={styles.innerCircleActive}></View>
        </View>
        <View style={styles.yearly}>
          <Text style={styles.titles}>Yearly</Text>
          <Text style={styles.bodyMessage}>Pay for a full year</Text>
        </View>
        <Text style={styles.price}>
          $210<Text style={styles.time}>/y</Text>
        </Text>
      </View>
      <View style={styles.card2}>
        <View style={styles.circle}></View>
        <View style={styles.monthly}>
          <Text style={styles.titles}>Monthly</Text>
          <Text style={styles.bodyMessage}>Pay monthly, cancel anytime</Text>
        </View>
        <Text style={styles.salary}>
          $20<Text style={styles.period}>/m</Text>
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <View style={styles.button}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Make Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.light["secondary-background"],
    paddingHorizontal: Sizes.lg,
  },
  bodyMessage: {
    color: "#2D2D2D",
    opacity: 0.5,
    fontSize: Sizes.md,
  },
  yearly: {
    flex: 1,
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
  monthly: {
    flex: 1,
  },
  time: {
    fontSize: Sizes.sm3x,
    color: "#F43939",
  },
  title: {
    color: "#2D2D2D",
    fontSize: Sizes.lg,
    textAlign: "center",
    marginTop: Sizes.lg,
    marginBottom: Sizes.sm,
  },
  titles: {
    color: "#2D2D2D",
    fontSize: Sizes.md2x,
    marginBottom: Sizes.sm,
  },
  price: {
    color: "#F43939",
    fontSize: Sizes.md3x,
    alignSelf: "flex-start",
  },
  salary: {
    color: "#2D2D2D",
    fontSize: Sizes.md3x,
    alignSelf: "flex-start",
  },
  period: {
    color: "#2D2D2D",
    fontSize: Sizes.sm3x,
  },
  background: {
    backgroundColor: "#FFFFFF",
    width: 48,
    height: 48,
    borderRadius: Sizes.vsm,
    margin: 12,
    paddingVertical: 12,
    marginBottom: 60,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  images: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Sizes.lg,
  },
  card1: {
    backgroundColor: Colors.dark.text,
    borderColor: "#F43939",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Sizes.md,
    padding: 15,
    borderRadius: Sizes.md3x,
    borderWidth: 1,
    gap: Sizes.md3x,
    alignItems: "center",
  },
  card2: {
    backgroundColor: Colors.light.background,
    borderColor: "#EAEAF3",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: Sizes.md3x,
    borderWidth: 1,
    gap: Sizes.md3x,
    alignItems: "center",
  },
  circleActive: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: "#F43939",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircleActive: {
    backgroundColor: "#F43939",
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  circle: {
    borderWidth: 1,
    borderColor: "#2D2D2D",
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
