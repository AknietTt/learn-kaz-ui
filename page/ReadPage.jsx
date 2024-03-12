import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, Card, Text as KittenText, Modal } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import axios from "axios";
import { KEY, LANG, URL } from "../static/constants";
import { addWordToDictionary } from "../static/dictionary";
import WebView from "react-native-webview";

function ReadPage({ route }) {
  const { book } = route.params;
  const [tooltipText, setTooltipText] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectWord, setSelectWord] = useState("");


  const handleWordPress = async (word) => {
    const cleanedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "");

    setSelectWord(cleanedWord);
    setVisible(true);
    const request = await axios.post(
      URL + `key=${KEY}&text=${cleanedWord}&lang=${LANG}`
    );
    setTooltipText(request.data.text.join(", "));
    console.log("Pressed word:", cleanedWord);
  };


  const handleAddInDictionary = () => {
    addWordToDictionary(selectWord, tooltipText);
    setVisible(false);
  };

  const renderWords = () => {
    const words = book.text.split(/\s+/);

    return words.map((word, index) => (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => handleWordPress(word)}
      >
        <View style={styles.wordContainer}>
          <KittenText style={styles.word}>{" " + word}</KittenText>
        </View>
      </TouchableWithoutFeedback>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: book.photo }} />
      <View style={styles.content}>
        <KittenText category="h6" style={styles.title}>
          {book.name}
        </KittenText>
        <View style={{width:"100%", height:"5%"}}>
        <WebView  source={{ uri:book.audio }} />
        </View>
        <View style={styles.wordsContainer}>{renderWords()}</View>
      </View>
      <View style={{ paddingTop: 50 }}></View>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        animationType="slide"
      >
        <Card disabled={true}>
          <KittenText style={{ marginBottom: 20 }}>
            {selectWord}: {tooltipText}
          </KittenText>
          <Button style={{borderRadius:20}} onPress={() => setVisible(false)}>Закрыть/Жабу</Button>
          <Button
            onPress={() => handleAddInDictionary()}
            style={{ marginTop: 20,borderRadius:20 }}
          >
            {"Добавить в словарь\n    Cөздікке қосу"}
          </Button>
        </Card>
      </Modal>
      <View style={{margin:100}}>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    height: 200,
  },
  content: {
    margin: 20,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    marginVertical: 20,
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wordContainer: {
    margin: 5,
  },
  word: {
    fontSize: 20,
    color: "black", // Цвет слова
  },
});

export default ReadPage;
