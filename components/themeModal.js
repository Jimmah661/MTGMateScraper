import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Button} from 'react-native-paper';

const ThemeModal = ({hideModal, themes, setSelectedTheme}) => {
  return (
    <>
      {Object.keys(themes).map((item, index) => {
        return (
          <Button
            style={{marginBottom: 10}}
            mode="contained"
            key={item}
            onPress={async () => {
              setSelectedTheme(themes[item]);
              await AsyncStorage.setItem('MtGMS_selectedTheme', item);
            }}>
            {item}
          </Button>
        );
      })}
      <Button onPress={hideModal}>Close Modal</Button>
    </>
  );
};

export default ThemeModal;
