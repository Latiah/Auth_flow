import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "./Icon";
import { Text } from "./Themed";

type LayoutHeaderProps = {
  title: string;
  backHidden?: boolean;
  onBackPress?: () => void;
};

export default function LayoutHeader(props: LayoutHeaderProps) {
  return (
    <View style={styles.header}>
      {props.backHidden ? null : (
        <Pressable
          style={styles.icon}
          onTouchEnd={
            props.onBackPress
              ? props.onBackPress
              : () => {
                  router.back();
                }
          }
        >
          <Icon name="arrow-left" style={{ justifyContent: "center" }} />
        </Pressable>
      )}
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: Sizes.md,
  },
  icon: {
    position: "absolute",
    left: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.sm2x,
    backgroundColor: Colors.light.light,
  },
  text: {
    fontWeight: "600",
    fontSize: Sizes.lg,
  },
});
