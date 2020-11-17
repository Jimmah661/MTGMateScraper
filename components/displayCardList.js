import React from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';

const DisplayCardList = ({cardlist}) => {
  if (cardlist.length === 0) {
    return (
      <Text style={{alignSelf: 'center', marginTop: 10}}>No Cards found</Text>
    );
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
};

const styles = StyleSheet.create({
  cardScroll: {
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
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayCardList;
