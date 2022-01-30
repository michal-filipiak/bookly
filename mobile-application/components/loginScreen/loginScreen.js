import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button } from "react-native-elements/dist/buttons/Button";

export default function LoginScreen({navigation, route }) {
  const [login, onChangeLogin] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const loginUser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: login,
        password: password
      })
    };
    console.log(requestOptions);
    const token = await fetch('http://localhost:8080/users/login',requestOptions).then(response => response.text());
    if(!token.includes("error")) {
      showMessage({
          message: "Succesfully logged in",
          type: "success",
      });
      route.params.setToken(token);
      navigation.navigate('Logged');
    } else {
      showMessage({
        message: "Somtehing went wrong while logging in",
        type: "danger",
      });
    }
  }

  return (
    <SafeAreaView>
     <View style={[styles.loginContainer, styles.shadowProp]}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeLogin}
        value={login}
        placeholder='Login'
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder='Password'
      />
      <View style={{flexDirection: "row"}}>
      <Button 
        title='Login' 
        onPress={() => /*loginUser()*/navigation.navigate('Logged')}
        buttonStyle={styles.loginButtonStyle}
        containerStyle={styles.buttonContainer}/>
      <Button 
        title='Register' 
        onPress={() => navigation.navigate('RegisterScreen')}
        buttonStyle={styles.registerButtonStyle}
        containerStyle={styles.buttonContainer}/>
      </View>
     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    backgroundColor: "white",
  },
  loginButtonStyle: {
    backgroundColor: "rgba(78, 116, 289, 1)",
    alignSelf: "flex-start",
    marginHorizontal: 10,
    width: 150,
    borderRadius: 3,
  },
  registerButtonStyle: {
    backgroundColor: "rgba(78, 116, 289, 1)",
    alignSelf: "flex-end",
    marginHorizontal: 10,
    width: 150,
    borderRadius: 3,
  },
  buttonContainer:  {
    width: "50%",
    marginVertical: 10,
  },
  loginContainer: {
    backgroundColor: "#d8d8d8",
    flexDirection: "column",
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
    marginVertical:5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});