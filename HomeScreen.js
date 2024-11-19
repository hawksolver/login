import React from 'react';
import { View, Text } from 'react-native';


export default function HomeScreen({route}) {
 const {dados} = route.params;

 console.log(dados);

  return (
    <View>
      <Text>Bem-vindo, {dados.data.usuario.nome}!</Text>
      <Text>Email: {dados.data.usuario.email} </Text>
    </View>
  );
}
