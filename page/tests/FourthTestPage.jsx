import React, { useState } from 'react';
import { View, TextInput, Text, Alert } from 'react-native';
import { grammerList } from '../../static/constants';
import { Button } from '@ui-kitten/components';

function FourthTestPage() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [randomIndex, setRandomIndex] = useState(null);
  const [record , setRecord] = useState(0);
  const getRandomText = () => {
    const index = Math.floor(Math.random() * grammerList.length);
    setRandomIndex(index);
    setInputText('');
    setResult('');
  };

  const checkGrammar = () => {
    const userInput = inputText.trim().toLowerCase();
    const correctTranslation = grammerList[randomIndex].translation.trim().toLowerCase();
    
    if (userInput === correctTranslation) {
      Alert.alert("Дұрыс! Правильно!", "", [{ text: "OK" }]);
      setRecord(record+1);
      getRandomText(); // Вызываем функцию для получения нового текста
    } else {
      setRecord(0)
      setResult('Қате / Неправильно');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{fontSize:20}}>Рекорд {record}</Text>
      <Button onPress={getRandomText}  appearance='ghost' style={{fontSize:20}} ><Text style={{fontSize:20}}>Случайный текст / Кездейсоқ мәтін</Text></Button>
      {randomIndex !== null && (
        <View style={{ marginTop: 10, fontSize:25 }}>
          <Text style={{fontWeight:"600"}}>{"-" + grammerList[randomIndex].text}</Text>
        </View>
      )}
      <Text style={{ marginBottom: 10, marginTop: 10, fontSize:20 }}>Введите перевод / Аудармасын жазыныз:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 , borderRadius:20 }}
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
      <Button onPress={checkGrammar} style={{ borderRadius:20}}>Проверить / Тексеру</Button>
      {result ? <Text style={{ marginTop: 10, color:"red" , fontWeight:"600" }}>{result}</Text> : null}
    </View>
  );
}

export default FourthTestPage;
