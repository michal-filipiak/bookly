import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import ImageSlider from "react-native-image-slider";
import { Button } from "react-native-elements/dist/buttons/Button";
import { showMessage } from "react-native-flash-message";

const BOOK_URL = "https://bookly.azurewebsites.net/bookings";

export default function FlatDetails({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [isBooked, setBooked] = useState(false);

  const images = {
    images: [],
  };

  useEffect(() => {
    route.params.item.photos.map((photo) => {
      images.images.push(photo);
    })
  }, []);

  async function bookFlat() {
    const extraString = "T00:00:00";
    const body = {
      itemId: route.params.item.id,
      itemType: "Flat",
      startDate: route.params.startDate.concat(extraString),
      endDate: route.params.endDate.concat(extraString),
    };

    await fetch(`${BOOK_URL}`, {
      method: "POST",
      headers: {
        Authorization: route.params.token,
        //Authorization: " Bearer 0tRFo_-RTR-XcGxaw75RQikVVkp2x3dY",
        "Content-Type": "application/json",
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
        if (!status) {
          showMessage({
            message: "Failed booking!",
            type: "danger",
          });
          return;
        }
        setBooked(true);
        setLoading(false);
        showMessage({
          message: "Succesfully booked flat",
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
          Flat Name: {route.params.item.name}
        </Text>
        <Text style={styles.information}>
          Area: {route.params.item.floorSpace} m2
        </Text>
        <Text style={styles.information}>
          Max Guests: {route.params.item.maxGuests}
        </Text>
        <Text style={styles.information}>
          Location: {route.params.item.location}
        </Text>
        <Text style={styles.information}>
          Price: {route.params.item.price} PLN
        </Text>
        <Text style={styles.information}>
          From: {route.params.startDate} To: {route.params.endDate}
        </Text>
        <Button
          title={isBooked ? "Booked" : "Book Flat"}
          onPress={() => bookFlat()}
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
