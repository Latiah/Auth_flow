import { Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import { PasswordInput } from "@/components/ThemedInput";
import { DefaultAlert } from "@/components/alerts/DefaultAlert";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import client from "@/utils/AppwriteClient";
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Account } from "react-native-appwrite/src";

export default function ResetPasword() {
  const { userId, secret } = useGlobalSearchParams<{
    userId: string;
    secret: string;
  }>();

  const [password, setPassword] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (loading) return;

    if (!password || !passwordAuth) {
      DefaultAlert({ title: "Error", message: "Please fill in all fields" });
      return;
    }

    if (password !== passwordAuth) {
      DefaultAlert({ title: "Error", message: "Passwords do not match" });
      return;
    }
    setLoading(true);
    try {
      const account = new Account(client);
      await account.updateRecovery(userId, secret, password, passwordAuth);
      DefaultAlert({
        title: "Success",
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error(error);
      DefaultAlert({ title: "Error", message: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>
            Enter the new password you would like to use for your account.
          </Text>
          <View style={styles.form}>
            <PasswordInput
              placeholder="New Password"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              placeholder="Confirm Password"
              value={passwordAuth}
              onChangeText={setPasswordAuth}
            />
            <PrimaryButton
              loading={loading}
              label="Reset Password"
              style={{
                marginBottom: Sizes.md,
                paddingHorizontal: Sizes.xl4x,
                alignItems: "center",
              }}
              onPress={handlePasswordReset}
            />
          </View>
        </View>
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
  },
  title: {
    fontSize: Sizes.xl,
    fontWeight: "500",
    marginTop: Sizes.md3x,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: Sizes.md2x,
    textAlign: "center",
    marginTop: Sizes.sm,
    marginBottom: Sizes.xl2x,
    color: Colors.light.muted,
    maxWidth: "80%",
  },
  form: {
    width: "100%",
    maxWidth: 340,
  },
});
