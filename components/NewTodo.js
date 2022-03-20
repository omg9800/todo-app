import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NewToDo = ({
  modalVisible,
  setModalVisible,
  setTodo,
  saveTodo,
  toDo,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalText}>New To Do</Text>
              <TextInput
                style={styles.input}
                placeholder={"Write a task"}
                value={toDo}
                onChangeText={(text) => setTodo(text)}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.btn}>
                <Button onPress={saveTodo} title="save" />
              </View>
              <View style={styles.btn}>
                <Button
                  onPress={() => setModalVisible(!modalVisible)}
                  title="cancel"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "35%",
    paddingBottom: 30,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  btn: {
    width: "35%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },

  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1.5,
    padding: 10,
    fontSize: 16,
  },
  modalText: {
    textAlign: "center",
    fontWeight: "700",
  },
});

export default NewToDo;
