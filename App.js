import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import Axios from 'axios';

export default App = () => {
  var request = new XMLHttpRequest();
request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error');
  }
};

request.open('GET', 'http://192.168.1.102/mahasiswa/api/read.php');
request.send();

const renderItem = ({ item }) => (
    <Item title={item.title} />);
  return (
    <SafeAreaView>
      <FlatList
        data={request.responseText}
        keyExtractor={item => item.id}
        renderItem={({ renderItem }) => (
            <Text>{item(1)}</Text>
          )}
        
      />
    </SafeAreaView>
  );
};
