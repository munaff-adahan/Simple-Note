import {
  Button,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";


export function SignupUi({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  fetch("http://192.168.43.225/myNotes/test.php")
    .then((response) => {
      return response.json();
    })

    .then((userTypes) => {
      setItems(userTypes);
    })

    .catch((error) => {
      Alert.alert("Error", error);
    });

  const ui = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SignUp</Text>

      <TextInput
        placeholder="Mobile Number"
        maxLength={10}
        style={styles.input}
        onChangeText={setMobileNumber}
       
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="First Name"
        style={styles.input}
        onChangeText={setFirstName}
       
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
        onChangeText={setLastName}
       
      />

      <View style={styles.dropDownPicker}>
        <DropDownPicker
          style={styles.dropDownPicker}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>

      <TextInput
        placeholder="Password"
        style={styles.input1}
        onChangeText={setPassword}
       
      />
      <Pressable onPress={sendRequest}>
      <View style={styles.signup}>
        <Text style={styles.signup}>Register</Text>
        
      </View>
      </Pressable>
      
    </SafeAreaView>
  );

  function sendRequest() {
    const loginDetails = {
      mobile: mobileNumber,
      fname: firstName,
      lname: lastName,
      usertype: value,
      password: password,
    };

    fetch("http://192.168.43.225/myNotes/home.php", {
      method: "POST",
      body: JSON.stringify(loginDetails),
    })
      .then((response) => {
        return response.text();
      })

      .then((ResponseText) => {
        if (ResponseText == "Success") {
          Alert.alert("Message","Registration Success");
          navigation.navigate("SignIn");
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
  },
  btnView: {
    
  },
  signup: {
    textAlign:"center",
    width: 250,
    height:40,
   textAlignVertical:"center",
    borderRadius:6,
    backgroundColor:"#afdcce",
    color: "#3d4442",
    borderColor:"black",
  },
});
