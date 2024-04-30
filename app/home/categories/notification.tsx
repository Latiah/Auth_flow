import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import React from "react";
import { StyleSheet, View } from "react-native";

type NotificationProps = {
  title: string;
  description: string;
  date: string;
  read: boolean;
};

export default function NotificationScreen(props: NotificationProps) {
  const date = new Date(props.date);
  const formattedDate = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <View>
      <View style={styles.layout}>
        <Text
          style={[styles.line, props.read ? styles.read : styles.unread]}
        ></Text>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.description}</Text>
        </View>
        <Text style={styles.time}>{formattedDate}</Text>
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
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  read: {
    backgroundColor: "#FFF3F3",
  },
  unread: {
    backgroundColor: "#F43939",
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
