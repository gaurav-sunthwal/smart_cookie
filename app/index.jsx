import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  FadeInDown,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import homeData from "./HomeData";

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < homeData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNavigation = () => {
    if (currentSlide === homeData.length - 1) {
      router.push("Login");
    } else {
      handleNext();
    }
  };

  return (
    <View className={" flex-1 flex justify-end"}>
      <StatusBar style="light" />
      {/* <Text>App</Text> */}
      <Image
        source={homeData[currentSlide].image}
        className={"h-full w-full absolute"}
      />
      <LinearGradient
        colors={["transparent", "#18181b"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        style={{ width: wp(100), height: hp(70) }}
        className={"pb-12 flex justify-end space-y-8"}
      >
        <Animated.View
          entering={FadeInDown.duration(500).springify()}
          className={"flex items-center"}
        >
          {/* <Text>COde</Text> */}
          <React.Fragment>
            <Text
              style={{ fontSize: hp(5) }}
              className={"font-bold tracking-wide text-center text-white"}
            >
              {homeData[currentSlide].heading}
            </Text>
            <Text
              style={{ fontSize: hp(2.5) }}
              className={" m-3 text-center text-gray-300"}
            >
              {homeData[currentSlide].subtitle}
            </Text>
            <View className={"flex flex-row m-3"}>
              {homeData.map((item, index) => {
                return (
                  <View
                    key={index}
                    className={`m-3 w-20 ${
                      index === currentSlide ? "bg-gray-500" : "bg-white"
                    } h-2 rounded-md`}
                  ></View>
                );
              })}
            </View>
            {currentSlide === 0 ? (
              <TouchableOpacity
                onPress={handleNext}
                style={{ width: wp(15), height: hp(7) }}
                className={
                  " bg-rose-500 text-center items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
                }
              >
                <Text
                  style={{ fontSize: hp(3) }}
                  className={"text-center text-white font-bold tracking-wide"}
                >
                  →
                </Text>
              </TouchableOpacity>
            ) : (
              <View className={"flex flex-row justify-between"}>
                <View className={"m-2"}>
                  <TouchableOpacity
                    onPress={handlePrevious}
                    style={{ width: wp(40), height: hp(7) }}
                    className={
                      " bg-rose-500 text-center items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
                    }
                  >
                    <Text
                      style={{ fontSize: hp(3) }}
                      className={
                        "text-center text-white font-bold tracking-wide"
                      }
                    >
                      Previous
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className={"m-2"}>
                  <TouchableOpacity
                    onPress={handleNavigation}
                    style={{ width: wp(30), height: hp(7) }}
                    className={
                      " bg-rose-500 text-center items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
                    }
                  >
                    <Text
                      onPress={
                        currentSlide === 1
                          ? handleNext
                          : () => {
                              router.push("Login");
                            }
                      }
                      style={{ fontSize: hp(3) }}
                      className={
                        "text-center text-white font-bold tracking-wide"
                      }
                    >
                      {currentSlide === 1 ? "Next" : "Login"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </React.Fragment>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

/*



<View
                className={`m-3 w-20 ${
                  currentSlide === 0 ? "bg-gray-500" : " bg-white"
                } h-2 rounded-md`}
              ></View>
              <View
                className={`m-3 w-20 ${
                  currentSlide === 1 ? "bg-gray-500" : " bg-white"
                } h-2 rounded-md`}
              ></View>
              <View
                className={`m-3 w-20 ${
                  currentSlide === 2 ? "bg-gray-500" : " bg-white"
                } h-2 rounded-md`}
              ></View>


 <Text
            style={{ fontSize: hp(5) }}
            className={"text-white font-bold tracking-wide"}
          >
            Best <Text className={" text-red-500"}>Workouts</Text>
          </Text>
          <Text
            style={{ fontSize: hp(5) }}
            className={"text-white font-bold tracking-wide"}
          >
            For You{" "}
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(700).springify()}>
          <TouchableOpacity
            onPress={() => {
              router.push("home");
            }}
            style={{ width: wp(80), height: hp(7) }}
            className={
              " bg-rose-500 text-center items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
            }
          >
            <Text
              style={{ fontSize: hp(3) }}
              className={"text-center text-white font-bold tracking-wide"}
            >
              Get Started
            </Text>
          </TouchableOpacity>



*/
