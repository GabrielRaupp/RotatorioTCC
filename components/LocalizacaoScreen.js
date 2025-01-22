import React from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';



export default function LocalizacaoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/maps.png')} style={{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
});
