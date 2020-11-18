import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  Button,
  TextInput,
  Provider as PaperProvider,
  Modal,
  Portal,
} from 'react-native-paper';
import DisplayCardList from './components/displayCardList';
import Header from './components/header';
import ThemeModal from './components/themeModal';
const cheerio = require('react-native-cheerio');
import {themes} from './utilities/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // Theme is defaulted to default
  const [selectedTheme, setSelectedTheme] = useState(themes.default);

  // This useEffect function will set the app theme on load
  useEffect(() => {
    async function setThemeOnLoad() {
      // Running an storage check to see if the app has been loaded before and what the chosen theme is
      const values = await AsyncStorage.multiGet([
        'MtGMS_loadedOnce', // ['MtGMS_loadedOnce', 'true']
        'MtGMS_selectedTheme', // ['MtGMS_selectedTheme', `${themeName}`]
      ]);
      values[0][1] // 'true' or null
        ? setSelectedTheme(themes[values[1][1]]) // if it returns a value then set the theme
        : await AsyncStorage.multiSet([
            // if it does not return a value then set the theme to the default
            ['MtGMS_loadedOnce', 'true'],
            ['MtGMS_selectedTheme', 'default'],
          ]);
    }
    setThemeOnLoad();
  }, []);

  // This is the state for the list of cards to display
  // When the app is loaded it is originally blank, searching a card name will fill it
  const [cards, setCards] = useState([]);

  // Card to be searched when executing ffetchCards function
  const [searchCard, setSearchCard] = useState('');

  // Modal Management occurs here
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // Function makes a fetch for the MTGMate url adding the card name
  // Once it has the info it pipes it into cheerio to extract the information about the cards returned
  async function fetchCards(card) {
    if (card) {
      const searchUrl =
        'https://www.mtgmate.com.au/cards/search?utf8=%E2%9C%93&q=' +
        card +
        '&button=';
      // Turn the provided string into a proper URL, replacing spaces and such
      const uri = encodeURI(searchUrl);
      // Fetch the data from the URL
      const response = await fetch(uri);
      //Extract the webpage into a string
      const htmlString = await response.text();
      // Pass the string into cheerio to work on
      const $ = cheerio.load(htmlString);
      // Extract the items with class .magic-card into an array
      const cardsOutput = $('.magic-card');
      let i;
      let newCard = [];
      // The for loop condition is a little messed up because there are 2 tables of data that are actually generated in the MTGMate HTML
      // By starting at halfway through the length we skip the first table that seems to have dodgy data in it anyway
      for (i = cardsOutput.length / 2; i < cardsOutput.length; i++) {
        newCard.push({
          name: cardsOutput[i].children[3].children[1].children[0].data,
          set: cardsOutput[i].children[5].children[1].children[0].data,
          price: cardsOutput[i].children[7].children[0].data.trim(),
          quantity: cardsOutput[i].children[9].children[0].data.trim(),
        });
      }
      setCards(newCard);
    } else {
      setCards([]);
    }
  }

  return (
    <PaperProvider theme={selectedTheme}>
      <View style={{padding: 5, flex: 1}}>
        <Portal>
          <Modal
            visible={visible}
            contentContainerStyle={{backgroundColor: 'white', padding: 20}}
            dismissable={false}>
            <ThemeModal
              hideModal={hideModal}
              themes={themes}
              setSelectedTheme={setSelectedTheme}
            />
          </Modal>
        </Portal>
        <Header showModal={showModal} />
        <TextInput
          mode="outlined"
          label="Card"
          value={searchCard}
          onChange={e => setSearchCard(e.nativeEvent.text)}
        />
        <Button
          mode="contained"
          style={{marginTop: 5}}
          onPress={() => {
            // On Press it does a search, if there is a card in the input field then it searches for that
            // If the input field is empty then it searches based off of the default search (Which is Fblthp cause I think he's cute)
            searchCard ? fetchCards(searchCard) : fetchCards();
          }}>
          Search Cards
        </Button>
        <DisplayCardList cardlist={cards} />
      </View>
    </PaperProvider>
  );
};

export default App;
