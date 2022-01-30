import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button } from "react-native-elements/dist/buttons/Button";

export default function RegisterScreen({navigation}) {
  const [login, onChangeLogin] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [firstName, onFirstName] = React.useState('');
  const [lastName, onLastName] = React.useState('');

  const registerUser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: password,
      })
    };
    const response = await fetch('http://localhost:8080/users/add',requestOptions).then(response => response.json())
    if(login.length === 0 || password.length === 0 || firstName.length === 0 || lastName.length === 0) {
      showMessage({
        message: "Please fill all fields",
        type: "danger",
      });
    } else if(response.status === 500) {
      showMessage({
        message: "Something went wrong while creating Account",
        type: "danger",
      });
    } else {
      showMessage({
        message: "Account was succesfully created",
        type: "success",
      });
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView>
     <View style={[styles.registerContainer, styles.shadowProp]}>
      <TextInput
        style={styles.input}
        onChangeText={onFirstName}
        value={firstName}
        placeholder='First Name'
      />
      <TextInput
        style={styles.input}
        onChangeText={onLastName}
        value={lastName}
        placeholder='Last Name'
      />
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
        title='Create Account' 
        onPress={() => registerUser()}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.createAccountButton}
      />
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
    buttonStyle: {
      backgroundColor: "rgba(78, 116, 289, 1)",
      borderRadius: 3,
      alignSelf: "center",
    },
    createAccountButton: {
      width: "100%",
      marginVertical: 10,
    },
    registerContainer: {
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