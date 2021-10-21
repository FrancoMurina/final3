import React from 'react';
import { StyleSheet} from 'react-native';
import Menu from './src/Screen/Menu';


export default function App() {
  
  return (
    <Menu/>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
