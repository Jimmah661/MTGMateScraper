import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
const cheerio = require('react-native-cheerio');

function DisplayCards({cardlist}) {
  if (cardlist.length === 0) {
    return <Text>Search for a card you coward</Text>;
  } else {
    return (
      <ScrollView style={styles.cardScroll} keyboardDismissMode="on-drag">
        <View style={styles.tableHeaders}>
          <Text style={{flex: 3}}>Name</Text>
          <Text style={{flex: 2}}>Set</Text>
          <Text style={{flex: 1}}>Price</Text>
          <Text style={{flex: 1}}>Avail</Text>
        </View>
        {cardlist.map((item, index) => {
          return (
            <View style={styles.tableContent} key={index}>
              <Text style={{flex: 3}}>{item.name} </Text>
              <Text style={{flex: 2}}>{item.set} </Text>
              <Text style={{flex: 1}}>{item.price} </Text>
              <Text style={{flex: 1}}>{item.quantity}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const App = () => {
  const [cards, setCards] = useState([
    {
      name: 'Fblthp, the Lost',
      set: 'Mystery Booster',
      price: '$1.00',
      quantity: '5',
    },
  ]);
  const [searchCard, setSearchCard] = useState('');
  async function fetchCards(card = 'fblthp') {
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
    for (i = cardsOutput.length / 2; i < cardsOutput.length; i++) {
      newCard.push({
        name: cardsOutput[i].children[3].children[1].children[0].data,
        set: cardsOutput[i].children[5].children[1].children[0].data,
        price: cardsOutput[i].children[7].children[0].data.trim(),
        quantity: cardsOutput[i].children[9].children[0].data.trim(),
      });
    }
    setCards(newCard);
  }

  return (
    <View style={{padding: 5, flex: 1}}>
      <View style={styles.headerHolder}>
        <Text syle={styles.headText}>MTGMate Price scraper</Text>
      </View>
      <TextInput
        value={searchCard}
        onChange={e => setSearchCard(e.nativeEvent.text)}
        style={styles.inputBox}
      />
      <Button
        title="Search cards"
        style={{padding: 5}}
        onPress={() => {
          // On Press it does a search, if there is a card in the input field then it searches for that
          // If the input field is empty then it searches based off of the default search (Which is Fblthp cause I think he's cute)
          searchCard ? fetchCards(searchCard) : fetchCards();
        }}
      />
      <DisplayCards cardlist={cards} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardScroll: {
    // paddingHorizontal: 5,
    marginTop: 5,
    marginBottom: 5,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'gray',
  },
  tableHeaders: {
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 5,
  },
  tableContent: {
    flexDirection: 'row',
    // marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    margin: 5,
  },
  headText: {
    fontSize: 50,
    flex: 1,
    fontWeight: 'bold',
    backgroundColor: 'green',
  },
  headerHolder: {
    alignItems: 'center',
  },
});

export default App;
