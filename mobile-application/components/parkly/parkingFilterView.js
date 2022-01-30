import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import validateDate from "../utils/validateDate";
import { showMessage } from "react-native-flash-message";

export default function ParkingFilter(props) {
  const [dateFrom, setDateFrom] = useState(props.startDate);
  const [dateTo, setDateTo] = useState(props.endDate);
  const [location, setLocation] = useState(props.location);

  function validateChangedData() {
    const isValid = validateDate(dateFrom) && validateDate(dateTo);

    if (!isValid) {
      showMessage({
        message: "Invalid date format or dates are not entered! (YYYY-MM-DD)",
        type: "warning",
      });
    }
    return isValid;
  }

  return (
    <View style={[styles.filterContainer, styles.shadowProp]}>
      <View style={{ flexDirection: "row" }}>
        <TextInput placeholder="From: YYYY-MM-DD" style={styles.leftInput} value={dateFrom} onChangeText={setDateFrom}/>
        <TextInput placeholder="To: YYYY-MM-DD" style={styles.rightInput} value={dateTo} onChangeText={setDateTo}/>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput placeholder="Location" style={styles.leftInput} value={location} onChangeText={setLocation}/>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button
          title="Reset Filters"
          buttonStyle={styles.setFilterButtonStyle}
          containerStyle={styles.buttonContainer}
          onPress={() => props.onResetFilters()}
        />
        <Button
          title="Set Filters"
          buttonStyle={styles.setFilterButtonStyle}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            if (validateChangedData()) {
              const data = {
                startDate: dateFrom,
                endDate: dateTo,
                location: location,
              };
              props.onSetFilters(data);
            }
          }}
        />
      </View>
    </View>
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
