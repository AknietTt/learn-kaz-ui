import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Card, Radio } from "@ui-kitten/components";
import { getTest, getTestImage } from "../../static/requests";
import { Image } from "react-native-elements";

function ThirdTestPage() {
  const [testData, setTestData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTestImage();
        setTestData(response);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAnswerSelect = (questionId, answerId, isCorrect) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionId] = { answerId, isCorrect };
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((answer) => {
      if (answer && answer.isCorrect) {
        score++;
      }
    });
    return score;
  };

  const areAllRadioButtonsSelected = () => {
    return selectedAnswers.length === testData.length &&
           selectedAnswers.every(answer => answer !== undefined);
  };

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
           <Text style={{fontSize:20 , fontWeight: "bold", color:"#214CDF" }}>   {"Овощи-фрукты \nКөкөністер-жемістер"}</Text>
           <View  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 300}}>
          <Text
          style={{ flex: 1, textAlign: "right", fontSize: 15, marginTop: 10 }}
        >
          {`
Алма
Алмұрт
Жүзім
Шабдалы
Өрік
Банан
Қарбыз
Қауын
Қызанақ
Орамжапырақ
Пияз
Қияр
Картоп
Сәбіз
Сарымсақ
`}
        </Text>
        <Text style={{ flex: 1, fontSize: 15, marginTop: 10 }}>
            {`
 - Яблоко
 - Груша
 - Виноград
 - Персик
 - Абрикос
 - Банан
 - Арбуз
 - Дыня
 - Помидор
 - Капуста
 - Лук
 - Огурец
 - Картошка
 - Морковь
 - Чеснок
    `}
          </Text>
        </View>
        <Button style={{marginTop:50 , width:250 , height:50 , borderRadius:20}} onPress={() => setIsStart(true)}>Ойнау</Button>

        </View>
      </>
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 16 }}>
        {testData.map((question, index) => (
          <Card
            key={question.id}
            style={{ marginBottom: 16, borderRadius: 20  , backgroundColor:selectedAnswers[index]?.isCorrect ? "#B6EAB9 " : "white"}}
          >
            <Text style={{fontSize:20, fontWeight:"500" , margin:20}}>Бұл не? Что это?</Text>
            <Image
          style={{ height: 300, width: "auto" }}
          source={{ uri: question.image }}
        />
            {question.answers.map((answer) => (
              <Radio
                key={answer.id}
                style={{
                  marginTop: 8,
                  backgroundColor: "#E6EBF1",
                  borderRadius: 20,
                  height:30
                }}
                checked={selectedAnswers[index]?.answerId === answer.id}
                onChange={() =>
                  handleAnswerSelect(index, answer.id, answer.isCorrect)
                }
              >
                 <Text style={{ fontSize: 18 }}>{answer.text}</Text>
              </Radio>
            ))}
          </Card>
        ))}
        <Button
          style={{
            marginTop: 16,
            marginBottom: 50,
            borderRadius: 20,
            backgroundColor: areAllRadioButtonsSelected() ? "#214CDF" : "#ccc",
          }}
          onPress={() => setShowResults(true)}
          disabled={!areAllRadioButtonsSelected()}
        >
          Тексеру / Проверить
        </Button>
        {showResults && (
          <View>
            {testData.map((question, index) => (
              <Card
                key={question.id}
                style={{
                  marginBottom: 16,
                  borderRadius: 20,
                  borderColor: selectedAnswers[index]?.isCorrect ? "#4CAF50" : "#F44336",
                  borderWidth: 2,
                }}
              >
                <Image
          style={{ height: 100, width: 100 }}
          source={{ uri: question.image }}
        />
                {question.answers.map((answer) => (
                  <Text
                    key={answer.id}
                    style={{
                      color: selectedAnswers[index]?.isCorrect ? "#4CAF50" : "#F44336",
                      fontSize:20,
                    }}
                  >
                    {answer.text}
                  </Text>
                ))}
              </Card>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default ThirdTestPage;
