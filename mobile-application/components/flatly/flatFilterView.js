import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import validateDate from "../utils/validateDate";
import { showMessage } from "react-native-flash-message";

export default function FlatFilter(props) {
  const [name, setName] = useState(props.name);
  const [maxGuests,setGuests] = useState(props.maxGuests);
  const [location, setLocation] = useState(props.location);
  const [dateFrom,setDateFrom] = useState(props.startDate);
  const [dateTo, setDateTo] = useState(props.endDate);

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
        <TextInput
          placeholder="From: YYYY-MM-DD"
          value={dateFrom}
          style={styles.leftInput}
          onChangeText={setDateFrom}
        />
        <TextInput
          placeholder="To: YYYY-MM-DD"
          value={dateTo}
          style={styles.rightInput}
          onChangeText={setDateTo}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Flat Name"
          style={styles.leftInput}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder="Max Guests"
          style={styles.rightInput}
          onChangeText={setGuests}
          value={maxGuests}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Location"
          style={styles.leftInput}
          onChangeText={setLocation}
          value={location}
        />
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
                name: name,
                maxGuests: maxGuests,
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
