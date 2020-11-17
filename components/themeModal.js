import React from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-paper';

const ThemeModal = ({hideModal, themes}) => {
  return (
    <>
      {Object.keys(themes).map((item, index) => {
        return <Button style={{marginBottom: 10}} mode='contained' key={item}>{item}</Button>;
      })}
      <Button onPress={hideModal}>Close Modal</Button>
    </>
  );
};

export default ThemeModal;
