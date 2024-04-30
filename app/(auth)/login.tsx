import { Link, Text } from "@/components/Themed";
import { PrimaryButton } from "@/components/ThemedButton";
import { PasswordInput, PhoneInput, TextInput } from "@/components/ThemedInput";
import { DefaultAlert } from "@/components/alerts/DefaultAlert";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router, useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Account, ID } from "react-native-appwrite/src";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import client from "../../utils/AppwriteClient";

export default function Login() {
  const bgImage = require("../../assets/auth/pattern.png");
  const { type } = useGlobalSearchParams<{ type: string }>();
  const [loginMethod, setLoginMethod] = React.useState(type);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      loginMethod === "phone" ? await logInWithPhone() : await logInWithEmail();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const account = new Account(client);

  const logInWithEmail = async () => {
    if (email === "" || password === "") {
      DefaultAlert({
        title: "Validation failed",
        message: "Please fill all the fields",
      });
      return;
    }

    try {
      try {
        await account.deleteSessions();
      } catch (e) {}
      await account.createEmailSession(email, password);
      router.replace("/home/");
    } catch (err) {
      console.log(err);
      DefaultAlert({
        title: "Login failed",
        message: "Email or password is incorrect",
      });
    }
  };

  const logInWithPhone = async () => {
    if (phone === "") {
      DefaultAlert({
        title: "Validation failed",
        message: "Please enter your phone number",
      });
      return;
    }

    try {
      const parsedPhone = "+250" + parseInt(phone);
      const res = await account.createPhoneSession(ID.unique(), parsedPhone);
      router.replace("/(auth)/verify_phone_otp");
      router.setParams({
        phone: parsedPhone,
        userId: res.userId,
        expire: res.expire,
      });
    } catch (err) {
      console.log(err);
      DefaultAlert({
        title: "Login failed",
        message: "Phone number or password is incorrect",
      });
      await account.deleteSessions();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, maxHeight: "100%" }}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <StatusBar style="inverted" />
          <View style={styles.header}>
            <ImageBackground source={bgImage} style={styles.bg}>
              <Text style={styles.title}>Glad to see you!!</Text>
            </ImageBackground>
          </View>
          <View style={styles.form}>
            <View style={{ flex: 1 }}>
              {loginMethod === "phone" ? (
                <LoginWithPhone setPhone={setPhone} setPassword={setPassword} />
              ) : (
                <LoginWithEmail setEmail={setEmail} setPassword={setPassword} />
              )}
              <Text style={{ textAlign: "right", color: Colors.light.muted }}>
                Forgot password?{" "}
                <Link href="/(auth)/forgot-password/form">Retrieve</Link>
              </Text>
            </View>
            <View style={styles.footer}>
              <PrimaryButton
                label="Login"
                onPress={handleSubmit}
                loading={loading}
              />
              <Text style={{ color: Colors.light.muted }}>
                Don't have an account?{" "}
                <Link href="/(auth)/register">Sign Up</Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

interface LoginWithEmailProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}
function LoginWithEmail({ setEmail, setPassword }: LoginWithEmailProps) {
  return (
    <View>
      <TextInput
        placeholder="Email"
        inputMode="email"
        onChangeText={(text) => setEmail(text)}
      />
      <PasswordInput
        placeholder="Password"
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
      />
    </View>
  );
}

interface LoginWithPhoneProps {
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}
function LoginWithPhone({ setPhone, setPassword }: LoginWithPhoneProps) {
  return (
    <View>
      <PhoneInput
        placeholder="Phone number"
        onChangeText={(text) => setPhone(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark.background,
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
    flexDirection: "column",
  },
});
