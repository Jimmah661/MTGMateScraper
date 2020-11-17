import {DefaultTheme} from 'react-native-paper';

export const themes = {
  default: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
      accent: 'grey',
    },
  },
  goku: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#F85B1A',
      accent: '#000000',
    },
  },
};
