import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { PickerItem } from './src/Components/Picker/Picker';
import { api } from './src/api/urlApi';
import { reporter } from './metro.config';

export default function App(){

  const [loading, setLoading] = useState(true);
  const [moedas, setMoedas] = useState([]);
  const [moedaSelecionada, setMoedaSelecionada] = useState(null);

  const [moedaBValor, setMoedaBValor] = useState('')
  const [valorMoeda, setValorMoeda] = useState(null)
  const [valorConvertido, setValorConvertido] = useState(0)


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

      setMoedas(arrayMoedas);
      setMoedaSelecionada(arrayMoedas[0].key);
      setLoading(false);
    }

    loadMoedas();
  }, []);

  async function converter(){
    if(moedaBValor === 0 || moedaBValor === '' || moedaBValor === null){
      return;
    }
    const response = await api.get(`/all/${moedaSelecionada}-BRL`);
    console.log(response.data[moedaSelecionada].ask);

    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
    setValorConvertido(`${resultado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`);
    setValorMoeda(moedaBValor);
    Keyboard.dismiss()
  }

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
            <TextInput placeholder="Digite o Valor!" keyboardType="numeric" value={moedaBValor} onChangeText={(valor)=> setMoedaBValor(valor)} style={styles.input}/>
          </View>
        </View>
        <TouchableOpacity style={styles.areaBotao} onPress={converter}>
          <Text style={styles.textoBotao}>Converter</Text>
        </TouchableOpacity>
        {/* se o valor estiver com algo */}
        {valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
          <Text style={styles.valorConvertido}>
            {valorMoeda} {moedaSelecionada}
          </Text>
          <Text style={styles.valorConvertido}>
            Corresponde a:
          </Text>
          <Text style={styles.valorConvertido}>
            {valorConvertido}
          </Text>
        </View>
        )}
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
  areaResultado: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  valorConvertido: {
   fontSize: 28,
   color: '#000',
   fontWeight: 'bold'
  },
});
