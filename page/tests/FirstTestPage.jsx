import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { getAllCompare } from "../../static/requests";
import { Button, Text } from "@ui-kitten/components";
import { Alert } from "react-native";

function FirstTestPage() {
  const [words, setWords] = useState([]);
  const kzWordRef = useRef();
  const rusWordRef = useRef();
  const [isStart, setIsStart] = useState(false);
  const [isKzButtonClicked, setIsKzButtonClicked] = useState(Array(words.length).fill(false));
  const [isRuButtonClicked, setIsRuButtonClicked] = useState(Array(words.length).fill(false));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCompare();
        setWords(response);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    fetchData();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  
  const shuffledRussianWords = shuffleArray(
    words.map((item) => item.compareRu)
  );

  
  if (!isStart) {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#214CDF" }}>
            Найди пару - Жұпты табыңыз
          </Text>
          {words.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 300,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: 20,
                    marginTop: 10,
                  }}
                >
                  {item.text}
                </Text>
                <Text style={{ marginTop: 10 }}> - </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "left",
                    fontSize: 20,
                    marginTop: 10,
                  }}
                >
                  {item.compareRu}
                </Text>
              </View>
            );
          })}
          <Button
            style={{ marginTop: 50, width: 250, height: 50, borderRadius: 20 , fontSize:20 }}
            onPress={() => setIsStart(true)}
          >
            Ойнау
          </Button>
        </View>
      </>
    );
  }

  const handleSetKzWord = (word) => {
    for (let index = 0; index < words.length; index++) {
      
      const element = words[index];
      if (element.text === word) {
        kzWordRef.current = element;
      }
    }
  };

  const handleSetRuWord = (word) => {
    rusWordRef.current = word;
    if (kzWordRef.current.compareRu === word) {
      Alert.alert("Дұрыс! Правильно!", "", [{ text: "OK" }]);
      rusWordRef.current = "";
      kzWordRef.current = "";
      return;
    }
    rusWordRef.current = "";
    kzWordRef.current = "";
    Alert.alert("Қате! Ошибка!", "", [{ text: "OK" }]);
  };

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              margin: 20,
              color: "#214CDF",
            }}
          >
            Найди пару - Жұпты табыңыз
          </Text>

          {words.map((item, index) => {
            const russianWord = shuffledRussianWords[index];
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 5,
                  width: "90%",
                }}
              >
                <Button
                  style={{ flex: 1, marginRight: 5 }}
                  appearance="outline"
                  onPress={() => {
                    handleSetKzWord(item.text);
                  }}
                >
                  {item.text}
                </Button>
                <Button
                  style={{ flex: 1, marginLeft: 5 }}
                  appearance="outline"
                  onPress={() => {
                    handleSetRuWord(russianWord);
                  }}
                >
                  {russianWord}
                </Button>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
}

export default FirstTestPage;
