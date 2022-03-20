import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ setIsAuth, user, setUser }) => {
  const [message, setMessage] = useState("");

  const saveData = async (token, user) => {
    try {
      await AsyncStorage.setItem("data", JSON.stringify({ token, user }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleGoogleSignIn = () => {
    const config = {
      iosClientId: `435213235344-0v704oijgko2ue1od7b6kpn6s0u5jgsq.apps.googleusercontent.com`,
      androidClientId: `435213235344-pemt96sc3glkih9mpcrsgebb26vc0k78.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then((result) => {
        console.log(result);
        const { type, user } = result;
        if (type == "success") {
          saveData(result.accessToken, result.user);
          setIsAuth(true);
          setUser(result.user);
        } else {
          console.log("failed");
          setMessage("Google signin cancellled");
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("data");
        const newData = JSON.parse(data);

        if (newData) {
          console.log(newData, "new");
          setIsAuth(true);
          setUser(newData.user);
        }
      } catch (e) {
        console.log(e.message, "hello");
      }
    };

    getData();
  }, [user]);

  return (
    <View style={styles.LoginContainer}>
      <Text style={styles.boldText}>Welcome!</Text>
      <Image
        style={styles.profile}
        source={{
          uri: user?.photoUrl
            ? user.photoUrl
            : "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <Text style={styles.NormalText}>
        {"Please login to continue to the App."}
      </Text>
      <Button
        onPress={handleGoogleSignIn}
        style={styles.btn}
        title="Login with Google"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: "45%",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
  },
  boldText: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "700",
  },
  NormalText: {
    marginBottom: 20,
    marginBottom: 40,
    fontSize: 16,
    fontWeight: "500",
  },
  btn: {},
});

export default Login;
