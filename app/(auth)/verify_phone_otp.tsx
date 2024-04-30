import { Icon } from "@/components/Icon";
import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import { TextInput } from "@/components/ThemedInput";
import { DefaultAlert } from "@/components/alerts/DefaultAlert";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import client from "@/utils/AppwriteClient";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Account } from "react-native-appwrite/src";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VerifyPhoneOTP({}) {
  const insets = useSafeAreaInsets();
  const { phone, userId, expire } = useGlobalSearchParams<{
    phone: string;
    userId: string;
    expire: string;
  }>();

  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [otp, setOTP] = useState("");

  useEffect(() => {
    const timeout = setInterval(() => {
      millisecondsToString();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [expire, userId, phone]);

  const millisecondsToString = () => {
    const format = "{m}:{s}";
    const leftMilliseconds = new Date(expire).getTime() - new Date().getTime();
    const seconds = leftMilliseconds / 1000 - ((leftMilliseconds / 1000) % 1);
    const minutes = seconds / 60 - ((seconds / 60) % 1);

    if (leftMilliseconds < 0) {
      setCountdown(
        format
          .replace("{m}", addZeroIfNeeded(0))
          .replace("{s}", addZeroIfNeeded(0))
      );
    } else {
      setCountdown(
        format
          .replace("{m}", addZeroIfNeeded(minutes % 60))
          .replace("{s}", addZeroIfNeeded(seconds % 60))
      );
    }
  };

  useEffect(() => {
    const verifyOTP = async () => {
      if (otp.length === 6) {
        const account = new Account(client);
        setLoading(true);
        try {
          await account.updatePhoneSession(userId, otp);
          router.dismissAll();
          router.replace("/home/");
        } catch (error) {
          console.log(error);
          DefaultAlert({ title: "Error", message: (error as Error).message });
        } finally {
          setLoading(false);
        }
      }
    };
    verifyOTP();
  }, [otp]);

  const addZeroIfNeeded = (num: number) => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return String(num);
    }
  };

  const handleOTPInput = async (value: string | number) => {
    if (value == "backspace") {
      setOTP(otp.slice(0, -1));
    } else {
      if (otp.length < 6) {
        setOTP(otp + value);
      }
    }
  };

  return (
    <View
      style={[styles.container, { marginBottom: 0, paddingTop: insets.top }]}
    >
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.light} />
        </View>
      )}
      <View style={{ paddingHorizontal: Sizes.lg, flex: 4 }}>
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
            We have sent an OTP on given number {phone}
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.otpInputs}>
            <TextInput readOnly style={styles.otpInput} value={otp[0]} />
            <TextInput readOnly style={styles.otpInput} value={otp[1]} />
            <TextInput readOnly style={styles.otpInput} value={otp[2]} />
            <TextInput readOnly style={styles.otpInput} value={otp[3]} />
            <TextInput readOnly style={styles.otpInput} value={otp[4]} />
            <TextInput readOnly style={styles.otpInput} value={otp[5]} />
          </View>
          <View style={styles.countdown}>
            <Icon name="time-circle" style={{ left: 0 }} />
            <Text style={styles.countdownText}>
              &nbsp;
              {countdown}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.keypad}>
        <View style={styles.row}>
          {[1, 2, 3].map((i) => (
            <OTPInput key={i} value={i} onPress={() => handleOTPInput(i)} />
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map((i) => (
            <OTPInput key={i} value={i} onPress={() => handleOTPInput(i)} />
          ))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map((i) => (
            <OTPInput key={i} value={i} onPress={() => handleOTPInput(i)} />
          ))}
        </View>
        <View style={styles.row}>
          {["", 0, "backspace"].map((i, index) => (
            <OTPInput key={index} value={i} onPress={() => handleOTPInput(i)} />
          ))}
        </View>
      </View>
    </View>
  );
}

function OTPInput({
  value,
  onPress,
}: {
  value: number | string;
  onPress?: () => void;
}) {
  if (value === "backspace") {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon name="backspace" style={styles.keypadIcon} />
        <Text style={{ opacity: 0, zIndex: 1 }}>Hello</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.keypadText}>{value}</Text>
    </TouchableOpacity>
  );
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
  loadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0.75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.dark,
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
    marginBottom: Sizes.lg,
    gap: Sizes.lg,
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
    fontSize: Sizes.xl,
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
    minHeight: 25,
    position: "relative",
  },
});
