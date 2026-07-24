import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const profileInfo = {
  username: 'hafiz_sameer',
  fullName: 'Hafiz Muhammad Sameer',
  bio: 'BS Student at PAF-IAST 💻\nAutomotive Enthusiast 🚗',
  website: 'paf-iast.edu.pk',
  posts: '15',
  followers: '2.1K',
  following: '973'
};

const highlights = [
  { id: '1', title: 'Travel', image: require('../assets/images/highlight1.jpg') },
  { id: '2', title: 'Family', image: require('../assets/images/highlight2.jpg') },
  { id: '3', title: 'Work', image: require('../assets/images/highlight3.jpg') },
  { id: '4', title: 'Friends', image: require('../assets/images/highlight4.jpg') },
  { id: '5', title: 'Food', image: require('../assets/images/highlight5.jpg') },
];

// Local grid images (grid1.jpg to grid15.jpg)
const gridImages = [
  { id: '1', image: require('../assets/images/grid1.jpg') },
  { id: '2', image: require('../assets/images/grid2.jpg') },
  { id: '3', image: require('../assets/images/grid3.jpg') },
  { id: '4', image: require('../assets/images/grid4.jpg') },
  { id: '5', image: require('../assets/images/grid5.jpg') },
  { id: '6', image: require('../assets/images/grid6.jpg') },
  { id: '7', image: require('../assets/images/grid7.jpg') },
  { id: '8', image: require('../assets/images/grid8.jpg') },
  { id: '9', image: require('../assets/images/grid9.jpg') },
  { id: '10', image: require('../assets/images/grid10.jpg') },
  { id: '11', image: require('../assets/images/grid11.jpg') },
  { id: '12', image: require('../assets/images/grid12.jpg') },
  { id: '13', image: require('../assets/images/grid13.jpg') },
  { id: '14', image: require('../assets/images/grid14.jpg') },
  { id: '15', image: require('../assets/images/grid15.jpg') },
];

export default function ProfileScreen() {
  const renderHighlight = ({ item }: { item: any }) => (
    <View style={styles.highlightContainer}>
      <View style={styles.highlightRing}>
        <Image source={item.image} style={styles.highlightImage} />
      </View>
      <Text style={styles.highlightText}>{item.title}</Text>
    </View>
  );

  const renderGridItem = ({ item }: { item: any }) => (
    /* Note: No { uri: ... } wrapper for local images */
    <Image source={item.image} style={styles.gridImage} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={gridImages}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={renderGridItem}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.username}>🔒 {profileInfo.username}</Text>
              <View style={styles.headerRight}>
                <TouchableOpacity><Text style={styles.headerIcon}>➕</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.headerIcon}>☰</Text></TouchableOpacity>
              </View>
            </View>

            <View style={styles.profileSection}>
              <Image source={require('../assets/images/avatar1.jpg')} style={styles.profilePicture} />
              <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{profileInfo.posts}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{profileInfo.followers}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{profileInfo.following}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
              </View>
            </View>

            <View style={styles.bioSection}>
              <Text style={styles.fullName}>{profileInfo.fullName}</Text>
              <Text style={styles.bio}>{profileInfo.bio}</Text>
              <Text style={styles.website}>{profileInfo.website}</Text>
            </View>

            <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Edit Profile</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Share Profile</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Contact</Text></TouchableOpacity>
            </View>

            <View style={styles.highlightsSection}>
              <FlatList
                horizontal
                data={highlights}
                keyExtractor={(item) => item.id}
                renderItem={renderHighlight}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={styles.tabsSection}>
              <TouchableOpacity style={[styles.tab, styles.activeTab]}><Text style={styles.tabText}>▦</Text></TouchableOpacity>
              <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>🎬</Text></TouchableOpacity>
              <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>🏷️</Text></TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' },
  username: { fontSize: 20, fontWeight: 'bold' },
  headerRight: { flexDirection: 'row', gap: 20 },
  headerIcon: { fontSize: 24 },
  profileSection: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 10 },
  profilePicture: { width: 80, height: 80, borderRadius: 40, marginRight: 20 },
  statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 13, color: '#333' },
  bioSection: { paddingHorizontal: 15, marginBottom: 15 },
  fullName: { fontWeight: 'bold', fontSize: 14, marginBottom: 2 },
  bio: { fontSize: 14, marginBottom: 2 },
  website: { color: '#003569', fontSize: 14, fontWeight: '500' },
  buttonSection: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, gap: 8, marginBottom: 20 },
  button: { flex: 1, backgroundColor: '#efefef', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  buttonText: { fontWeight: 'bold', fontSize: 13 },
  highlightsSection: { paddingBottom: 15, borderBottomWidth: 0.5, borderColor: '#ddd' },
  highlightContainer: { alignItems: 'center', marginHorizontal: 10 },
  highlightRing: { width: 68, height: 68, borderRadius: 34, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  highlightImage: { width: 60, height: 60, borderRadius: 30 },
  highlightText: { fontSize: 12 },
  tabsSection: { flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ddd' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  activeTab: { borderBottomWidth: 2, borderColor: '#000' },
  tabText: { fontSize: 20 },
  gridImage: { width: width / 3, height: width / 3, borderWidth: 0.5, borderColor: '#fff' }
});