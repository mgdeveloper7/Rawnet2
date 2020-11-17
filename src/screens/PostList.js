import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  Dimensions,
  FlatList
} from 'react-native';

import ActivityIndicatorView from '../components/ActivityIndicatorView.js'
import COLOURS from '../constants/colours.js'
import flatListStyles from '../styles/flatListStyles'

const screenWidth = Dimensions.get("window").width;

export default class PostListScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  static navigationOptions = ({ navigation}) => ({
    title: 'Post List',
    headerStyle: {
        backgroundColor: COLOURS.headerColour,
    },    
    headerTintColor: COLOURS.whiteColour,    
    headerTitle: 'Post List',
  });

  componentDidMount(){

    this.getData()
  }

  // API

  getData = async () => {

    let _postsData = await this.getAPIData('https://rawnet-react-native-test.glitch.me/posts.json')
    let _usersData = await this.getAPIData('https://rawnet-react-native-test.glitch.me/users.json')
    let _commentsData = await this.getAPIData('https://rawnet-react-native-test.glitch.me/comments.json')

    this.setState({
      postsData: _postsData,
      usersData: _usersData,
      commentsData: _commentsData,
      isLoading: false
    })

  }

  getAPIData = async (url) => {
    try {
      let response = await fetch(url);
      let responseJSON = await response.json();
      return responseJSON;

    } catch (error) {
      console.error(error);
    }
  }

  // Comment and user filtering

  getCommentsForSelectedPost(postID) {

    var _commentsArray = []
    console.log("Getting comments for post " + postID)
    for (var comment of this.state.commentsData) {

      if (comment.postId == postID) {
        _commentsArray.push(comment)
      }
    }
    return _commentsArray
  }

  getAuthorOfSelectedPost(userID) {

    var _username = ''
    console.log("Getting author of post.  UserID - " + userID)
    for (var user of this.state.usersData) {

      if (user.id == userID) {
        _username = user.name

        return _username
      }
    }

    return ""
  }

  navigateToPostDetailsScreen(post) {

    let _comments = this.getCommentsForSelectedPost(post.id)
    let _author = this.getAuthorOfSelectedPost(post.userId)

    this.props.navigation.navigate('PostDetailsScreen', {
      post: post,
      commentsForPost: _comments,
      authorOfPost: _author
    })
  }

  // FlatList functions
  flatListItem = ({ item, index }) => {

    var rowMod = ( index %  2)
    var rowBackgroundColour = COLOURS.postListFlatListBackground1
    if (rowMod == 0) {
      rowBackgroundColour = COLOURS.postListFlatListBackground2
    }
    return (
       <TouchableOpacity 
          style={[flatListStyles.flatListContainer, { flexDirection: 'row', backgroundColor: rowBackgroundColour, width: screenWidth-40, height: 40 }]}
          onPress={() => { 
              this.navigateToPostDetailsScreen(item)
          }}    
        >
         <View style={ [flatListStyles.flatListRow, {flex: 0.1}] }>
            <Text style={flatListStyles.flatListText}>{item.id}</Text> 
         </View>
         <View style={ [flatListStyles.flatListRow, {flex: 0.9}] }>
            <Text style={[flatListStyles.flatListText, {textAlign: 'left'}]}>{item.title}</Text> 
         </View>
      </TouchableOpacity>
    )
  }

  ////////////////////////

  render() {
    
    if (!this.state.isLoading) {
      return (

    <View style={styles.backgroundContainer}>

        <StatusBar barStyle="light-content" />

        <View style={styles.postsViewTop}>
            <Text style={styles.headerTitleText}>List of Posts</Text>
        </View>

        <View style={styles.postsViewMiddle}>
          <FlatList
            autoscrollThreshold={10}
            data={this.state.postsData}
            renderItem={this.flatListItem}
            keyExtractor={item => item.id}
          />
        </View>

        <View style={styles.postsViewBottom}>

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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOURS.postListBackgroundColour,
  },

  headerTitleText: {
    color: COLOURS.postListTitleColour,
    fontSize: 22,
    fontWeight: 'bold'
  },

  postsViewTop: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  postsViewMiddle: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center'
  },

  postsViewBottom: {
    flex: 0.05,
    alignItems: 'center',
    justifyContent: 'center'
  },

});
