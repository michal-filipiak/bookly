import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import data from "./cars.json";
import { Button } from "react-native-elements/dist/buttons/Button";
import CarFilter from "./carFilterView";

export default function Carly({ navigation }) {
  const icon = require("../../assets/favicon.png");
  const [isShown, setShown] = useState(false);
  const [isLoading, setLoading] = useState(false);

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
          onPress={() => setShown(!isShown)}
        />
      </View>
      <CarFilter isShown={isShown} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.listElement, styles.shadowProp]}>
            <View style={styles.imageContainer}>
              <Image style={styles.tinyLogo} source={icon} />
            </View>
            <View style={styles.contentContainer}>
              <Text>
                {item.carName} {item.carModel}
              </Text>
              <Text>{item.location}</Text>
              <Text>{item.price} PLN</Text>

              <Button
                title="Details"
                onPress={() => navigation.navigate("CarDetails", item)}
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
