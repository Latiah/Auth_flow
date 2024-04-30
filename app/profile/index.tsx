import { Icon } from "@/components/Icon";
import { Link, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Account } from "react-native-appwrite/src";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import client from "../../utils/AppwriteClient";

export default function Profile() {
  const bgImage = require("@/assets/auth/pattern.png");
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const account = new Account(client);

  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = async () => {
    try {
      var user = await account.get();
      setName(user.name);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSessions();
    } catch (e) {
      console.log(e);
    } finally {
      router.dismissAll();
      router.push("/(auth)/login");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground source={bgImage} style={styles.bg}>
          <Text style={[styles.title, { paddingTop: insets.top }]}>
            Profile
          </Text>
          <View style={styles.titleElements}>
            <Image
              source={require("@/assets/auth/profile.png")}
              style={styles.profileImg}
            />
            <View style={styles.greetings}>
              <Text style={styles.subtitle}>Welcome</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.bx}>
              <TouchableOpacity onPress={() => logout()}>
                <Image
                  source={require("@/assets/auth/out.png")}
                  style={styles.notify}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.form}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleElement}>
            <Icon name="profile" />
            <Link href="/profile/edit" style={styles.subtitleElement}>
              Profile
            </Link>
            <Icon name="dark-arrow-right" />
          </View>
          <View style={styles.titleElement}>
            <Icon name="discount" />
            <Link href="/profile/upgrade" style={styles.subtitleElement}>
              Go Pro
            </Link>
            <Icon name="dark-arrow-right" />
          </View>
          <View style={styles.titleElement}>
            <Icon name="document" />
            <Text style={styles.subtitleElement}>Terms & Condition</Text>
            <Icon name="dark-arrow-right" />
          </View>
          <View style={styles.titleElement}>
            <Icon name="question-circle" />
            <Text style={styles.subtitleElement}>FAQ</Text>
            <Icon name="dark-arrow-right" />
          </View>
          <View style={styles.titleElement}>
            <Icon name="setting" />
            <Text style={styles.subtitleElement}>Settings</Text>
            <Icon name="dark-arrow-right" />
          </View>
        </View>
        <View style={styles.footer}>
          <Pressable style={styles.button}>
            <Icon name="headset" />
            <Text style={styles.btnText}>How can we help you?</Text>
          </Pressable>
          <Text style={styles.text}>Parking v.1</Text>
        </View>
      </View>
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
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 20,
  },
  subtitle: {
    color: Colors.white,
    opacity: 0.5,
  },
  subtitleElement: {
    flex: 1,
    fontSize: Sizes.md2x,
    paddingVertical: Sizes.sm,
    color: Colors.light.text,
  },
  text: {
    fontSize: 12,
    color: "#2D2D2D",
    opacity: 0.4,
  },
  primaryText: {
    color: Colors.light.primary,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
    paddingVertical: Sizes.md,
    borderRadius: Sizes.md,
    marginBottom: Sizes.lg,
    gap: Sizes.sm,
  },
  btnText: {
    color: Colors.light.light,
    fontSize: Sizes.md2x,
  },
  profileImg: {
    width: 68,
    height: 68,
    borderRadius: 50,
  },
  form: {
    flex: 4,
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
  name: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  titleElements: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Sizes.md,
  },
  titleElement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.lg,
    gap: Sizes.md,
  },
  greetings: {
    flex: 1,
  },
  firstIcon: {
    width: 22,
    height: 22,
  },

  icons: {
    width: 18,
    height: 18,
  },
  titles: {
    marginRight: 100,
  },
  icon: {
    marginTop: 15,
  },
  words: {
    marginLeft: 15,
  },
  bx: {
    backgroundColor: "#2A344E",
    width: 44,
    height: 44,
    borderRadius: 10,
    marginTop: 20,
  },
  notify: {
    width: 20,
    height: 20,
    margin: 11,
  },
});
