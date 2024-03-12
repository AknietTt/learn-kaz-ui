import React, { useState } from 'react';
import { View } from 'react-native';
import { dictionary, removeWordFromDictionary } from '../static/dictionary';
import { Text, Button } from '@ui-kitten/components';

function DictionaryPage() {
  const [dictionaryList, setDictionaryList] = useState(dictionary);

  const handleRemoveWord = (kk) => {
    removeWordFromDictionary(kk);
    setDictionaryList(dictionary.filter((item) => item.kk !== kk));
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Сөздік
      </Text>
      <View style={{ marginLeft: 20 }}>
        {dictionaryList.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>{item.kk}:</Text>
            <Text style={{ fontSize: 20, flex: 1 }}>{item.ru}</Text>
            <Button
              onPress={() => handleRemoveWord(item.kk)}
              appearance="outline"
              status="danger"
              size="small"
              style={{marginRight:10}}
            >
              Өшіру
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
}

export default DictionaryPage;
