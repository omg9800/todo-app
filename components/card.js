import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Item = ({ item, onDelete }) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.text}>{item.todo}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Ionicons
            name="close-circle-outline"
            size={32}
            color="rgb(199, 75, 80)"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "80%",
    height: 50,

    minHeight: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "10%",
    marginBottom: 10,
    padding: 10,
    marginLeft: "10%",
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Item;
