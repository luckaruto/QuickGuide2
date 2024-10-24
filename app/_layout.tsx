import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import React from "react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
