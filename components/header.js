import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Title} from 'react-native-paper';

const Header = ({showModal}) => {
  return (
    <View style={styles.headerHolder}>
      <Title>MTGMate Price scraper</Title>
      {/* <Text syle={styles.headText}>MTGMate Price scraper</Text> */}
      <IconButton icon="cog" onPress={showModal} />
    </View>
  )
};

const styles = StyleSheet.create({
  headerHolder: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default Header;
