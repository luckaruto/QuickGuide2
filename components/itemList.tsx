import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  item: object;
  number: number;
  plus: () => void;
  addItemAfterSelected: (selectedItem: any) => void;
  remove: (selectedItem: any) => void;
};

const ItemList = (props: Props) => {
  return (
    <View
      style={{
        borderWidth: 2,
        borderRadius: 10,
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text>{props.number}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          columnGap: 5,
        }}
      >
        <TouchableOpacity
          onPress={props.plus}
          style={{
            borderRadius: 100,
            height: 50,
            width: 50,
            backgroundColor: "green",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.addItemAfterSelected(props.item)}
          style={{
            borderRadius: 100,
            height: 50,
            width: 50,
            backgroundColor: "blue",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.remove(props.item);
          }}
          style={{
            borderRadius: 100,
            height: 50,
            width: 50,
            backgroundColor: "red",
          }}
        ></TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({});
