import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { useSelector } from "react-redux";
  
  export default function NotesScreenHome() {
    const posts = useSelector((state) => state.notes);
    function renderItem({ item }) {
      return (
        <TouchableOpacity style={styles.noteCard} onPress={() => {}}>
          <Text style={styles.noteCardTitle}>{item.title}</Text>
          <Text style={styles.noteCardBodyText}>
            {item.content.substring(0, 120)}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>notes</Text>
  
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(post) => post.id.toString()}
        />
  
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    noteCard: {
      borderColor: "gray",
      borderWidth: "1px",
      padding: 15,
      borderRadius: 5,
      marginBottom: 15,
    },
    noteCardTitle: {
      fontSize: 13,
      fontWeight: "500",
      marginBottom: 7,
    },
    noteCardBodyText: {
      fontSize: 12,
      fontWeight: "300",
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: 100,
      padding: 25,
    },
    title: {
      fontWeight: "bold",
      fontSize: 40,
      marginBottom: 20,
    },
    button: {
      backgroundColor: "black",
      borderRadius: 15,
      width: "100%",
    },
    buttonText: {
      textAlign: "center",
      fontWeight: "400",
      fontSize: 17,
      padding: 20,
      color: "white",
    },
  });