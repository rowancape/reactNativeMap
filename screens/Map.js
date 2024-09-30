import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Map() {
  const [markers, setMarkers] = useState([]);

  const [location, setLocation] = useState({
    latitude: 65.40494031697344,
    longitude: 29.108324046369546,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    (async () => {
      await getUserPosition();
    })();
  }, []);

  const getUserPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    try {
      if (status !== "granted") {
        console.log("Geolocation failed");
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const showMarkers = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarkers((prevMarkers) => [...prevMarkers, coords]);
  };

  return (
    <MapView
      style={styles.map}
      region={location}
      onLongPress={showMarkers}
    >
      {
        markers.map((marker, index) => (
          <Marker
            key={index}
            title={`Marker ${index + 1}`}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          />
        ))
      }
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
