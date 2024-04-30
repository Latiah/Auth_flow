import { Link, Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import { PasswordInput, PhoneInput, TextInput } from "@/components/ThemedInput";
import { DefaultAlert } from "@/components/alerts/DefaultAlert";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import client from "@/utils/AppwriteClient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Account, ID } from "react-native-appwrite/src";
import {
    GestureHandlerRootView,
    ScrollView,
} from "react-native-gesture-handler";

export default function Register() {
  const bgImage = require("../../assets/auth/pattern.png");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function register(
    name: string,
    email: string,
    password: string,
    passwordAuth: string,
    phone: string
  ) {
    if (!name || !email || !password || !passwordAuth || !phone) {
      DefaultAlert({
        title: "Validation failed",
        message: "Please fill all the fields",
      });
      return;
    }

    if (password !== passwordAuth) {
      DefaultAlert({
        title: "Validation failed",
        message: "Passwords do not match",
      });
      return;
    }

    setLoading(true);
    const account = new Account(client);
    const parsedPhone = parseInt(phone);
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailSession(email, password);
      await account.updatePhone("+250" + parsedPhone, password);
      router.replace("/(auth)/login");
    } catch (error) {
      DefaultAlert({
        title: "Registration failed",
        message: (error as Error).message,
      });
      console.error(error);
      await account.deleteSessions();
    } finally {
      setLoading(false);
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, maxHeight: "100%" }}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <StatusBar style="light" />
          <View style={styles.header}>
            <ImageBackground source={bgImage} style={styles.bg}>
              <Text style={styles.title}>Let's start!!</Text>
            </ImageBackground>
          </View>
          <View style={styles.form}>
            <View style={{ flex: 1 }}>
              <View>
                <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  placeholder="Email"
                  inputMode="email"
                  value={email}
                  onChangeText={setEmail}
                />
                <PasswordInput
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <PasswordInput
                  placeholder="Password Authentication"
                  secureTextEntry
                  value={passwordAuth}
                  onChangeText={setPasswordAuth}
                />
                <PhoneInput
                  placeholder="Phone number"
                  returnKeyType="done"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>
            <View style={styles.footer}>
              <PrimaryButton
                loading={loading}
                label="Register"
                onPress={() => {
                  register(name, email, password, passwordAuth, phone);
                }}
              />
              <Text style={{ color: Colors.light.muted }}>
                Have an account? <Link href="/(auth)/login">Sign In</Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark.background,
    minHeight: "100%",
  },
  header: {
    flex: 2,
    width: "100%",
  },
  bg: {
    flex: 1,
    padding: Sizes.lg,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    color: Colors.dark.text,
    fontSize: Sizes.xl,
  },
  form: {
    flex: 5,
    width: "100%",
    position: "relative",
    backgroundColor: Colors.light.background,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    paddingVertical: Sizes.sm + 40,
    paddingHorizontal: Sizes.lg,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
