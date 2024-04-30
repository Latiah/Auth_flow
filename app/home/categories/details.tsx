import { Icon } from "@/components/Icon";
import { Link, Text } from "@/components/Themed";
import SimpleParkingSpotCard from "@/components/cards/SimpleParkingSpotCard";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Compass from "@/components/cards/Compass2";

export default function CategoryDetails() {
  const parkingSpots = [
    {
      title: "Graha Mall",
      address: "123 Dhaka Street",
      time: "7 min",
      price: "$7",
      image: require("../../../assets/auth/mall1.png"),
    },
    {
      title: "Graha Mall",
      address: "123 Dhaka Street",
      time: "7 min",
      price: "$7",
      image: require("../../../assets/auth/mall1.png"),
    },
    {
      title: "Graha Mall",
      address: "123 Dhaka Street",
      time: "7 min",
      price: "$7",
      image: require("../../../assets/auth/gmall.png"),
    },
    {
      title: "Graha Mall",
      address: "123 Dhaka Street",
      time: "7 min",
      price: "$7",
      image: require("../../../assets/auth/gmall.png"),
    },
    
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.search}>
          <View style={styles.icon}>
            <Icon
              name="arrow-left"
              onPress={() => {
                router.back();
              }}
            />
          </View>
          <Text style={styles.title}>Detail Category</Text>
          <View style={styles.icon}>
            <Icon name="filter" />
          </View>
        </View>
        <View style={styles.titleElements}>
          <View style={styles.location}>
            <Text style={styles.log}>Nearst</Text>
            <View style={styles.circle}></View>
          </View>
          <Link href="/home/history/" style={styles.message}>
            Most Popular
          </Link>
          <Text style={styles.message}>Most Wanted</Text>
        </View>
        {parkingSpots.map((spot, index) => (
          <SimpleParkingSpotCard key={index} {...spot} />
        ))}
        <View style={styles.compass}>
           <Compass/>
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
  title: {
    textAlign: "center",
    fontSize: Sizes.lg,
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
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  compass:{
    flexDirection:"row",
    justifyContent:"flex-end",
    top:-150,
    right:3,
      },
  log: {
    color: Colors.white,
    textAlign: "center",
    fontSize: Sizes.md2x,
  },
  circle: {
    backgroundColor: "#F43939",
    width: 6,
    height: 6,
    borderRadius: 50,
    marginTop: 6,
    marginLeft: 33,
  },
  titleElements: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.md2x,
    marginBottom: Sizes.xl,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: "#2D2D2D",
    opacity: 0.4,
    lineHeight: 21.28,
  },
  icon: {
    backgroundColor: "#EAEAF3",
    width: 54,
    height: 55,
    padding: 5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
