import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, StatusBar, Alert, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import api from './src/services/api';

import Picker from './src/components/Picker';

export default function App() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(() => {
    async function loadMoedas(){
      const response = await api.get('all');

      let arrayMoedas = []
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        });

      });

      
      setMoedas(arrayMoedas);
      setLoading(false);
    }

    loadMoedas();
  }, []);







  async function converter(){
    if(moedaSelecionada === null && moedaBValor === 0){
      Alert.alert('Aviso', 'Por favor, escolha uma moeda!');
     
    }else{
      const response = await api.get(`all/${moedaSelecionada}-BRL`)
    // console.log(response.data[moedaSelecionada].ask);

    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
    setValorConvertido(`R$ ${resultado.toFixed(3)}`);
    setValorMoeda(moedaBValor);
    Keyboard.dismiss();
    }
   
  
  }

  

  if(loading){
    return(
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#222'
      }}>
        <ActivityIndicator color="#fff" size={45} />
      </View>
    );
  }else{
    return (
      <KeyboardAvoidingView style={styles.container}>
       <StatusBar barStyle={'light-content'} backgroundColor="#000" />
       
       <View style={styles.areaMoeda}>
         <Text style={styles.titulo}>Escolha uma moeda</Text>
         <Picker moedas={moedas} onChange={(moeda) => setMoedaSelecionada(moeda)}  />
       </View>
   
       <View style={styles.areaValor}>
         <Text style={styles.titulo}>Digite um valor</Text>
         <TextInput 
         placeholder='EX: 150'
         style={styles.input}
         maxLength={100}
         keyboardType='numeric'
         onChangeText={(valor) => setMoedaBValor(valor)}
         />
       </View>
   
       <TouchableOpacity
         activeOpacity={0.8}
         style={styles.botao}
         onPress={converter}
         >
         <Text style={styles.textoBotao}>Converter</Text>
       </TouchableOpacity>

        {valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>{valorMoeda} {moedaSelecionada} = {valorConvertido}</Text>
          </View>
        )}
       
       
   
      </KeyboardAvoidingView>
     );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222',
    paddingTop: 40,
  },
  titulo: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 15,
    textAlign: 'center'
  },
  areaMoeda: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingTop: 10,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  areaValor: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    marginTop: 1,
    paddingBottom: 30,
    paddingTop: 10,
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    width: '90%',
    marginTop: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 17,
  },
  botao: {
    backgroundColor: '#004BFF',
    padding: 15,
    width: '90%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  areaResultado: {
    width: '90%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  valorConvertido: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#004BFF',
  }
});