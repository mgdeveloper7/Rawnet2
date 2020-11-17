var React = require('react-native');
var { StyleSheet } = React;

import COLOURS from '../constants/colours';

const rowHeight =  18

module.exports = StyleSheet.create({

  flatListContainer: { 
    flexDirection: 'row',
    height: rowHeight,
    backgroundColor: COLOURS.whiteColor 
  },

  flatListRow: {
    justifyContent: 'center'
  },

  flatListTitleText: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 15, 
    color: COLOURS.legendTitleText,
    textAlign: 'center',
  },

  flatListText: {
    width: '100%',
    fontWeight: '400',
    fontSize: 14, 
    color: COLOURS.flatListTextColour,
    textAlign: 'center',
  },

});