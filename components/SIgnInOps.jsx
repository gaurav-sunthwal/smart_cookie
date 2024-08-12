import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
const SIgnInOps = ({targerPage , endText }) => {
    const router = useRouter();
  return (
    <View>
      <View>
        <Text style={{ fontSize: hp(2) }} className={"text-center"}>
          ----------------Or sign in with----------------
        </Text>
        <View className={"flex justify-center flex-row p-2"}>
          <Image
            style={styles.img}
            source={require("../assets/images/google.png")}
          />
        </View>
      </View>


      <View>
        <Text className={"text-center"}>{endText} <Text onPress={()=>{router.push(`${targerPage}`)}} className={"text-red-600"}>{targerPage}</Text></Text>
      </View>
    </View>
  );
};

export default SIgnInOps;

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
  },
});
