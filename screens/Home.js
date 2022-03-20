import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import NewToDo from "../components/NewTodo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Item from "../components/card";

const Home = ({ user, setIsAuth }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Item item={item} onDelete={handleDelete} />
      </View>
    );
  };

  const clearInput = () => {
    setTodo("");
  };
  const handleDelete = async (id) => {
    try {
      const data = await AsyncStorage.getItem("data");
      const parsedData = JSON.parse(data);

      fetch(
        `https://todo-9fcef-default-rtdb.firebaseio.com/${parsedData.user.id}/${id}.json`,
        {
          method: "DELETE",
        }
      )
        .then(() => {
          const arr = todoList.filter((m) => m.id !== id);
          setTodoList(arr);
          Alert.alert("Deleted Successfully.");
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e.message);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      setIsAuth(false);
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const saveTodo = async () => {
    try {
      if (!todo) {
        Alert.alert("Input cannot be empty!");
        return;
      }
      const data = await AsyncStorage.getItem("data");
      const parsedData = JSON.parse(data);

      fetch(
        `https://todo-9fcef-default-rtdb.firebaseio.com/${parsedData.user.id}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      )
        .then((res) => {
          res = res.json();

          fetchTodo();
          Alert.alert("Saved Successfully.");
        })
        .catch((e) => console.log(e));

      setModalVisible(!modalVisible);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchTodo = async () => {
    try {
      const data = await AsyncStorage.getItem("data");
      const parsedData = JSON.parse(data);
      fetch(
        `https://todo-9fcef-default-rtdb.firebaseio.com/${parsedData.user.id}.json`
      )
        .then((res) => res.json())
        .then((data) => {
          let arr = [];

          for (let key in data) {
            if (!data.hasOwnProperty(key)) continue;
            arr.push({ id: key, todo: data[key] });
          }

          setTodoList(arr);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    console.log("gello");
    fetchTodo();
  }, []);

  return (
    <View style={styles.homeContainer}>
      <View style={styles.detail}>
        <Image
          style={styles.profile}
          source={{
            uri: user?.photoUrl
              ? user.photoUrl
              : "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <Text style={styles.boldText}>Welcome </Text>
        <TouchableOpacity onPress={logOut}>
          <Ionicons name="log-out-outline" size={32} color="blue" />
        </TouchableOpacity>
      </View>

      <View>
        {!modalVisible && (
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>New Todo</Text>
          </Pressable>
        )}
      </View>

      <View>
        {modalVisible && (
          <NewToDo
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setTodoList={setTodoList}
            saveTodo={saveTodo}
            setTodo={setTodo}
            toDo={todo}
          />
        )}
      </View>

      <View style={styles.list}>
        <FlatList
          data={todoList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: "10%",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 30,
  },
  boldText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "600",
  },
  NormalText: {
    marginBottom: 20,
    marginBottom: 40,
    fontSize: 16,
    fontWeight: "500",
  },
  btn: {},
  detail: {
    paddingTop: "8%",
    minHeight: 80,
    width: "100%",
    flexDirection: "row",
    height: "10%",
    alignItems: "center",
    backgroundColor: "rgb(199, 75, 80)",
    justifyContent: "space-around",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    marginTop: "5%",
    backgroundColor: "rgb(199, 75, 80)",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    padding: 10,
    width: "100%",
    height: "80%",
  },
});

export default Home;
