import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Read() {
  return (
    <View>
      <View style={styles.layout}>
        <Text style={styles.line}></Text>
        <View>
          <Text style={styles.title}>Order Successful</Text>
          <Text style={styles.subtitle}>
            Congrats on your reserved parking space...
          </Text>
        </View>
        <Text style={styles.time}>12:34</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.dark.text,
    padding: Sizes.md,
    borderRadius: Sizes.sm1x,
    marginBottom: Sizes.md,
  },
  line: {
    width: 3,
    height: 47,
    backgroundColor: "#FFF3F3",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    color: "#2D2D2D",
    fontSize: Sizes.md2x,
    marginBottom: Sizes.vsm,
  },
  time: {
    color: "#2D2D2D",
    opacity: 0.3,
    fontSize: Sizes.sm1x,
  },
  subtitle: {
    color: "#2D2D2D",
    opacity: 0.5,
    fontSize: Sizes.sm3x,
  },
});
