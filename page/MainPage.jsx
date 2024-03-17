import { Button, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  Card,
  List,
  ListItem,
  Text as KittenText,
  Divider,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { getAllBooks } from "../static/requests";

function MainPage() {
  const navigation = useNavigation();
  const [books, setBooks] = useState();
  const renderBookItem = ({ item }) => {
    const handleReadPress = () => {
      navigation.navigate("Read", { book: item });
    };


    return (
      <Card
        style={{
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 15,
          marginTop: 15,
          borderRadius:20
        }}
      >
        <Image
          style={{ height: 300, width: "auto" , resizeMode: "contain" }}
          source={{ uri: item.photo }}
        />
        <View style={{ padding: 10 }}>
          <KittenText category="h6">{item.name}</KittenText>
        </View>
        <Button style={{borderRadius:20}} onPress={handleReadPress}>
          <Text>Оқу</Text>
        </Button>
      </Card>
    );
  };

  useEffect(()=>{
    console.log("useEffect");
    const fetchData = async () => {
      try {
        const response = await getAllBooks();
        setBooks(response);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  },[])

  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <KittenText
            style={{ padding: 15, backgroundColor: "white", fontSize: 20 }}
          >
            Ертегілер
          </KittenText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Nav")}>
          <KittenText
            style={{ padding: 15, backgroundColor: "white", fontSize: 20 }}
          >
            Тест
          </KittenText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Dictionary")}>
          <KittenText
            style={{ padding: 15, backgroundColor: "white", fontSize: 20 }}
          >
            Сөздік
          </KittenText>
        </TouchableOpacity>
      </View>
      <List
        data={books}
        renderItem={renderBookItem}
        ItemSeparatorComponent={Divider}
        style={{ marginBottom: 100 }}
      />
    </View>
  );
}

export default MainPage;
