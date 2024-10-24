import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import React from "react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        {/* Define both index and index2 in the same Stack */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index2"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
