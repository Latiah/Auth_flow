import { Icon } from "@/components/Icon";
import { Link, Text } from "@/components/Themed";
import { TextInput } from "@/components/ThemedInput";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { Image, StyleSheet, View } from "react-native";

export default function RequestCode() {
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../../assets/auth/request-code.png")}
          style={styles.img}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>Enter your Passcode</Text>
          <Text style={styles.subtitle}>
            For the security of your account, please enter the security code
          </Text>
        </View>
        <View style={[styles.otpInputs]}>
          <TextInput readOnly style={styles.otpInput} value="5" />
          <TextInput readOnly style={styles.otpInput} value="8" />
          <TextInput readOnly style={styles.otpInput} value="7" />
          <TextInput readOnly style={styles.otpInput} />
        </View>
      </View>
      <View>
        <Icon name="fingerprint" size="2xl" style={styles.icon} />
      </View>
      <View>
        <Text style={styles.footer}>
          <Link href="/(auth)/forgot-password/form">Scan</Link> to verify for
          easy security
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 0,
  },
  img: {
    width: 300,
    height: 300,
    objectFit: "cover",
    overflow: "hidden",
  },
  title: {
    fontSize: Sizes.xl,
    fontWeight: "500",
    marginTop: Sizes.md3x,
  },
  subtitle: {
    fontSize: Sizes.md2x,
    textAlign: "center",
    marginTop: Sizes.sm,
    marginBottom: Sizes.xl2x,
    color: Colors.light.muted,
    maxWidth: "80%",
  },
  footer: {
    textAlign: "center",
    maxWidth: "80%",
    color: Colors.light.muted,
  },
  otpInputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Sizes.md3x,
  },
  otpInput: {
    width: 50,
    height: 50,
    textAlign: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.muted,
    borderRadius: 0,
    fontWeight: "bold",
    fontSize: Sizes.xl2x,
    marginHorizontal: Sizes.sm,
  },
  icon: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
  },
});
