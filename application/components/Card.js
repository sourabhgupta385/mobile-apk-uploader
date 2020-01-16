import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

const Card = props => {
  return (
    <View style={styles.card}>
        <View style={styles.details}>
              <Text >App Name: <Text style={styles.name}>{props.appName}</Text></Text>
              <Text >APK Location: <Text style={styles.location}>{props.apkDir}</Text></Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 100,
    margin: 20
  },
  name: {
    fontSize: 16,
    marginVertical: 5,
    color: '#C2185B'
  },
  location: {
    fontSize: 13,
    color: '#FFC107'
  },
  details: {
    height: "25%",
    padding: 10,
    alignItems: "center"
  }
});

export default Card;