import {
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { Link } from "expo-router";

import ItemList from "../components/itemList";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/counterSlice";

const dataTemp = [
  { id: 1, number: 1 },
  { id: 2, number: 2 },
  { id: 3, number: 3 },
  { id: 4, number: 4 },
  { id: 5, number: 5 },
  { id: 6, number: 6 },
  { id: 7, number: 7 },
];

export default function Index() {
  const [total, setTotal] = useState(0);
  const [input, setInput] = useState("");
  const [data, setData] = useState(dataTemp);

  const plus = () => {
    if (parseInt(input)) {
      setTotal(total + parseInt(input));
    }
  };
  const addItemAfterSelected = (selectedItem: any) => {
    const newItem = {
      id: data.length + 1,
      number: Math.floor(Math.random() * 1000),
    };
    const index = data.findIndex((item) => item.id === selectedItem.id);

    const newData = [...data];
    newData.splice(index + 1, 0, newItem);

    setData(newData);
  };
  const remove = (selectedItem: any) => {
    const index = data.filter((item) => item.id !== selectedItem.id);
    setData(index);
  };

  useEffect(() => {
    var value = data.reduce((acc, curr) => acc + curr.number, 0);

    setTotal(value);
  }, [input, data]);

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
          flexDirection: "row",
          justifyContent: "center",
          height: "20%",
          width: "90%",

          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",

            height: "100%",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/backGround.png")}
            resizeMode="contain"
            style={{ width: "30%" }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20 }}>Họ và tên: </Text>
            <Text style={{ fontSize: 20 }}>MSSV: </Text>
            <Link href="/index2">Go to Index2</Link>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "10%",
          width: "90%",

          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",

            height: "100%",
            width: "100%",
            alignItems: "center",
            padding: 2,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              fontSize: 35,
              width: "50%",
              borderWidth: 2,
              paddingHorizontal: 5,
              borderRadius: 10,
            }}
            keyboardType="numeric"
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <Text style={{ fontSize: 35 }}>{`Total ${total}`} </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 2,
          width: "90%",
          height: "65%",
          alignItems: "center",
          padding: 10,
        }}
      >
        <FlatList
          contentContainerStyle={{
            gap: 20,
          }}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          renderItem={({ item }) => (
            <ItemList
              item={item}
              number={item.number}
              plus={plus}
              remove={remove}
              addItemAfterSelected={addItemAfterSelected}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
