import React from "react";
import{View,StyleSheet, Text, Image} from "react-native";

  
  export default function Compass(){
    return(
            <View style={styles.compass
            }>
                <Image source={require("../../assets/auth/compass.png")} style={styles.image}/>
                    </View>
       
    )
}
const styles=StyleSheet.create({
    compass:{
        backgroundColor:"#F43939",
        width:50,
        height:50,
        borderRadius:50,
        padding:12,
    },
    image:{
        width:24,
        height:24, 
        
    }
})