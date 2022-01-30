import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageSlider from "react-native-image-slider";
import { Button } from "react-native-elements/dist/buttons/Button";
import { showMessage } from "react-native-flash-message";

const BOOK_URL = "https://bookly.azurewebsites.net/bookings";

export default function CarDetails({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [isBooked, setBooked] = useState(false);

  const images = {
    images: [
      require("../../assets/favicon.png"),
      require("../../assets/favicon.png"),
    ],
  };

  async function bookCar() {
    const extraString= "T:00:00:00";
    const body = {
      itemId: route.params.item.carId,
      itemType: "Car",
      startDate: route.params.startDate.concat(extraString),
      endDate: route.params.endDate.concat(extraString),
    };

    await fetch(`${BOOK_URL}`, {
      method: "POST",
      headers: {
        Authorization: route.params.token,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response;
        }
      })
      .then((status) => {
        if(!status) {
          showMessage({
            message: "Failed booking!",
            type: "danger",
          });
          return;
        }
        setBooked(true);
        setLoading(false);
        console.log(status);
        showMessage({
          message: "Succesfully booked car",
          type: "success",
        });
        navigation.goBack();
      });
  }

  return isLoading ? (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={[styles.detailsContainer, styles.shadowProp]}>
        <View style={styles.imageContainer}>
          <ImageSlider images={images.images} style={styles.imageSlider} />
        </View>
        <Text style={styles.information}>
          Car Name: {route.params.item.carName}
        </Text>
        <Text style={styles.information}>
          Car Model: {route.params.item.carModel}
        </Text>
        <Text style={styles.information}>
          Location: {route.params.item.location}
        </Text>
        <Text style={styles.information}>
          Price: {route.params.item.price} PLN
        </Text>
        <Text style={styles.information}>
          Description: {route.params.item.description}
        </Text>
        <Button
          title={isBooked ? "Booked" : "Book Car"}
          disabled={isBooked}
          onPress={() => {
            bookCar();
            // showMessage({
            //   message: "Succesfully booked car",
            //   type: "success",
            // });
            // navigation.goBack();
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
  },
  name: {
    fontSize: 30,
    height: 35,
  },
  information: {
    fontSize: 20,
    height: 30,
    marginHorizontal: 10,
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
