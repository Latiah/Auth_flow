import { Text } from "@/components/Themed";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Icon } from "@/components/Icon";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
type SimpleParkingSpotCardProps = {
  title: string;
  address: string;
  price: string;
  time: string;
  location:string;
  image: ImageSourcePropType;
  onPress?: () => void;
};

export default function HistoryScreen(
  props: SimpleParkingSpotCardProps
) {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.card1}>
        <Image source={props.image} />
        <View style={styles.details}>
          <Text style={styles.title1}>{props.title}</Text>
          <Text style={styles.title2}>{props.address}</Text>
          <View style={styles.btns}>
          <View style={styles.background}>
          <Icon name="location" />
          <Text style={styles.danger}>{props.price}</Text>
        </View>
        <View style={styles.background1}>
          <Icon name="time-circle" />
          <Text style={styles.danger}>{props.location}</Text>
        </View>
            
        </View>
        </View>
        <Text style={styles.timeButton}>{props.time}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card1: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  timeButton: {
    color: "#2D2D2D",
    opacity: 0.3,
    fontSize: 12,
  },
  btns:{
flexDirection:"row",
justifyContent:"space-between"
  },
  details: {
    marginTop: 3,
  },
  title1: {
    color: "#2D2D2D",
    fontSize: 18,
  },
  title2: {
    color: "#2D2D2D",
    fontSize: 14,
    marginBottom: 15,
    opacity: 0.5,
  },
  title3: {
    backgroundColor:"#FFF3F3",
    paddingHorizontal:10,
    borderRadius:7,
    color:"#F43939",
  },
  danger: {
    color: Colors.light.danger,
    margin: 0,
    alignSelf: "center",
  },
  title4:{
    marginLeft:30,
    backgroundColor:"#FFF3F3",
    paddingHorizontal:10,
    borderRadius:7,
    color:"#F43939"
  },
  background1: {
    backgroundColor: Colors.light.lightDanger,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginLeft:20,
    borderRadius: Sizes.sm,
  },
  background: {
    backgroundColor: Colors.light.lightDanger,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: Sizes.sm,
  },
});
