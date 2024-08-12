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
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SIgnInOps from "../components/SIgnInOps";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Firebase_AUTH } from "./firebaseConfig";
import { useRouter } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        Firebase_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      Alert.alert("Success", `Welcome back, ${user.email}!`);
      router.push("Home")
    } catch (error) {
      Alert.alert("Login Error", error.message);
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
            Login to your account
          </Text>
          <Text
            className={"text-center"}
            style={{ fontSize: hp(2), color: "#929292" }}
          >
            Please sign in to your account
          </Text>
        </View>
        {/* Input Section */}
        <View className={"mt-5"}>
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
              autoCorrect={false}
              clearButtonMode="while-editing"
              style={styles.inputControl}
              placeholder="Password"
              placeholderTextColor={"#929292"}
              className={"p-2 border-2 rounded-md "}
              autoCapitalize="none"
              secureTextEntry
            />
            <Text className={"m-1 text-red-500"}>Forget Password</Text>

            <TouchableOpacity
              style={{ width: wp(90), height: hp(7) }}
              className={
                "m-2 bg-rose-500 text-center items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
              }
              onPress={handleLogin}
            >
              <Text
                style={{ fontSize: hp(3) }}
                className={"text-center text-white font-bold tracking-wide"}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

          <SIgnInOps targerPage={"Resister"} endText={"Don't have an account?"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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