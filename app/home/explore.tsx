import LayoutHeader from "@/components/LayoutHeader";
import { Link, Text } from "@/components/Themed";
import { SearchInput } from "@/components/ThemedInput";
import SimpleParkingSpotCard from "@/components/cards/SimpleParkingSpotCard";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Compass from "../../components/cards/Compass2";

export default function Explore() {
  const parkingSpots = [
    {
      title: "Graha Mall",
      address: "123 Dhaka Street",
      time: "7 min",
      price: "$7",
      image: require("@/assets/auth/mall1.png"),
    },
    {
      title: "Graha Mall",
      address: "123 Dhaka Street",
      time: "7 min",
      price: "$7",
      image: require("@/assets/auth/mall1.png"),
    },
    {
      title: "Graha Mall",
      address: "123 Dhaka Street",
      time: "7 min",
      price: "$7",
      image: require("@/assets/auth/gmall.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <LayoutHeader title="Explore" backHidden />
        <SearchInput dark placeholder="Search" style={styles.searchInput} />
        <View style={styles.titleElements}>
          <View style={styles.location}>
            <Text style={styles.log}>Nearst</Text>
            <View style={styles.circle}></View>
          </View>
          <Link href="/home/history/" style={styles.message}>
            Most Popular
          </Link>
          <Link href="/parking/map" style={styles.message}>Most Wanted</Link>
        </View>
        <View>
        
          {parkingSpots.map((spot, index) => (
            <SimpleParkingSpotCard key={index} {...spot} />
            
          ))}
          <View style={styles.compass}>
           <Compass/>
           </View>
        </View>
       
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4FA",
  },
  content: {
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
  },
  searchInput: {
    marginBottom: Sizes.xl,
    marginTop: Sizes.md,
    backgroundColor: Colors.light.background,
  },
  title: {
    textAlign: "center",
    color: "#2D2D2D",
    fontSize: 20,
    marginBottom: 30,
  },
  location: {
    backgroundColor: "#081024",
    width: 73,
    height: 56,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "column",
    justifyContent: "center",
  },
  log: {
    color: Colors.white,
    textAlign: "center",
    fontSize: Sizes.md2x,
  },
  circle: {
    backgroundColor: Colors.light.danger,
    width: Sizes.sm,
    height: Sizes.sm,
    borderRadius: Sizes.sm,
    marginTop: Sizes.sm,
    alignSelf: "center",
  },
  compass:{
flexDirection:"row",
justifyContent:"flex-end",
top:-80,
right:2,
  },
  titleElements: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.md2x,
    marginBottom: Sizes.xl,
  },
  message: {
    color: Colors.light.muted,
    fontSize: Sizes.md2x,
  },
});
