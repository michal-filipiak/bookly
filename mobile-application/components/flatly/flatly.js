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
import { Button, Divider } from "react-native-elements";
import FlatFilter from "./flatFilterView";
export default function Flatly({ navigation }) {
  const [dataSource, setDataSource] = useState([]);
  const [isFilterShown, setFiltersShown] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const icon = require("../../assets/favicon.png");
  const APARTAMENTS = {
    NAMES: [
      "Appartement T3 dans une résidence de standing",
      "Petit appartement à PARIS !",
      "Petit Studio dans le Marais",
    ],
    SQUARE_METERS: [45, 63, 55],
    NR_OF_ROOMS: [3, 2, 1],
    LOCATION: ["Lyon", "Paris", "Bordeaux"],
  };

  useEffect(() => {
    const items = Array.from(
      { length: APARTAMENTS.NAMES.length },
      (_, index) => {
        return {
          id: 1,
          name: APARTAMENTS.NAMES[index],
          squareMeters: APARTAMENTS.SQUARE_METERS[index],
          nrOfRooms: APARTAMENTS.NR_OF_ROOMS[index],
          photos: icon,
          location: APARTAMENTS.LOCATION[index],
        };
      }
    );
    setDataSource(items);
  }, []);

  return isLoading ? (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button
          title="Filters"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.filterButton}
          onPress={() => setFiltersShown(!isFilterShown)}
        />
      </View>
      <FlatFilter isFilterShown={isFilterShown} />
      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <View style={[styles.listElement, styles.shadowProp]}>
            <View style={styles.imageContainer}>
              <Image style={styles.tinyLogo} source={icon} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.boldText}>{item.name}</Text>
              <Text>Location: {item.location}</Text>
              <Text>Number of rooms: {item.nrOfRooms}</Text>
              <Text>Area: {item.squareMeters} m2</Text>

              <Button
                title="Details"
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
                onPress={() => navigation.navigate("FlatDetails", item)}
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
