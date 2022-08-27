import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { useNavigation } from "@react-navigation/native";
  import { API_STATUS, NOTES_SCREEN } from "../constants";
  import { fetchPosts } from "../features/notesSlice";

  export default function NotesScreenHome() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.notes.posts);
    const notesStatus = useSelector((state) => state.notes.status);
    const isLoading = notesStatus === API_STATUS.pending;

    useEffect(() => {
      if(notesStatus === API_STATUS.idle) {
        dispatch(fetchPosts())
      }
    }, [notesStatus, dispatch])

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
      
        {isLoading && <ActivityIndicator />}

        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(post) => post.id.toString()}
        />
  
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate(NOTES_SCREEN.Add)}}>
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