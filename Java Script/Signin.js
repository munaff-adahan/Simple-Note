import { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
  View,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignipUi({ navigation }) {

  const setAsyncStorage = async () => {
    const name = await AsyncStorage.getItem("user");

    if (name != null) {
      navigation.reset({
        index: 0,
        routes: [{ name: "CreateNote" }],
      });
    }
  };
  setAsyncStorage();

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const ui = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title1}>Welcome To My Note !</Text>

      <Text style={styles.title}>SignIn</Text>
      <TextInput
        placeholder="Mobile Number"
        maxLength={10}
        style={styles.input}
        onChangeText={setMobileNumber}
        value={mobileNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Password"
        style={styles.input1}
        onChangeText={setPassword}
        value={password}
      />
      {/* <Button style={styles.signin} title="Login" onPress={sendRequest} /> */}
      <View>

      
      <Pressable onPress={sendRequest}>
          <View >
            <Text style={styles.signin}>Login</Text>
          </View>
        </Pressable>
      <Text></Text>
      <Pressable
          
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <View>
            <Text style={styles.home}>Sign Up</Text>
          </View>
        </Pressable>
        </View>
      {/* <Button
        title="Go to Sign Up"
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      /> */}
    </SafeAreaView>
  );

  function sendRequest() {
    const loginDetails = {
      mobile: mobileNumber,
      password: password,
    };

    fetch("http://192.168.43.225/myNotes/findUser.php", {
      method: "POST",
      body: JSON.stringify(loginDetails),
    })
      .then(response => {
        return response.text();
      })

      .then(async responseText => {
        if (responseText=="Invalid Details"||responseText=="Enter Password"||responseText=="Your mobile must be a sri lankan mobile number."||responseText=="Please enter your mobile no.") {
          Alert.alert("Error", responseText);
        } else {
          Alert.alert("Success", "Login Succesfull");
          await AsyncStorage.setItem("user", responseText);
          navigation.reset({
            index: 0,
            routes: [{name: 'CreateNote'}],
             });
         
       
        }
      })

      .catch(error => {
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
    color: "#21ab2d",
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  input1: {
    height: 40,
    width: 250,
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
    flex: 2,
  },
  signin: {
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
  title1:{
    fontSize:30,
    fontWeight:"bold",
    color:"#0e4774"
  },
});
