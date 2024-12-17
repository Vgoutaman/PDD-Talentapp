import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from './config';

const CandidateProfileScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    job_title: '',
    portfolio: '',
    skills: [],
    experience: '',
    job_history: '',
    social_media: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch the last saved candidate profile
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/getCandidateProfile.php`);
      const data = await response.json();
      if (response.ok) {
        setFormData({
          name: data.Name || '',
          location: data.Location || '',
          job_title: data['Job Title'] || '',
          portfolio: data.Portfolio || '',
          skills: Array.isArray(data.Skills) ? data.Skills : [], // Ensure skills are an array
          experience: data.Experience || '',
          job_history: data['Job History'] || '',
          social_media: data['Social Media'] || '',
        });
      } else {
        console.error(data.error);
        Alert.alert('Error', 'Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      Alert.alert('Error', 'An error occurred while fetching profile data');
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (newSkill) => {
    if (newSkill.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, newSkill.trim()],
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/storeCandidateProfile.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile saved successfully!');
        setIsEditing(false); // Switch back to view mode
        fetchProfileData(); // Re-fetch to update the displayed data
      } else {
        Alert.alert('Error', data.error || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'An error occurred while saving the profile');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Build your profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
        editable={isEditing}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={formData.location}
        onChangeText={(value) => handleInputChange('location', value)}
        editable={isEditing}
      />

      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your job title"
        value={formData.job_title}
        onChangeText={(value) => handleInputChange('job_title', value)}
        editable={isEditing}
      />

      <Text style={styles.label}>Portfolio URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter portfolio URL"
        value={formData.portfolio}
        onChangeText={(value) => handleInputChange('portfolio', value)}
        editable={isEditing}
      />

      <Text style={styles.label}>Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter years of experience"
        value={formData.experience}
        onChangeText={(value) => handleInputChange('experience', value)}
        editable={isEditing}
      />

      <Text style={styles.label}>Job History</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your job history"
        value={formData.job_history}
        onChangeText={(value) => handleInputChange('job_history', value)}
        editable={isEditing}
      />

      <Text style={styles.label}>Social Media Links</Text>
      <TextInput
        style={styles.input}
        placeholder="Add your social media links"
        value={formData.social_media}
        onChangeText={(value) => handleInputChange('social_media', value)}
        editable={isEditing}
      />

      <Text style={styles.label}>Skills</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          placeholder="Add Skill"
          onSubmitEditing={(e) => handleSkillChange(e.nativeEvent.text)}
        />
      ) : (
        <View style={styles.skillsContainer}>
          {formData.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>
              {skill}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.label}>Professional Level</Text>
      {isEditing ? (
        <Picker
          selectedValue={formData.professional_level}
          style={styles.picker}
          onValueChange={(itemValue) => handleInputChange('professional_level', itemValue)}
        >
          <Picker.Item label="Select Professional Level" value="" />
          <Picker.Item label="Junior" value="Junior" />
          <Picker.Item label="Mid" value="Mid" />
          <Picker.Item label="Senior" value="Senior" />
          <Picker.Item label="Lead" value="Lead" />
        </Picker>
      ) : (
        <Text style={styles.text}>{formData.professional_level}</Text>
      )}

      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f5f7',  // Fiverr-like light grey background
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',  // Darker text for a polished look
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#444',  // Lighter text color for labels
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',  // Dark text inside the input for readability
  },
  skillsContainer: {
    marginBottom: 20,
  },
  skill: {
    fontSize: 14,
    backgroundColor: '#d3f8e2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 8,
    color: '#007bff',
  },
  picker: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    color: '#007bff',  // Fiverr's branding color
  },
  button: {
    backgroundColor: '#28a745',  // Fiverr-like green button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',  // Matching dark text color
  },
});

export default CandidateProfileScreen;
