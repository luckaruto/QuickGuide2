import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, handlePress } from "../redux/counterSlice";
import { AppDispatch } from "@/redux/store";

const NumberGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, error, loading, value } = useSelector(
    (state: any) => state.counters
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const renderItem = ({ item }: { item: { id: string } }) => {
    const isSelected = value.includes(item.id);
    return (
      <TouchableOpacity
        style={{
          backgroundColor: isSelected ? "red" : "gray",
          width: 50,
          height: 50,
          padding: 10,
        }}
        onPress={() => dispatch(handlePress(item.id))} // Dispatch action with id
      >
        <Text>{item.id}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading data: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",

          justifyContent: "center",
          height: "70%",
          width: "90%",
          padding: 15,
          borderRadius: 10,
          borderWidth: 2,
          alignItems: "center",
        }}
      >
        <FlatList
          contentContainerStyle={{
            gap: 10,
          }}
          columnWrapperStyle={{
            gap: 20,
            width: "100%",
          }}
          data={entities} // Ensure the data is passed correctly as a list of objects
          renderItem={renderItem}
          keyExtractor={(item) => item.id} // Extract id for keys
          numColumns={5}
        />
      </View>
      <View
        style={{
          marginTop: 15,
          height: "20%",
          width: "90%",
          borderWidth: 2,
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Selected Numbers: {value.join(", ")}</Text>
      </View>
    </SafeAreaView>
  );
};

export default NumberGrid;
