import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SettingsScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const profilePicture = 'https://via.placeholder.com/100'; // Default Profile Picture

  const handleSaveChanges = () => {
    Alert.alert('Changes Saved', 'Your settings have been updated successfully.');
  };

  return (
    <LinearGradient
      colors={['#051367', '#1C0A00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        

        {/* Profile Picture Section */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          <TouchableOpacity style={styles.changePictureButton}>
            <Text style={styles.changePictureText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Username Input */}
        <View style={styles.card}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Email Input */}
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.card}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Notifications Toggle */}
        <View style={styles.card}>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#ddd', true: '#4CAF50' }}
            />
          </View>
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.card}>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Enable Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#ddd', true: '#4CAF50' }}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  changePictureButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  changePictureText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F9F9F9',
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  buttonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
