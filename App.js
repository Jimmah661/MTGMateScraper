import React, {useState} from 'react';
import {AppState, Text, View} from 'react-native';
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

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes.goku);

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
      const uri = encodeURI(searchUrl);
      const response = await fetch(uri);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const cardsOutput = $('.magic-card');
      let i;
      let newCard = [];
      // The for loop condition is a little messed up because there are 2 tables of data that are actually generated in the HTML
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
        <Text>{AppState.currentState}</Text>
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
