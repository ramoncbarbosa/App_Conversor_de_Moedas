import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { PickerItem } from './src/Components/Picker/Picker';
import { api } from './src/api/urlApi';

export default function App(){

  const [loading, setLoading] = useState(true);
  const [moedas, seMoedas] = useState([]);
  const [moedaSelecionada, setMoedaSelecionada] = useState(null);

  useEffect(()=> {
    async function loadMoedas() {
      const response = await api.get('/all');

      let arrayMoedas = [];

      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        });
      });

      seMoedas(arrayMoedas);
      setMoedaSelecionada(arrayMoedas[0].key);
      setLoading(false);
    }

    loadMoedas();
  }, []);

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#101215'}}>
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    );
  } else {
    return(
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione Sua Moeda</Text>
          <PickerItem
            moedas={moedas}
            moedaSelecionada={moedaSelecionada}
            onChange={(moedaTrocada) => {
              setMoedaSelecionada(moedaTrocada);
            }}
          />
          <View style={styles.areaValor}>
            <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
            <TextInput placeholder="Digite o Valor!" keyboardType="numeric" style={styles.input}/>
          </View>
        </View>
        <TouchableOpacity style={styles.areaBotao} onPress={()=> {}}>
          <Text style={styles.textoBotao}>Converter</Text>
        </TouchableOpacity>
      </View>
    );
  }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    padding: 40,
    alignItems: 'center',
  },
  areaMoeda: {
    backgroundColor: '#F9F9F9',
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginBottom: 1,
  },
  titulo: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  areaValor:{
    width: '90%',
    backgroundColor: '#F9F9F9',
    paddingTop: 8,
    paddingBottom: 8,
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: 18,
    color: '#000',
  },
  areaBotao:{
    width: '90%',
    backgroundColor: '#FB4B57',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textoBotao:{
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
