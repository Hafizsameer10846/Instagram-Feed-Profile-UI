import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileCard() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [likes, setLikes] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageRing}>
          <Image
            source={require('../assets/logo2.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>Technik Nest</Text>
        <Text style={styles.subtitle}>Software Company</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.likeButton} 
            activeOpacity={0.8}
            onPress={() => setLikes(likes + 1)}
          >
            <Ionicons name="heart" size={22} color="black" />
            <Text style={styles.likeButtonText}>{likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={() => setIsFollowing(!isFollowing)}
            activeOpacity={0.8}
          >
            <FontAwesome5
              name={isFollowing ? "user-check" : "user"}
              size={16}
              color={isFollowing ? "#ff6600" : "white"}
              solid
            />
            <Text style={[styles.followButtonText, isFollowing && styles.followingText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          SECP Registered Private Limited{'\n'}Company
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#292929',
    width: '92%',
    maxWidth: 450,
    borderRadius: 24,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  imageRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2.5,
    borderColor: '#ff6600',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  profileImage: {
    width: 135,
    height: 135,
    borderRadius: 67.5,
    backgroundColor: '#1a1a1a',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: 17,
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 55,
  },
  likeButton: {
    backgroundColor: '#ff6600',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  likeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  followButton: {
    backgroundColor: '#3a3a3a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  followingButton: {
    backgroundColor: '#292929',
    borderColor: '#ff6600',
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  followingText: {
    color: '#ff6600',
  },
  footerText: {
    color: '#707070',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
});