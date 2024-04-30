import Colors from "@/constants/Colors";
import ParkingSpot from "@/utils/models/ParkingSpot";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const booking = {
  parkingSpot: null,
  hours: 0,
  total: 0,
};

export const BookingContext = createContext<{
  parkingSpot: ParkingSpot | null;
  hours: number;
  total: number;
}>(booking);

export default function ParkingLayout() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar style="dark" />
      <BookingContext.Provider value={booking}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          }}
        >
          <Stack.Screen
            name="tracking"
            options={{
              contentStyle: { paddingTop: 0, paddingBottom: 0 },
            }}
          />
          <Stack.Screen
            name="route"
            options={{
              contentStyle: { paddingTop: 0, paddingBottom: 0 },
            }}
          />
          <Stack.Screen
            name="map"
            options={{
              contentStyle: {
                paddingTop: 0,
                paddingBottom: 0,
                backgroundColor: Colors.light.background,
              },
            }}
          />
        </Stack>
      </BookingContext.Provider>
    </>
  );
}
