import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  Button,
  Alert,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function NoteHome({ navigation }) {
 
  const [getNote, setNote] = useState([]);
  NoteLoad();
  async function NoteLoad() {
    const user = JSON.parse(await AsyncStorage.getItem("user"));

    const details = {
      mobile: user.mobile,
    };

    fetch("http://192.168.43.225/myNotes/getNote.php", {
      method: "POST",
      body: JSON.stringify(details),
    })
      .then((response) => {
        return response.json();
      })

      .then((notes) => {
        setNote(notes);
      })

      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  const ui = (
    <SafeAreaView style={styles.container}>
       <Text style={styles.title}>Note Home</Text>
      <FlatList style={{ marginBottom:10 }} data={getNote} renderItem={UserUI} />
    </SafeAreaView>
  );
  return ui;
}

function UserUI({ item }) {

  var image = null;
  
  if(item.name == "Work"){
image = require("./work1.png")
  }else if(item.name == "Travel"){
    image = require("./travel.png")
  }else if(item.name == "Personal"){
    image = require("./personal.png")
  }else if(item.name == "Study"){
    image = require("./study.png")
  }


  const ui = (
    <SafeAreaView>
     
      <View style={styles.viewStyle}>
        <View style={styles.imageView}>
          <Image style={{width:48, height:50,  objectFit:"fill",margin:"auto" ,marginLeft:6,marginTop:4,}} source={image} />
        </View>
        <View style={styles.textView}>
          <Text style={{ fontSize: 20 }}>{item.title}</Text>
          <View style={styles.desc}>
            <Text style={{ color: "red" }}>{item.description}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.dateView}>{item.date}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  viewStyle: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#cff7ec",
    width: 250,
    height: 100,
    borderRadius: 10,
    borderColor: "black",
    flexDirection: "row",
    borderWidth:1,
  },
  text: {
    color: "red",
  },
  dateView: {
    marginTop: -10,
    marginLeft: -54,
    alignContent: "flex-end",
    justifyContent: "flex-start",
    fontSize: 10,
  },
  desc: {
    width: 150,
    height:60,
  },
  imageView:{
    marginTop:10,
    borderColor:"black",
    borderWidth:1,
    borderRadius:100,
    width:60,
    height:60,
    backgroundColor:"white",
  },
  textView:{
    marginTop:-10,
  },
  title:{
    fontSize:30,
    fontWeight:"bold",
    color:"#0e4774"
  },

});
