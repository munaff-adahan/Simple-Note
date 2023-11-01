import {
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Button,
  View,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function CreateNote({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  fetch("http://192.168.43.225/myNotes/findCategory.php")
    .then((response) => {
      return response.json();
    })

    .then((category) => {
      setItems(category);
    })

    .catch((error) => {
      Alert.alert("Error", error);
    });

  const ui = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Note</Text>
      <TextInput
        placeholder="Type a Title"
        style={styles.input}
        onChangeText={setTitle}
        value={title}
      />
      
      <TextInput
        placeholder="Description"
        style={styles.desc_input}
        onChangeText={setDescription}
        value={description}
      />

      <View style={styles.dropDownPicker}>
        <DropDownPicker
          style={styles.dropDownPicker}
          placeholder="Select a Category"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <Pressable onPress={sendRequest}>
          <View style={styles.btnView}>
            <Text style={styles.signup}>Add Note</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ marginTop: 30 }}
          onPress={() => {
            navigation.navigate("NoteHome");
          }}
        >
          <View style={styles.btnView}>
            <Text style={styles.home}>Go to Note Home Page</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  async function sendRequest() {
    const user = JSON.parse(await AsyncStorage.getItem("user"));

    const loginDetails = {
      title: title,
      desc: description,
      category: value,
      mobile: user.mobile,
    };

    fetch("http://192.168.43.225/myNotes/addNote.php", {
      method: "POST",
      body: JSON.stringify(loginDetails),
    })
      .then((response) => {
        return response.text();
      })

      .then((ResponseText) => {
        if (ResponseText == "Success") {
          Alert.alert("Message", "Note Added");
          setTitle("");
          setDescription("");
          setValue(0);
        } else {
          Alert.alert("Error", ResponseText);
        }
      })

      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }
  return ui;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "#afdcce",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  desc_input: {
    height: 40,
    width: 250,
    borderColor: "#afdcce",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
    height: 100,
    textAlignVertical: "top",
   
  },
  input1: {
    height: 40,
    width: 250,
    marginTop: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  dropDownPicker: {
    height: 30,
    width: 250,
    borderColor: "#afdcce",
  },
  btnView: {
    marginTop: 30,
  },
  signup: {
    textAlign: "center",
    width: 250,
    height: 40,
    textAlignVertical: "center",
    borderRadius: 6,
    backgroundColor: "#afdcce",
    color: "#3d4442",
    borderColor: "black",
  },
  home: {
    textAlign: "center",
    width: 250,
    height: 40,
    textAlignVertical: "center",
    borderRadius: 6,
    backgroundColor: "#218167",
    color: "#fafefd",
    borderColor: "black",
  },
  title:{
    fontSize:30,
    fontWeight:"bold",
    color:"#f4b117"
  },
});
