import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from "../Context/AppContext";

const History = ({ navigation }) => {
  const { linkHistory, clearHistory } = useAppContext();

  // Function to truncate the link to 40 characters
  const truncateLink = (link) => {
    if (link.length > 37) {
      return `${link.substring(0, 37)}...`;
    }
    return link;
  };

  // Render each item as a clickable TouchableOpacity
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.linkContainer}
      onPress={() => navigation.navigate('ScannedLink', { link: item })}
    >
      <Text style={styles.linkItem}>{truncateLink(item)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scanned Links History</Text>
        <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Delete All</Text>
        </TouchableOpacity>
      </View>
      {linkHistory.length === 0 ? (
        <Text style={styles.noHistoryText}>No scanned links yet.</Text>
      ) : (
        <FlatList
          data={[...linkHistory]} // Reverse the linkHistory array here
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  linkContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  linkItem: {
    fontSize: 16,
    color: '#1E90FF',
  },
  noHistoryText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default History;
