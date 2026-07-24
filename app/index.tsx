import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Local stories pulling from my laptop storage
const initialStories = [
  { id: '1', username: 'Your Story', image: require('../assets/images/avatar1.jpg'), storyImage: require('../assets/images/story1.jpg') },
  { id: '2', username: 'abdullah_k', image: require('../assets/images/avatar2.jpg'), storyImage: require('../assets/images/story2.jpg') },
  { id: '3', username: 'umair_hussain', image: require('../assets/images/avatar3.jpg'), storyImage: require('../assets/images/story3.jpg') },
  { id: '4', username: 'ali_raza', image: require('../assets/images/avatar4.jpg'), storyImage: require('../assets/images/story4.jpg') },
  { id: '5', username: 'usman_tariq', image: require('../assets/images/avatar5.jpg'), storyImage: require('../assets/images/story5.jpg') },
  { id: '6', username: 'zain_abbas', image: require('../assets/images/avatar6.jpg'), storyImage: require('../assets/images/story6.jpg') },
  { id: '7', username: 'hamza_khan', image: require('../assets/images/avatar7.jpg'), storyImage: require('../assets/images/story7.jpg') },
  { id: '8', username: 'saad_malik', image: require('../assets/images/avatar8.jpg'), storyImage: require('../assets/images/story8.jpg') },
  { id: '9', username: 'omer_farooq', image: require('../assets/images/avatar9.jpg'), storyImage: require('../assets/images/story9.jpg') },
  { id: '10', username: 'bilal_ahmed', image: require('../assets/images/avatar10.jpg'), storyImage: require('../assets/images/story10.jpg') },
];

const posts = [
  { id: '1', username: 'abdullah_k', location: 'Lahore, Pakistan', userImage: require('../assets/images/avatar2.jpg'), postImage: require('../assets/images/post1.jpg'), baseLikes: 1245, caption: 'Badshahi Mosque view is unbeatable.', comments: 45, time: '2 hours ago' },
  { id: '2', username: 'umair_hussain', location: 'Islamabad, Pakistan', userImage: require('../assets/images/avatar3.jpg'), postImage: require('../assets/images/post2.jpg'), baseLikes: 892, caption: 'Faisal Mosque looking stunning today!', comments: 12, time: '4 hours ago' },
  { id: '3', username: 'ali_raza', location: 'Hunza Valley', userImage: require('../assets/images/avatar4.jpg'), postImage: require('../assets/images/post3.jpg'), baseLikes: 3450, caption: 'The northern areas are unmatched.', comments: 120, time: '6 hours ago' },
  { id: '4', username: 'usman_tariq', location: 'Islamabad', userImage: require('../assets/images/avatar5.jpg'), postImage: require('../assets/images/post4.jpg'), baseLikes: 540, caption: 'Pakistan Monument in all its glory.', comments: 8, time: '8 hours ago' },
  { id: '5', username: 'zain_abbas', location: 'Karachi, Sindh', userImage: require('../assets/images/avatar6.jpg'), postImage: require('../assets/images/post5.jpg'), baseLikes: 2100, caption: 'Vibrant truck art colors.', comments: 34, time: '10 hours ago' },
];

const PostItem = ({ item }: { item: any }) => {
  const [isLiked, setIsLiked] = useState(false);
  const displayLikes = (item.baseLikes + (isLiked ? 1 : 0)).toLocaleString();

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <Image source={item.userImage} style={styles.postAvatar} />
          <View>
            <Text style={styles.postUsername}>{item.username}</Text>
            {item.location && <Text style={styles.postLocation}>{item.location}</Text>}
          </View>
        </View>
        <TouchableOpacity><Text style={styles.threeDots}>⋮</Text></TouchableOpacity>
      </View>

      <Image source={item.postImage} style={styles.postImage} />

      <View style={styles.actionIcons}>
        <View style={styles.actionIconsLeft}>
          <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
            <Text style={styles.icon}>{isLiked ? '❤️' : '♡'}</Text>
          </TouchableOpacity>
          <TouchableOpacity><Text style={styles.icon}>💬</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.icon}>📤</Text></TouchableOpacity>
        </View>
        <TouchableOpacity><Text style={styles.icon}>💾</Text></TouchableOpacity>
      </View>

      <View style={styles.postInfo}>
        <Text style={styles.likesText}>{displayLikes} Likes</Text>
        <Text style={styles.captionText}>
          <Text style={styles.postUsername}>{item.username}</Text> {item.caption}
        </Text>
        <Text style={styles.commentsText}>View all {item.comments} comments</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );
};

export default function FeedScreen() {
  const [activeStory, setActiveStory] = useState<any>(null);
  const [viewedStories, setViewedStories] = useState<string[]>([]);

  const sortedStories = useMemo(() => {
    const yourStory = initialStories[0];
    const otherStories = initialStories.slice(1);
    
    const unviewed = otherStories.filter(s => !viewedStories.includes(s.id));
    const viewed = otherStories.filter(s => viewedStories.includes(s.id));
    
    return [yourStory, ...unviewed, ...viewed];
  }, [viewedStories]);

  const handleStoryPress = (story: any) => {
    setActiveStory(story);
    if (!viewedStories.includes(story.id)) {
      setViewedStories([...viewedStories, story.id]);
    }
  };

  const renderStory = ({ item }: { item: any }) => {
    const isViewed = viewedStories.includes(item.id);
    return (
      <TouchableOpacity 
        style={styles.storyContainer} 
        activeOpacity={0.7}
        onPress={() => handleStoryPress(item)}
      >
        <View style={[styles.storyRing, { borderColor: isViewed ? '#ddd' : '#e1306c' }]}>
          <Image source={item.image} style={styles.storyImage} />
        </View>
        <Text style={[styles.storyText, { color: isViewed ? '#888' : '#000' }]} numberOfLines={1}>
          {item.username}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity><Text style={styles.icon}>♡</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.icon}>💬</Text></TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem item={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.storiesSection}>
            <FlatList
              horizontal
              data={sortedStories}
              keyExtractor={(item) => item.id}
              renderItem={renderStory}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        }
      />

      <Modal visible={activeStory !== null} animationType="slide" transparent={false}>
        {activeStory && (
          <View style={styles.storyModalContainer}>
            <Image source={activeStory.storyImage} style={styles.fullScreenStory} />
            <SafeAreaView style={styles.storyModalHeader}>
              <View style={styles.storyModalUserInfo}>
                <Image source={activeStory.image} style={styles.storyModalAvatar} />
                <Text style={styles.storyModalUsername}>{activeStory.username}</Text>
              </View>
              <TouchableOpacity onPress={() => setActiveStory(null)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <TouchableOpacity style={styles.storyTapArea} onPress={() => setActiveStory(null)} activeOpacity={1}/>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#ddd' },
  logo: { fontSize: 22, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', gap: 15 },
  icon: { fontSize: 26 },
  storiesSection: { paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#ddd' },
  storyContainer: { alignItems: 'center', marginHorizontal: 8, width: 70 },
  storyRing: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  storyImage: { width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: '#fff' },
  storyText: { fontSize: 11, marginTop: 5 },
  postContainer: { marginBottom: 15 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' },
  postHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  postAvatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10 },
  postUsername: { fontWeight: 'bold', fontSize: 14 },
  postLocation: { fontSize: 11, color: '#666' },
  threeDots: { fontSize: 20, fontWeight: 'bold' },
  postImage: { width: width, height: width, resizeMode: 'cover' },
  actionIcons: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  actionIconsLeft: { flexDirection: 'row', gap: 15 },
  postInfo: { paddingHorizontal: 10 },
  likesText: { fontWeight: 'bold', marginBottom: 5 },
  captionText: { marginBottom: 5, lineHeight: 18 },
  commentsText: { color: '#666', marginBottom: 5 },
  timeText: { fontSize: 10, color: '#999', textTransform: 'uppercase' },
  storyModalContainer: { flex: 1, backgroundColor: '#000' },
  fullScreenStory: { width: '100%', height: '100%', resizeMode: 'cover', position: 'absolute' },
  storyModalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center', zIndex: 10, paddingTop: 50 },
  storyModalUserInfo: { flexDirection: 'row', alignItems: 'center' },
  storyModalAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#fff', marginRight: 10 },
  storyModalUsername: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  closeButton: { padding: 10 },
  closeButtonText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  storyTapArea: { flex: 1, zIndex: 1 },
});