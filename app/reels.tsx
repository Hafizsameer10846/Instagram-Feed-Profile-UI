import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function ReelsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Reels UI Placeholder</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { fontSize: 18, fontWeight: 'bold', color: '#fff' }
});