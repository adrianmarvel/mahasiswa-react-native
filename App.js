import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';

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
        <View>
          {
            this.state.listData.map((val,index)=>
            <View key={index}>
              <Text>{val.nama}</Text>
            </View>)
          }
        </View>
      )
    }
  }
  
  

export default App;
/*export default App = () => {
    
  
}*/
