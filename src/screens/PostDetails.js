import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Dimensions,
  FlatList
} from 'react-native';

import COLOURS from '../constants/colours.js'
import flatListStyles from '../styles/flatListStyles'

const screenWidth = Dimensions.get("window").width;

export default class PostDetailsScreen extends React.Component {

  constructor(props) {
    super(props)

    // Check incomming props for post data

    const { navigation } = this.props;
    
    let _post = navigation.getParam('post');
    let _commentsForPost = navigation.getParam('commentsForPost');
    let _authorOfPost = navigation.getParam('authorOfPost');

    // console.log(_post)
    // console.log(_commentsForPost)
    // console.log(_authorOfPost)

    this.state = {
        post: _post,
        commentsForPost: _commentsForPost,
        authorOfPost: _authorOfPost,
        isLoading: false,
    }

  }

  static navigationOptions = ({ navigation}) => ({
    title: 'Post Details',
    headerStyle: {
        backgroundColor: COLOURS.headerColour,
    },    
    headerTintColor: COLOURS.whiteColour,    
    headerTitle: 'Post Details',
  });

  componentDidMount(){

  }

  // FlatList functions
  flatListItem = ({ item, index }) => {

    var rowMod = ( index %  2)
    var rowBackgroundColour = COLOURS.postListFlatListBackground1
    if (rowMod == 0) {
      rowBackgroundColour = COLOURS.postListFlatListBackground2
    }
    return (
       <View 
          style={[flatListStyles.flatListContainer, { flexDirection: 'row', backgroundColor: rowBackgroundColour, width: screenWidth-30, height: 70 }]} 
        >
         <View style={ [flatListStyles.flatListRow, {flex: 0.1}] }>
            <Text style={flatListStyles.flatListText}>{index+1}</Text> 
         </View>
         <View style={ [flatListStyles.flatListRow, {flex: 0.9}] }>
            <Text style={[flatListStyles.flatListText, {textAlign: 'left'}]}>{item.body}</Text> 
         </View>
      </View>
    )
  }

  ////////////////////////

  render() {
    
    if (!this.state.isLoading) {
      return (

        <View style={styles.backgroundContainer}>

            <StatusBar barStyle="light-content" />

            <View style={{flex: 0.15, width: '95%'}}>
                <View style={styles.titleBarSegmentView}>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.headerTitleText}>Title:</Text>
                    </View>
                    <View style={{flex: 0.8}}>
                        <Text style={styles.headerDescriptionText}>{this.state.post.title}</Text>
                    </View>
                </View>
                <View style={styles.titleBarSegmentView}>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.headerTitleText}>Author:</Text>
                    </View>
                    <View style={{flex: 0.8}}>
                        <Text style={styles.headerDescriptionText}>{this.state.authorOfPost}</Text>
                    </View>
                </View>
            </View>

            <View style={{flex: 0.28, width: '100%', alignItems: 'center', justifyContent: 'center',}}>
                <View style={styles.postBodyView}>
                    <Text style={styles.postBodyText}>{this.state.post.body}</Text>
                </View>
            </View>

            <View style={{flex: 0.07, width: '95%', alignContent: 'flex-start', justifyContent: 'center'}}>
                <Text style={styles.headerTitleText}>Comments:</Text>
            </View>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center',}}>
                <FlatList
                    autoscrollThreshold={10}
                    data={this.state.commentsForPost}
                    renderItem={this.flatListItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>

        </View>
        )
    } else {
      return (
        <ActivityIndicatorView backgroundColour={COLOURS.headerColour} activityIndicatorColour={COLOURS.whiteColor} />
       );
    }
  };
}

const styles = StyleSheet.create({

  backgroundContainer: {
    flex: 1.0, 
    backgroundColor: COLOURS.postListBackgroundColour,
    alignItems: 'center'
  },

  titleBarSegmentView: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitleText: {
    color: COLOURS.postDetailsTitleColour,
    fontSize: 19,
    fontWeight: 'bold'
  },

  headerDescriptionText: {
    color: COLOURS.whiteColour,
    fontSize: 17,
  },

  postBodyView: {
      flex: 1.0,
      width: '95%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7,
      borderColor: COLOURS.postBodyViewBorderColour,
      borderWidth: 1
  },

  postBodyText: {
    color: COLOURS.whiteColour,
    width: '95%',
    fontSize: 17,
  },
});
