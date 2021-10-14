import React, { useEffect, useState } from 'react';
import { Button, TextInput, Pressable, Modal, SafeAreaView, StyleSheet, ActivityIndicator, FlatList, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState("");
  const [text1, onChangeText1] = React.useState("");

  var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };
  var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};

  const getMovies = async () => {
     try {
      const response = await fetch('http://192.168.1.102/mahasiswa/api/read.php');
      const json = await response.json();
      setData(json.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ flex: 1, padding: 24 }}>
      <Text style={styles.title}>Data Mahasiswa</Text>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text style={styles.data}>
              Nama : {item.nama}
              {'\n'}
              Alamat : {item.alamat}
              {'\n'}
              Jurusan : {item.jurusan}
              {'\n'}
              NIM : {item.nim}
              {'\n'}
              No. HP : {item.telp}
              </Text>
            )}
          />
        )}
      </View>
      <View>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
          <View style={[styles.centeredView, modalBackgroundStyle]}>
            <View style={styles.modalView}>
            <Text style={styles.titleModal}>Masukan data mahasiswa</Text>
              <TextInput
                style={styles.input}
                onChangeText1={onChangeText1}
                value={text}
                placeholder="Nama"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Alamat"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="NIM"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Jurusan"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="No. HP"
              />
              <View style={styles.fixToText}>
                <Button
                  title="Batal"
                  color="red"
                  onPress={() => setModalVisible(false)}
                />
                <Button
                  title="Simpan"
                  onPress={() => Alert.alert('Right button pressed')}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <FAB
          style={styles.fab}
          medium
          icon="plus"
          color="white"
          onPress={() => setModalVisible(true)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create ({
safeAreaView: {
  height: 600
},
title: {
  fontSize: 24,
  textAlign: "center",
  margin: 32
},
data: {
  margin: 8
},
fab: {
  position: 'absolute',
  marginRight: 30,
  right: 0,
  bottom: 0,
  },
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  titleModal: {
    fontSize:20
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    width:250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fixToText: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
