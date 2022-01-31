import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import CarFilter from "./carFilterView";
import getQueryString from "../utils/getQueryString";

const CARS_URL = "https://bookly.azurewebsites.net/cars";
const START_DATE = new Date().toISOString().substring(0, 10);
const END_DATE = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate() + 7
)
  .toISOString()
  .substring(0, 10);

export default function Carly({ navigation, route }) {
  const icon = require("../../assets/favicon.png");
  const [startDate, setStartDate] = useState(START_DATE);
  const [endDate, setEndDate] = useState(END_DATE);
  const [carModel, setCarModel] = useState("");
  const [carName, setCarName] = useState("");
  const [location, setLocation] = useState("");

  const [isLoading, setLoading] = useState(true);
  const [paginationCount, setCount] = useState(0);
  const [dataSource, setDataSource] = useState(null);
  const [filters, setFilters] = useState({
    startDate: startDate,
    endDate: endDate,
    location: "",
    carModel: "",
    carName: "",
  });

  useEffect(() => {
    getCars(filters);
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
    setCarName(filters.carName);
    setCarModel(filters.carModel);
    setLocation(filters.location);
  }, [filters]);

  //   useEffect(() => {
  //     getCars(filters);
  //   }, [paginationCount]);

  // function fetchMoreData() {
  //   setCount(paginationCount+1);
  // }

  async function getCars(filters) {
    setLoading(true);
    const extraStringToDate = "T00:00:00";

    const parameters = {
      pageNum: 0,
      maxNum: 50,
      startDate: filters.startDate.concat(extraStringToDate),
      endDate: filters.endDate.concat(extraStringToDate),
      location: filters.location,
      carModel: filters.carModel,
      carName: filters.carName,
    };

    await fetch(`${CARS_URL}?${getQueryString(parameters)}`, {
      headers: {
        Authorization: route.params.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response;
        }
      })
      .then((data) => {
        setDataSource(data);
        setLoading(false);
      });
  }

  return isLoading ? (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <CarFilter
        startDate={startDate}
        endDate={endDate}
        carModel={carModel}
        carName={carName}
        location={location}
        onSetFilters={(filters) => {
          setFilters(filters);
        }}
        onResetFilters={() =>
          setFilters({
            startDate: START_DATE,
            endDate: END_DATE,
            location: "",
            carName: "",
            carModel: "",
          })
        }
      />
      <FlatList
        data={dataSource}
        onEndReached={() => console.log("activated")}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={[styles.listElement, styles.shadowProp]}>
            <View style={styles.imageContainer}>
              <Image style={styles.tinyLogo} source={icon} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.boldText}>{item.carName}</Text>
              <Text>Car Model: {item.carModel}</Text>
              <Text>Location: {item.location}</Text>
              <Text>Price: {item.price} PLN</Text>

              <Button
                title="Details"
                onPress={() => navigation.navigate("CarDetails", {item: item,startDate: startDate, endDate: endDate})}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
              />
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
  boldText: {
    fontSize: 16,
    fontWeight: "600",
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
