import * as React from "react";
import { AnimatedStyle, interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { StyleSheet, View, ViewStyle, useWindowDimensions } from "react-native";

import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { Icon } from "./Icon";
import { Text } from "./Themed";

type CircularWheelProps = {
  data: { title: string; label: string }[];
  onChange?: (index: number) => void;
};

export default function CircularWheel({ data, onChange }: CircularWheelProps) {
  const window = useWindowDimensions();
  const [selectedTime, selectTime] = React.useState(0);
  const wheelSize = window.height / 1.75;

  type TAnimationStyle = (value: number) => AnimatedStyle<ViewStyle>;
  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    "worklet";
    const rotateZ = `${interpolate(-value, [1, 0, -1], [50, 0, -50])}deg`;
    return {
      transform: [{ rotateZ }],
      left: 0,
    };
  }, []);

  React.useEffect(() => {
    if (selectedTime >= 0 && selectedTime < data.length) {
      onChange?.(selectedTime);
    }
  }, [selectedTime]);

  return (
    <View
      style={{
        width: wheelSize,
        height: wheelSize,
        position: "relative",
      }}
    >
      <Carousel
        defaultIndex={selectedTime}
        onSnapToItem={(i) => selectTime(i)}
        vertical={true}
        style={{
          width: wheelSize,
          height: wheelSize,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
          borderRadius: wheelSize / 2,
          transform: [{ rotate: "-28deg" }],
        }}
        width={wheelSize}
        height={wheelSize / 2}
        windowSize={wheelSize}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View
              key={index}
              style={[
                {
                  width: wheelSize / 4,
                  height: wheelSize / 4,
                  transform: [{ rotate: "28deg" }],
                },
              ]}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={[
                    styles.hourText,
                    { opacity: index === selectedTime ? 1 : 0.5 },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.hourLabel,
                    { opacity: index === selectedTime ? 1 : 0.5 },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
            </View>
          );
        }}
        customAnimation={animationStyle}
      />
      <View
        style={[
          styles.arrow,
          {
            top: wheelSize / 2 - 35,
            left: wheelSize / 4 - 35,
          },
        ]}
      >
        <Icon name="red-arrow" size="xl2x" />
      </View>
      <View
        style={{
          backgroundColor: Colors.light["secondary-background"],
          position: "absolute",
          width: wheelSize / 2,
          height: wheelSize / 2,
          borderRadius: wheelSize / 4,
          top: wheelSize / 4,
          left: wheelSize / 4,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    position: "absolute",
    width: 70,
    height: 70,
    zIndex: 100,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  hourText: {
    fontSize: Sizes.xl2x,
  },
  hourLabel: {
    fontWeight: "400",
  },
});
