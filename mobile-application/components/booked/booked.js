import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";

export default function Booked({ navigation }) {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const icon = require("../../assets/favicon.png");
  const BOOKED = {
    NAMES: ["Car1", "Parking1", "Flat1"],
    IS_ACTUAL: [true, false, true],
    STAR_DATE_TIME: ["now", "later", "later"],
  };

  // useEffect(() => {
  //   const items = Array.from(
  //     { length: BOOKED.NAMES.length },
  //     (_, index) => {
  //       return {
  //         name: BOOKED.NAMES[index],
  //         isActual: BOOKED.IS_ACTUAL[index],
  //         startDateTime: BOOKED.STAR_DATE_TIME[index],
  //       };
  //     }
  //   );
  //   setDataSource(items);
  // }, []);

  const CARS_URL = "http://localhost:8081/cars?startDate=2022-12-30T11:11:11&endDate=2022-12-31T11:11:11";
  const PARKS_URL = "http://localhost:8081/slots?startDate=2022-12-20T11:11:11&endDate=2022-12-29T11:11:11";
  const FLAT_URL = "http://localhost:8081/flats";

  useEffect(() => {
    getBookings();
  }, []);
  async function getBookings() {
    await fetch(
      CARS_URL,
      {
        headers: {
          Authorization: "123",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response;
        }
      })
      .then((data) => {
        console.log(data);
      });
  }

  return isLoading ? (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <View style={[styles.listElement, styles.shadowProp]}>
            <View style={styles.imageContainer}>
              <Image style={styles.tinyLogo} source={icon} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.boldText}>{item.name}</Text>
              <Text>Item: : {item.name}</Text>
              <Text>isActual: {item.isActual}</Text>
              <Text>startDateTime: {item.startDateTime}</Text>
            </View>
          </View>
        )}
        numColumns={1}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "600",
  },
  listElement: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    height: 200,
    borderRadius: 3,
    marginRight: 5,
    marginLeft: 5,
    marginVertical: 5,
    backgroundColor: "#d8d8d8",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "100%",
    backgroundColor: "#d8d8d8",
  },
  contentContainer: {
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: "rgba(78, 116, 289, 1)",
    borderRadius: 3,
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  filterButton: {
    width: 100,
    marginHorizontal: 5,
    marginVertical: 2,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
