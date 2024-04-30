import { Icon } from "@/components/Icon";
import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import { TextInput } from "@/components/ThemedInput";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RequestOTP() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginBottom: -insets.bottom }]}>
      <LayoutHeader
        title="OTP Verifivation"
        onBackPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
        }}
      />
      <View style={styles.header}>
        <Text style={styles.title}>
          We have sent an OTP on given number +62 8123456789
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.otpInputs}>
          <TextInput readOnly style={styles.otpInput} value="5" />
          <TextInput readOnly style={styles.otpInput} value="8" />
          <TextInput readOnly style={styles.otpInput} value="7" />
          <TextInput readOnly style={styles.otpInput} />
        </View>
        <View style={styles.countdown}>
          <Icon name="time-circle" style={{ left: 0 }} />
          <Text style={styles.countdownText}>&nbsp; 00:47</Text>
        </View>
      </View>
      <View style={styles.keypad}>
        <View style={styles.row}>
          {[1, 2, 3].map((i) => (
            <OTPInput key={i} value={i} />
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map((i) => (
            <OTPInput key={i} value={i} />
          ))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map((i) => (
            <OTPInput key={i} value={i} />
          ))}
        </View>
        <View style={styles.row}>
          {["", 0, "backspace"].map((i, index) => (
            <OTPInput key={index} value={i} />
          ))}
        </View>
      </View>
    </View>
  );
}

function OTPInput({ value }: { value: number | string }) {
  if (value === "backspace") {
    return <Icon name="backspace" style={styles.keypadIcon} />;
  }
  return <Text style={styles.keypadText}>{value}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: Sizes.lg,
    fontWeight: "500",
    marginBottom: Sizes.sm,
    textAlign: "center",
  },
  body: {
    flex: 2,
  },
  countdown: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  countdownText: {
    fontSize: Sizes.md2x,
    color: Colors.light.danger,
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
  },
  keypad: {
    flex: 3,
    marginHorizontal: -Sizes.md,
    backgroundColor: Colors.light.dark,
    paddingVertical: Sizes.lg,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    padding: Sizes.md,
  },
  keypadText: {
    fontSize: Sizes.xl,
    color: Colors.light.light,
    minWidth: 25,
  },
  keypadIcon: {
    minWidth: 25,
    height: "80%",
    justifyContent: "center",
  },
});
