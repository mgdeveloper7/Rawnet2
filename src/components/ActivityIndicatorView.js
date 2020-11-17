import React, {Component} from 'react';
import { View, ActivityIndicator, StyleSheet} from 'react-native';
import COLOURS from '../constants/colours.js';

class ActivityIndicatorView extends Component{

  // State
  constructor(props) {
    super(props);
    console.log("ActivityIndicatorView constructor")

    const { navigation } = this.props;
    var backgroundColour = '' 
    var activityIndicatorColour = ''

    if (this.props.backgroundColour) {
      backgroundColour = this.props.backgroundColour
    }

    if (this.props.activityIndicatorColour) {
      activityIndicatorColour = this.props.activityIndicatorColour
    }
  }

  // TODO:  Pass in colours as props
    render() {
      return (
        <View style={ [styles.container, {backgroundColor: COLOURS.activityIndicatorViewBackgroundColour}]}>
          <View style={styles.activityIndicatorContainer}> 
            <ActivityIndicator size="large" color={COLOURS.activityIndicatorColour} />
          </View>
        </View>
      )
    };
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLOURS.blackColour,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  activityIndicatorContainer: {
      flex: 1,
      justifyContent: 'center'
  },

})


export default ActivityIndicatorView;
