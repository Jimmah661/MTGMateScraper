import React, {useState} from 'react';
import {View, Text, Button, TextInput, ScrollView} from 'react-native';
const cheerio = require('cheerio-without-node-native');

function DisplayCards({cardlist}) {
  if (cardlist.length === 0) {
    return <Text>No cards to display</Text>;
  } else {
    return (
      <ScrollView>
        {cardlist.map((item, index) => {
          return (
            <View style={{flexDirection: 'row', marginVertical: 5}} key={index}>
              <Text>{item.name} </Text>
              <Text>{item.set} </Text>
              <Text>{item.price} </Text>
              <Text>Avail: {item.quantity}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const App = () => {
  const [cards, setCards] = useState([]);
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
    <View>
      <TextInput
        value={searchCard}
        onChange={e => setSearchCard(e.nativeEvent.text)}
      />
      <Button
        title="Press Me"
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

export default App;
