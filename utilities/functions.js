import AsyncStorage from '@react-native-async-storage/async-storage';
import {themes} from './themes';

export const setThemeOnLoad = async setSelectedTheme => {
  // const values = await AsyncStorage.multiGet('MtGMS_loadedOnce', 'MtGMS_selectedTheme');
  const loadedOnce = await AsyncStorage.getItem('MtGMS_loadedOnce');
  const selectedTheme = await AsyncStorage.getItem('MtGMS_selectedTheme');
  if (loadedOnce === null) {
    // await AsyncStorage.setItem('MtGMS_loadedOnce', 'true');
    await AsyncStorage.multiSet([
      ['MtGMS_loadedOnce', 'true'],
      ['MtGMS_selectedTheme', 'default'],
    ]);
    console.log('MtGMS_loadedOnce set to TRUE');
    setSelectedTheme(themes.default);
    console.log('Theme set to Default');
  } else {
    setSelectedTheme(themes[selectedTheme]);
    console.log(`Theme set to ${selectedTheme}`);
  }
};
