import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import {
  Link as DefaultLink,
  LinkProps as DefaultLinkProps,
} from "expo-router";
import {
  TextProps as DefaltTextProps,
  Text as DefaultText,
  useColorScheme,
} from "react-native";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaltTextProps;
export type LinkProps = ThemeProps & DefaultLinkProps<string>;

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <DefaultText
      style={[
        {
          color,
          fontSize: Sizes.md,
          fontFamily: "Avenir",
          fontWeight: "500",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function Link(props: LinkProps) {
  const { style, lightColor, darkColor, href, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );
  return (
    <DefaultLink
      href={href}
      style={[
        { color, fontFamily: "Avenir", fontSize: Sizes.md, fontWeight: "500" },
        style,
      ]}
      {...otherProps}
    />
  );
}
