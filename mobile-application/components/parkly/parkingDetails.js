import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageSlider from "react-native-image-slider";
import { Button } from "react-native-elements/dist/buttons/Button";
import { showMessage } from "react-native-flash-message";

export default function ParkingDetails({ route, navigation }) {
  const images = {
    images: [],
  };

  useEffect(() => {
    route.params.photos.map((photo) => {
      images.images.push(photo.path)
    })
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.detailsContainer, styles.shadowProp]}>
        <View style={styles.imageContainer}>
          <ImageSlider images={images.images} style={styles.imageSlider} />
        </View>
        <Text style={styles.information}>Name: {route.params.name}</Text>
        <Text style={styles.information}>
          City: {route.params.location.city}
        </Text>
        <Text style={styles.information}>
          Country: {route.params.location.country}
        </Text>
        <Text style={styles.information}>
          Street: {route.params.location.street}
        </Text>
        <Text style={styles.information}>
          Number: {route.params.location.number}
        </Text>
        <Text style={styles.information}>
          Descritpion: {route.params.description}
        </Text>
        <Button
          title="Book Parking"
          onPress={() => {
            showMessage({
              message: "Succesfully booked parking",
              type: "success",
            });
            navigation.goBack();
          }}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.createAccountButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  name: {
    fontSize: 30,
    height: 35,
  },
  information: {
    fontSize: 20,
    height: 30,
    marginHorizontal: 10,
    flex: 1,
    flexWrap: "wrap",
  },
  imageContainer: {
    height: 300,
    marginHorizontal: 10,
    marginRight: 10,
    marginLeft: 10,
    marginVertical: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "black",
  },
  imageSlider: {
    borderRadius: 3,
  },
  buttonStyle: {
    backgroundColor: "rgba(78, 116, 289, 1)",
    borderRadius: 3,
    alignSelf: "center",
    width: 150,
  },
  detailsContainer: {
    backgroundColor: "#d8d8d8",
    flexDirection: "column",
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
    marginVertical: 5,
  },
  createAccountButton: {
    width: "100%",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
