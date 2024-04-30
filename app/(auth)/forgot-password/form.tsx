import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import { TextInput } from "@/components/ThemedInput";
import Sizes from "@/constants/Sizes";
import client from "@/utils/AppwriteClient";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Account } from "react-native-appwrite/src";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (loading) return;

    if (!email) {
      return;
    }

    setLoading(true);
    try {
      const account = new Account(client);
      await account.createRecovery(
        email,
        "http://localhost:8081/(auth)/forgot-password/reset"
      );
      router.push("/(auth)/forgot-password/confirm");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LayoutHeader
        title="Forgot Password"
        onBackPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
        }}
      />
      <View style={{ marginTop: Sizes.xl }}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.description}>
          Enter the email associated with your account and we'll send an email
          with instructions to reset your password.
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          inputMode="email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={{ marginTop: Sizes.lg, flex: 1 }} />
        <View>
          <PrimaryButton loading={loading} label="Send" onPress={handleSend} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.md,
  },
  title: {
    fontSize: Sizes.lg,
    fontWeight: "500",
    marginBottom: Sizes.sm,
  },
  description: {
    marginBottom: Sizes.lg,
  },
  input: {
    marginBottom: Sizes.md,
  },
  label: {
    marginBottom: Sizes.sm,
  },
});
