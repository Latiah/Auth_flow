import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import ParkingSpot from "@/utils/models/ParkingSpot";
import { Image, Pressable, StyleSheet, View } from "react-native";

type SimpleParkingSpotCardProps = ParkingSpot & {
  onPress?: () => void;
};

export default function SimpleParkingSpotCard(
  props: SimpleParkingSpotCardProps
) {
  return (
    <Pressable onPress={props.onPress}>
      <View key={props.id} style={styles.card}>
        <Image source={require("@/assets/auth/mall1.png")} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.address}</Text>
          <Text style={styles.primaryText}>
            ${props.price}
            <Text style={styles.span}>/hour</Text>
          </Text>
        </View>
        <Text style={styles.timeButton}>{props.time} min</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    borderRadius: Sizes.md,
    padding: Sizes.md,
    marginBottom: Sizes.md,
    gap: Sizes.md,
  },
  timeButton: {
    backgroundColor: Colors.light.lightDanger,
    color: Colors.light.danger,
    fontSize: Sizes.sm3x,
    textAlign: "center",
    padding: Sizes.sm,
  },
  title: {
    fontSize: Sizes.md2x,
    marginBottom: Sizes.sm,
  },
  subtitle: {
    color: Colors.light.muted,
    marginBottom: Sizes.sm,
  },
  primaryText: {
    color: Colors.light.primary,
    fontSize: Sizes.md4x,
  },
  span: {
    fontSize: Sizes.sm3x,
    color: Colors.light.primary,
  },
});
