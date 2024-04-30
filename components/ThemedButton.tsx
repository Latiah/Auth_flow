import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Text } from "./Themed";

type ButtonProps = PressableProps & {
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: any;
  loading?: boolean;
};

export function Button(props: ButtonProps) {
  const { style, textStyle, label, ...rest } = props;
  return (
    <Pressable
      style={[
        {
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.dark.background,
          paddingVertical: Sizes.md,
          paddingHorizontal: Sizes.lg,
          borderRadius: Sizes.md,
          marginBottom: Sizes.lg,
          opacity: props.loading ? 0.85 : 1,
        },
        style,
      ]}
      {...rest}
    >
      <ActivityIndicator
        color={textStyle?.color}
        style={{ display: props.loading ? "flex" : "none" }}
      />
      <Text
        style={[
          {
            display: props.loading ? "none" : "flex",
            textAlign: "center",
            color: Colors.light.light,
            fontSize: Sizes.md3x,
            ...textStyle,
          },
        ]}
      >
        {props.label}
      </Text>
    </Pressable>
  );
}

export function PrimaryButton(props: ButtonProps) {
  return <Button {...props} />;
}

export function LightButton(props: ButtonProps) {
  const { style, ...otherProps } = props;
  return (
    <Button
      {...otherProps}
      style={[
        style,
        {
          backgroundColor: Colors.light.light,
        },
      ]}
      textStyle={{
        color: Colors.light.dark,
      }}
    />
  );
}
