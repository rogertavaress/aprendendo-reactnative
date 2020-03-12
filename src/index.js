import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text2: {
    fontSize: 18,
    color: '#aaa',
  },
});

console.tron.log('Olá Mundo!!');

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Olá Mundo!</Text>
      <Text style={styles.text2}>Meu primeiro App react-native.</Text>
    </View>
  );
}

export default App;
