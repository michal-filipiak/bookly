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
import ParkingFilter from "./parkingFilterView";
import getQueryString from "../utils/getQueryString";

const PARKS_URL = "https://bookly.azurewebsites.net/slots";
const START_DATE = new Date().toISOString().substring(0, 10);
const END_DATE = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate() + 7
)
  .toISOString()
  .substring(0, 10);

export default function Parkly({ navigation, route }) {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(START_DATE);
  const [endDate, setEndDate] = useState(END_DATE);
  const [filters, setFilters] = useState({
    startDate: startDate,
    endDate: endDate,
    location: "",
  });

  async function getParkly() {
    setLoading(true);
    const extraStringToDate = "T00:00:00";
    const parameters = {
      startDate: filters.startDate.concat(extraStringToDate),
      endDate: filters.endDate.concat(extraStringToDate),
      location: filters.location,
    };

    await fetch(
      `${PARKS_URL}?${getQueryString(parameters)}`,
      {
        headers: {
          Authorization: route.params.token,
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
        setDataSource(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    getParkly(filters);
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
    setLocation(filters.location)
  }, [filters]);

  return isLoading ? (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ParkingFilter 
        startDate={startDate}
        endDate={endDate}
        location={location}
        onSetFilters={(filters) => {
          setFilters(filters);
        }}
        onResetFilters={() =>
          setFilters({
            startDate: START_DATE,
            endDate: END_DATE,
            location: "",
          })
        }
        />
      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <View style={[styles.listElement, styles.shadowProp]}>
            <View style={styles.imageContainer}>
              <Image style={styles.tinyLogo} source={item.photos[0].path} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.boldText}>{item.name}</Text>
              <Text>Location: {item.location.city}</Text>
              <Text>Cost: {item.cost} PLN</Text>
              <Text>Width: {item.width}</Text>

              <Button
                title="Details"
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
                onPress={() => navigation.navigate("ParkingDetails", item)}
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
