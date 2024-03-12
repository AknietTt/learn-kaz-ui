import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

export default function TestPageNavigate() {
    const navigation = useNavigation();
 
  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "#004AAD",
          fontWeight: "bold",
          marginTop: 20,
          fontSize: 20,
        }}
      >
        Сөздерді жаттайық (Учим слова)
      </Text>
      <View style={{ marginTop: 20 }}>
        <Button
          style={{
            width: 300,
            height: 70,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 15,
          }}
          appearance="outline"
          onPress={()=>{navigation.navigate("First")}}
        >
          Приветствие-Cәлемдесу
        </Button>
        <Button
          style={{
            width: 300,
            height: 70,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 15,
          }}
          appearance="outline"
          onPress={()=>{navigation.navigate("Second")}}
        >
          Животные-Жануарлар
        </Button>
        <Button
          style={{
            width: 300,
            height: 70,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 15,
          }}
          appearance="outline"
          onPress={()=>{navigation.navigate("Third")}}
        >
          {"     Овощи-фрукты \nКөкөністер-жемістер"}
        </Button>
        <Button
          style={{
            width: 300,
            height: 70,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 15,
          }}
          appearance="outline"
          onPress={()=>{navigation.navigate("Fourth")}}

        >
          {"Грамматика"}
        </Button>
      </View>
    </View>
  );
}
