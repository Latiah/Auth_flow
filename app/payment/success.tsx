import { Icon } from "@/components/Icon";
import { Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Success() {
  return (
    <View style={styles.container}>
      <View style={styles.images}>
        <Image source={require("../../assets/auth/psucess.png")} />
      </View>
      <Text style={styles.title}>Payment Success</Text>
      <Text style={styles.bodyMessage}>
        Congrats on your reserved parking space
      </Text>
      <Text style={styles.titles}>Receipt</Text>
      <View style={styles.icons}>
        <View style={styles.background}>
          <Icon name="message-pink" />
        </View>
        <View style={styles.background}>
          <Icon name="comment" />
        </View>
      </View>
      <View style={styles.button}>
        <PrimaryButton
          label="Back to Home"
          onPress={() => {
            router.dismissAll();
            router.push("/home/");
            router.push("/parking/route");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.lg,
    alignContent: "center",
    justifyContent: "center",
  },
  bodyMessage: {
    color: "#2D2D2D",
    opacity: 0.5,
    fontSize: Sizes.md2x,
    marginLeft: 30,
    marginBottom: 30,
  },
  title: {
    color: "#2D2D2D",
    fontSize: Sizes.lg,
    textAlign: "center",
    marginTop: Sizes.lg,
    marginBottom: Sizes.sm,
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
  titles: {
    color: "#2D2D2D",
    fontSize: Sizes.md,
    textAlign: "center",
    marginTop: Sizes.lg,
    marginBottom: Sizes.sm,
  },
  background: {
    backgroundColor: "#FFFFFF",
    width: 48,
    height: 48,
    borderRadius: Sizes.vsm,
    margin: 12,
    padding: 12,
    marginBottom: 60,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  images: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
});
