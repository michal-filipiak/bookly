import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

export default function CarFilter(props) {
  return props.isShown ? (
    <View style={[styles.filterContainer, styles.shadowProp]}>
      <View style={{ flexDirection: "row" }}>
        <TextInput placeholder="Car Name" style={styles.leftInput} />
        <TextInput placeholder="Car Model" style={styles.rightInput} />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput placeholder="From: YYYY-MM-DD" style={styles.leftInput} />
        <TextInput placeholder="To: YYYY-MM-DD" style={styles.rightInput} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button
          title="Reset Filters"
          buttonStyle={styles.setFilterButtonStyle}
          containerStyle={styles.buttonContainer}
          onPress={() => console.log("refetch data")}
        />
        <Button
          title="Set Filters"
          buttonStyle={styles.setFilterButtonStyle}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  leftInput: {
    height: 40,
    width: "47%",
    margin: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  rightInput: {
    height: 40,
    width: "47%",
    margin: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  setFilterButtonStyle: {
    backgroundColor: "rgba(78, 116, 289, 1)",
    alignSelf: "flex-end",
    marginHorizontal: 5,
    width: 200,
    borderRadius: 3,
  },
  filterContainer: {
    backgroundColor: "#d8d8d8",
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
    marginVertical: 5,
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
