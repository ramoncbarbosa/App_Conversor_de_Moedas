import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { PickerItem } from './src/Components/Picker/Picker';
import { api } from './src/api/urlApi';

export default function App(){
  const [listaMoedas, setListaMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setListaMoedas(arrayMoedas);
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
          <PickerItem />
        </View>
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
  },
  titulo: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
