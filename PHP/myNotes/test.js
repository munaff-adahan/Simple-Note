function sendRequest() {

     const [GetText, SetText] = useState("Response");

    const loginDetails = {
      "username":"sahan",
    }

    fetch("http://192.168.43.225/myNotes/test.php",{
    method:"POST",
    body:JSON.stringify(loginDetails),
    }
    )
    
      .then(
        response => {
        return response.json();
      })

      .then(
        user => {
        SetText(user.name);
      })

      .catch(
        error => {
        Alert.alert("Error", error);
      })
      ;
  }
