import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();

  async function handleLogin() {
    // Verifica se o Email e a senha estão preenchidos
    if (!email.trim() || !senha.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Envia os dados para a API
      const response = await fetch('http://localhost:8080/usuario/login', {  // Altere o localhost se necessário
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      // Log para verificar a resposta da API
      console.log('Response Status:', response.status);

      if (!response.ok) {
        throw new Error('Falha ao fazer login');
      }

      const dados = await response.json();

      // Log para verificar o corpo da resposta
      console.log('Response Data:', dados);

      navigation.navigate('Home', {dados});

    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Erro ao se comunicar com o servidor!');
    }
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo(a)!</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Digite seu Email"
      />

      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={(text) => setSenha(text)}
        placeholder="Digite sua Senha"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    marginBottom: 14,
    fontSize: 20,
  },
  input: {
    width: '90%',
    height: 45,
    backgroundColor: '#5004b5',
    borderRadius: 4,
    marginBottom: 14,
    padding: 8,
    color: 'white'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#5004b5',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  naoPossuoCadastro: {
    paddingLeft: 150,
    paddingTop: 15,
  },
  title: {
    color: 'white'
  },
});
