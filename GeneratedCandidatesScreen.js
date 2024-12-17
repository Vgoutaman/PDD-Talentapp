import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GeneratedCandidatesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { candidates } = route.params || {};
  const [savedCandidates, setSavedCandidates] = useState([]);  // Save selected candidates

  const handleProfileClick = (candidate) => {
    navigation.navigate('DetailedProfileScreen', { candidate });
  };

  const handleSaveCandidate = (candidate) => {
    // Prevent duplicate saves
    if (!savedCandidates.some((item) => item.id === candidate.id)) {
      setSavedCandidates((prevSavedCandidates) => [...prevSavedCandidates, candidate]);
      Alert.alert('Saved', 'Candidate saved successfully!');
    } else {
      Alert.alert('Already Saved', 'This candidate is already saved.');
    }
  };

  const renderCandidate = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleProfileClick(item)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item['Job Title']}</Text>
        <Text style={styles.location}>{item['Location']}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveCandidate(item)}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );

  // Navigate to SavedCandidatesScreen and pass the saved candidates
  const handleGoToSavedCandidates = () => {
    navigation.navigate('SavedCandidatesScreen', { savedCandidates });
  };

  return (
    <ImageBackground source={require('../assets/homepagebackground.jpg')} style={styles.container}>
      {candidates && candidates.length > 0 ? (
        <FlatList
          data={candidates}
          renderItem={renderCandidate}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No candidates found.</Text>
      )}
      <TouchableOpacity style={styles.goToSavedButton} onPress={handleGoToSavedCandidates}>
        <Text style={styles.goToSavedButtonText}>View Saved Candidates</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  goToSavedButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  goToSavedButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default GeneratedCandidatesScreen;
