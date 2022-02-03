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
import { showMessage } from "react-native-flash-message";

const BOOKED_URL_USER = "https://bookly.azurewebsites.net/bookings/user";
const BOOKED_URL = "https://bookly.azurewebsites.net/bookings";

export default function Booked({ navigation, route }) {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBookings();
    })
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getBookings();
  }, [isFetching]);

  async function getBookings() {
    await fetch(BOOKED_URL_USER, {
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
        setLoading(!isLoading);
      });
  }

  async function removeBooking(id) {
    setFetching(true);
    await fetch(`${BOOKED_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: route.params.token,
      },
    })
    showMessage({
      message: "Succesfully cancel booking",
      type: "success",
    });
    setFetching(false);
  }

  return isLoading ? (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" />
    </View>
  ) : dataSource.length ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <View style={[styles.listElement, styles.shadowProp]}>
            <View style={styles.leftContentContainer}>
              <Text style={styles.boldText}>Item Type: {item.itemType}</Text>
              <Text>
                Start Date Time: {item.startDateTime.substring(0, 10)}
              </Text>
              <Text>End Date Time: {item.endDateTime.substring(0, 10)}</Text>
            </View>
            <View style={styles.rightContentContainer}>
              <Button
                title="Cancel"
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
                onPress={() => {
                  removeBooking(item.id); 
                }}
              />
            </View>
          </View>
        )}
        numColumns={1}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  ) : (
    <View style={styles.loadingView}>
      <Text style={styles.emptyText}>You have no active bookings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    fontWeight: 600,
    fontSize: 24,
  },
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
  leftContentContainer: {
    width: "50%",
    height: "100%",
    alignItems: "left",
    justifyContent: "left",
  },
  rightContentContainer: {
    width: "50%",
    height: "100%",
    alignItems: "right",
    justifyContent: "right",
  },
  buttonStyle: {
    backgroundColor: "rgba(174,0,0,1)",
    borderRadius: 3,
  },
  buttonContainer: {
    width: 120,
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
