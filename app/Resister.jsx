import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Firebase_AUTH, Firebase_DB } from "./firebaseConfig"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import SIgnInOps from "../components/SIgnInOps";
import { useRouter } from "expo-router";

const Resister = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        Firebase_AUTH,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(Firebase_DB, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created successfully!");
      router.push({
        pathname: "Home",
        params: { UserName: name },
      });
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <View className={"flex-1 p-3"}>
        <StatusBar style="dark" />
        <View className={"text-center"}>
          <Text
            style={{ fontSize: hp(5) }}
            className={"font-bold tracking-wide text-center text-black"}
          >
            Create your new account.
          </Text>
          <Text
            className={"text-center"}
            style={{ fontSize: hp(1.5), color: "#929292" }}
          >
            Create an account to start looking for the food you like
          </Text>
        </View>

        <View className={"mt-5"}>
          <View className={"mb-3"}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              clearButtonMode="while-editing"
              keyboardType="default"
              style={styles.inputControl}
              placeholder="Enter Name"
              placeholderTextColor={"#929292"}
              className={"p-2 border-2 rounded-md "}
            />
          </View>
          <View className={"mb-3"}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="Enter E-mail"
              placeholderTextColor={"#929292"}
              className={"p-2 border-2 rounded-md "}
            />
          </View>
          <View className={"mb-3"}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              style={styles.inputControl}
              placeholder="Password"
              placeholderTextColor={"#929292"}
              className={"p-2 border-2 rounded-md "}
              secureTextEntry
            />
            <Text className={"m-1 text-red-500"}>Forget Password</Text>

            <TouchableOpacity
              style={{ width: wp(90), height: hp(7) }}
              className={
                "m-2 bg-rose-500 text-center items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
              }
              onPress={handleRegister}
            >
              <Text
                style={{ fontSize: hp(3) }}
                className={"text-center text-white font-bold tracking-wide"}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <SIgnInOps targerPage={"Login"} endText={"Have an account?"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Resister;

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
});