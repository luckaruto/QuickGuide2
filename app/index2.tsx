import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/counterSlice";
import { handlePress } from "../redux/counterSlice";
import { AppDispatch } from "@/redux/store";

const NumberGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, error, loading, value } = useSelector(
    (state: any) => state.counters
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const renderItem = ({ item }: { item: number }) => {
    const isSelected = value.includes(item);
    return (
      <TouchableOpacity
        style={{
          backgroundColor: isSelected ? "blue" : "gray",
          padding: 20,
          margin: 5,
        }}
        onPress={() => handlePress(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={entities}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
      />
      <Text>Selected Numbers: {value.join(", ")}</Text>
    </View>
  );
};

export default NumberGrid;
