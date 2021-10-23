import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Modal } from 'react-native';
import { FAB } from 'react-native-paper';

class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        nama:'',
        alamat:'',
        listData:[],
        idEdit:null
      };
      this.url = "http://192.168.1.102/mahasiswa/api/read.php";
    }
    componentDidMount(){
      this.ambilListData();
    }
    async ambilListData(){
      await fetch(this.url)
      .then((response)=>response.json())
      .then((json)=>{
        console.log('Hasil yang didapat: '+JSON.stringify(json.data.result));
        this.setState({listData:json.data.result});
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  

    render(){
      return(
        <SafeAreaView style={styles.saveAreaView}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              <Text style={styles.font}>Data Mahasiswa</Text>
              {
                this.state.listData.map((val,index)=>
                <View style={styles.data} key={index}>
                  <Text>Nama : {val.nama}</Text>
                  <Text>Alamat : {val.alamat}</Text>
                  <Text>NIM : {val.nim}</Text>
                  <Text>Jurusan : {val.jurusan}</Text>
                  <Text>No. HP : {val.telp}</Text>
                </View>)
              }
            </View>
          </ScrollView>
          <View>
            <FAB
              style={styles.fab}
              medium
              icon="plus"
              color="white"
              onPress={() => console.log('Pressed')}
            />
          </View>
        </SafeAreaView>
      )
    }
  }
  
const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  saveAreaView: {
    height: 600
  },
  scrollView: {
  },
  
  font: {
    textAlign: 'center',
    fontSize: 32
  },
  data: {
    marginTop: 20
  },
  fab: {
    position: 'absolute',
    marginRight: 30,
    right: 0,
    bottom: 0,
  }
});

export default App;

