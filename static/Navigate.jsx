import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "../page/MainPage";
import ReadPage from "../page/ReadPage";

import DictionaryPage from "../page/DictionaryPage";
import TestPageNavigate from "../page/TestPageNavigate";
import FirstTestPage from "../page/tests/FirstTestPage";
import SecondTestPage from "../page/tests/SecondTestPage";
import ThirdTestPage from "../page/tests/ThirdTestPage";
import FourthTestPage from "../page/tests/FourthTestPage";

export default function Navigate() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{ title: "" }}
        />

        <Stack.Screen
          name="Read"
          component={ReadPage}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Dictionary"
          component={DictionaryPage}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Nav"
          component={TestPageNavigate}
          options={{ title: "" }}
        />

        {/* //// Tests /////*/}
        <Stack.Screen
          name="First"
          component={FirstTestPage}
          options={{ title: "" }}
        />

        <Stack.Screen
          name="Second"
          component={SecondTestPage}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Third"
          component={ThirdTestPage}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Fourth"
          component={FourthTestPage}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
