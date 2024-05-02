import { Icon } from "@/components/Icon";
import { Link, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ob1 from "./ob/Ob1";
import Ob2 from "./ob/Ob2";
import Ob3 from "./ob/Ob3";


export default function RootHome() {
  const insets = useSafeAreaInsets();

  const handleLogin = (type: string) => {
    router.push("/login");
    router.setParams({ type });
  };

  const [active, setActive] = React.useState(0);

  const swipeEvent = (event: any) => {
    if (active >= 2) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Link href="/home/" style={styles.skipText}>
        Skip
      </Link>
      <Animated.View style={styles.ob}>
        <GestureHandlerRootView>
          <Swipeable onBegan={swipeEvent}>{OnBoardingScreen(active)}</Swipeable>
        </GestureHandlerRootView>
        <View style={{ flex: 1 }} />
        <View style={styles.circles}>
          {Array.from({ length: 3 }).map((_, i) => (
            <View
              key={i}
              style={[styles.circle, active === i ? styles.activeCircle : {}]}
            ></View>
          ))}
        </View>
      </Animated.View>
      <View>
        <TouchableOpacity
          style={styles.btnEmail}
          onPress={() => {
            handleLogin("email");
          }}
        >
          <Icon name="message" />
          <Text style={styles.textEmail}>Login with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnPhone}
          onPress={() => {
            handleLogin("phone");
          }}
        >
          <Icon name="call" />
          <Text style={styles.textPhone}>Login with Phone</Text>
        </TouchableOpacity>
        <View style={styles.messageLink}>
          <Text style={styles.message}>Don't have an account? </Text>
          <Link href="/(auth)/register">Sign Up</Link>
        </View>
      </View>
    </View>
  );
}

function OnBoardingScreen(index: number) {
  switch (index) {
    case 0:
      return <Ob1 />;
    case 1:
      return <Ob2 />;
    case 2:
      return <Ob3 />;
    default:
      return <Ob1 />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.lg,
    marginBottom: Sizes.xl2x,
  },
  skipText: {
    textAlign: "right",
    fontSize: Sizes.md3x,
    marginTop: Sizes.xl,
    color: Colors.light.muted,
  },
  ob: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Sizes.xl,
  },
  circles: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Sizes.xl,
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: "#2D2D2D",
    marginRight: 4,
    opacity: 0.2,
  },
  activeCircle: {
    backgroundColor: "#F43939",
    opacity: 1,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnEmail: {
    width: "100%",
    borderRadius: Sizes.md,
    paddingVertical: Sizes.md,
    backgroundColor: "#2D2D2D",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: Sizes.sm,
  },
  message: {
    color: "#2D2D2D",
  },
  textEmail: {
    color: Colors.white,
    textAlign: "center",
    fontSize: Sizes.md2x,
    marginTop: 1,
  },
  textPhone: {
    textAlign: "center",
    fontSize: Sizes.md2x,
    marginTop: 1,
  },
  btnPhone: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: Sizes.md,
    paddingVertical: Sizes.md,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: Sizes.sm,
    marginTop: Sizes.md,
  },
  messageLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  link: {
    color: "#F43939",
    marginLeft: 10,
  },
  MessageIcon: {
    width: 24,
    height: 24,
    marginTop: 10,
  },
});
