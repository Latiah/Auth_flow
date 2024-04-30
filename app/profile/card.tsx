import { Icon } from "@/components/Icon";
import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface CardProps {
  title: string;
}
export default function Card (props:CardProps) {
return (
<View style={styles.card}>
        <View style={styles.card1}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.icons}>
            <Icon name="tick" />
            <Text style={styles.subtitle}>All Include</Text>
          </View>
          <View style={styles.icons}>
            <Icon name="tick" />
            <Text style={styles.subtitle}>Unlimited Feature</Text>
          </View>
          <View style={styles.icons}>
            <Icon name="tick" />
            <Text style={styles.subtitle}>Discounts every reservation</Text>
          </View>
          <View style={styles.icons}>
            <Icon name="tick" />
            <Text style={styles.subtitle}>All Include</Text>
          </View>
          <View style={styles.icons}>
            <Icon name="tick" />
            <Text style={styles.subtitle}>All Include</Text>
          </View>
          <View style={styles.icons}>
            <Icon name="tick" />
            <Text style={styles.subtitle}>All Include</Text>
          </View>
        </View>
      </View>
)}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Sizes.lg,
      backgroundColor: Colors.light["secondary-background"],
    },
    icons: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: Sizes.sm,
      marginTop: Sizes.md3x,
    },
    title: {
      color: "#2D2D2D",
      fontSize: Sizes.xl,
      textAlign: "center",
      marginTop: Sizes.md4x,
      marginBottom: Sizes.sm,
    },
    subtitle: {
      flex: 1,
    },
    titles: {
      fontSize: Sizes.xl2x,
      textAlign: "center",
      maxWidth: 270,
      marginVertical: Sizes.xl3x,
    },
    card1: {
      backgroundColor: Colors.white,
      padding: Sizes.md3x,
      width: 270,
      borderRadius: Sizes.md3x,
      marginBottom: Sizes.xl2x,
      marginRight:40,
    },
    card: {
      flexDirection: "row",
      justifyContent: "center",
    },
    words: {
      marginRight: 123,
    },
    word: {
      marginRight: 68,
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
  });
  