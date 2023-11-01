import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignipUi } from "./Signin";
import { SignupUi } from "./Signup";
import { CreateNote } from "./CreateNote";
import { NoteHome } from "./NoteHome";

const Stack = createNativeStackNavigator();

function App() {
  const ui = (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignipUi} />
        <Stack.Screen name="SignUp" component={SignupUi} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
        <Stack.Screen name="NoteHome" component={NoteHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return ui;
}

export default App;
